import shutil
import zipfile
import tempfile
import json
import glob
import requests
import pandas as pd
import dask.dataframe as dd
from multiprocessing.pool import ThreadPool
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient


# Connect to MongoDB
client = MongoClient(
    "mongodb+srv://bobbyrathore:Spotify-098@spotifyvisualscluster.w4z2i.mongodb.net/spotify-visuals?retryWrites=true&w=majority"
)
database = client["spotify-visuals"]

# Token for spotipy
token = "BQDobfzPLJawB3PG4m1P2jaJsDlGUnGTBcnoc1d4st9BdSBdBXppnW52SLXfMvIqugCdn5ja5Ebav5Y1vvjVSbZhj6OfvBOvJNF9sKoUpIoFaNKSHAdbTdYQGh8oMAIM2KwopOXApYM0mnkrERknJkyK0F2DM25oYBj0YSIdkO0Y"


class EarlyResponse(Response):
    def __init__(self, data, then_callback, **kwargs):
        super().__init__(data, **kwargs)
        self.then_callback = then_callback

    def close(self):
        super().close()
        self.then_callback()


def extract_json_value(column_name, data):
    return [i[column_name] for i in data]


def get_id(track_name: str, artist: str):
    track_artist = track_name + " " + artist
    params = [("q", track_artist), ("type", "track")]  # q is the search query parameter
    try:
        response = requests.get(
            "https://api.spotify.com/v1/search",
            headers={
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": f"Bearer " + token,
            },
            params=params,
            timeout=10,
        )
        json_content = response.json()
        first_result = json_content["tracks"]["items"][0]
        track_id = first_result["id"]
        return track_id
    except Exception as e:
        return None


def handle_streaming_history_with_track_ids(streaming_history: list) -> None:
    streaming_history_pd = pd.DataFrame()

    streaming_history_pd["artist_name"] = extract_json_value(
        "artistName", streaming_history
    )
    streaming_history_pd["end_time"] = extract_json_value("endTime", streaming_history)
    streaming_history_pd["ms_played"] = extract_json_value(
        "msPlayed", streaming_history
    )
    streaming_history_pd["track_name"] = extract_json_value(
        "trackName", streaming_history
    )
    streaming_history_pd["user_id"] = 1

    streaming_history_dd = dd.from_pandas(streaming_history_pd, npartitions=12)

    streaming_history_pd["track_id"] = streaming_history_dd.map_partitions(
        lambda df: df.apply(lambda x: get_id(x["track_name"], x["artist_name"]), axis=1)
    ).compute(scheduler="processes")

    database["streaming_history"].insert_many(streaming_history_pd.to_dict("records"))


def dump_to_mongo(data: tuple) -> list:
    (
        follow,
        identity,
        inferences,
        playlists,
        search_queries,
        streaming_history,
        user_data,
        user_library,
    ) = data

    # Start inserting documents in parallel
    async_threads = list()
    num_of_processes = 8
    _pool = ThreadPool(processes=num_of_processes)

    async_threads.append(_pool.apply_async(database["follow"].insert_one, (follow,)))

    async_threads.append(
        _pool.apply_async(database["identity"].insert_one, (identity,))
    )

    async_threads.append(
        _pool.apply_async(database["inferences"].insert_one, (inferences,))
    )

    async_threads.append(
        _pool.apply_async(database["playlists"].insert_many, (playlists,))
    )

    async_threads.append(
        _pool.apply_async(database["search_queries"].insert_many, (search_queries,))
    )

    # async_threads.append(
    #     _pool.apply_async(
    #         database["streaming_history"].insert_many, (streaming_history,)
    #     )
    # )

    async_threads.append(
        _pool.apply_async(database["user_data"].insert_one, (user_data,))
    )

    async_threads.append(
        _pool.apply_async(database["user_library"].insert_one, (user_library,))
    )

    return streaming_history


def process_jsons(source: str, user_id: int) -> tuple:

    # Follow
    with open(source + "/Follow.json") as f:
        follow = json.load(f)
        follow["userId"] = user_id

    # Identity
    with open(source + "/Identity.json") as f:
        identity = json.load(f)
        identity["userId"] = user_id

    # Inferences
    with open(source + "/Inferences.json") as f:
        inferences = json.load(f)
        inferences["userId"] = user_id

    # All Playlists
    playlists = list()
    for playlist_file in glob.glob(source + "/Playlist*.json"):
        with open(playlist_file) as f:
            playlists.extend(json.load(f)["playlists"])

    # Search Queries
    search_queries = list()
    for search_query_file in glob.glob(source + "/SearchQueries*.json"):
        with open(search_query_file) as f:
            search_queries.extend(json.load(f))

    # Streaming History
    streaming_history = list()
    for streaming_history_file in glob.glob(source + "/StreamingHistory*.json"):
        with open(streaming_history_file) as f:
            streaming_history.extend(json.load(f))

    # User Data
    with open(source + "/Userdata.json") as f:
        user_data = json.load(f)
        user_data["userId"] = user_id

    # User Library
    with open(source + "/YourLibrary.json") as f:
        user_library = json.load(f)
        user_library["userId"] = user_id

    return (
        follow,
        identity,
        inferences,
        [dict(item, **{"userId": user_id}) for item in playlists],
        [dict(item, **{"userId": user_id}) for item in search_queries],
        [dict(item, **{"userId": user_id}) for item in streaming_history],
        user_data,
        user_library,
    )


@api_view(["POST"])
def decompress_and_upload_to_mongo(request):
    file_path, user_id = request.data["path"], request.data["userId"]
    temp_dir = tempfile.mkdtemp()
    with zipfile.ZipFile(file_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)
    extracted_source_folder = temp_dir + "/MyData"

    def do_it_later():
        streaming_history = dump_to_mongo(
            data=process_jsons(source=extracted_source_folder, user_id=user_id)
        )

        shutil.rmtree(temp_dir.lower())
        handle_streaming_history_with_track_ids(streaming_history=streaming_history)

        # Close mongodb connection
        client.close()

    return EarlyResponse(
        data="Uploaded.", then_callback=do_it_later, status=status.HTTP_200_OK
    )
