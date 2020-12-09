import os
from math import pi
from pathlib import Path

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.graph_objects as go


columns = (
    "songName",
    "danceability",
    "energy",
    "loudness",
    "speechiness",
    "acousticness",
    "valence",
    "instrumentalness",
    "tempo",
)

playlist_dict = {
    "Liked": "3s3OCt230DDEIGX8xOY58A",
    "Disliked": "7I2vgcXF2DBLsmC7EqahC0",
}


def get_trivial_info(playlist_list):
    df_trivial_list = []
    for playlist in playlist_list:
        index = 0
        df_trivial = pd.DataFrame(
            columns=("SongName", "SongId", "SongArtist"),
            index=np.arange(0, len(playlist["tracks"]["items"])),
        )
        for item in playlist["tracks"]["items"]:
            track = item["track"]
            df_trivial.loc[index] = [
                track["name"],
                track["id"],
                track["artists"][0]["name"],
            ]
            index += 1
        df_trivial_list.append(df_trivial)
    return df_trivial_list


def get_song_list(df_trivial_list):
    song_ids_list = []
    for dfTrivial in df_trivial_list:
        song_ids = list(dfTrivial["SongId"])
        song_ids_list.append(song_ids)
    return song_ids_list


def get_features_list(
    dfTrivialList,
    songIdsList,
    sp,
    columns=(
        "SongName",
        "Danceability",
        "Energy",
        "Loudness",
        "Speechiness",
        "Acousticness",
        "Valence",
        "Instrumentalness",
        "Tempo",
    ),
):
    df_features_list = []
    for dfTrivial, songIds in zip(dfTrivialList, songIdsList):
        index = 0
        audio_features = sp.audio_features(tracks=songIds)
        categories = columns[1:]
        dfFeatures = pd.DataFrame(columns=columns, index=np.arange(0, len(songIds)))
        for i, song in enumerate(audio_features):
            dfFeatures.loc[index] = [
                list(dfTrivial["SongName"])[i],
                song["danceability"],
                song["energy"],
                song["loudness"],
                song["speechiness"],
                song["acousticness"],
                song["valence"],
                song["instrumentalness"],
                song["tempo"],
            ]
            index += 1
        df_features_list.append(dfFeatures)
    return df_features_list


def get_features_to_use(df_features_list, categories=None):
    if categories is None:
        categories = [
            "Danceability",
            "Energy",
            "Speechiness",
            "Acousticness",
            "Valence",
        ]
    features_to_use_list = []
    for dfFeatures in df_features_list:
        features = dfFeatures[categories]
        features_to_use_list.append(features)
    return features_to_use_list


def feature_preprocessing(song, categories=None):
    if categories is None:
        categories = [
            "Danceability",
            "Energy",
            "Speechiness",
            "Acousticness",
            "Valence",
        ]
    return song[categories]


def get_audio_features(sp) -> tuple:
    liked_id = playlist_dict["Liked"]
    dislikes_id = playlist_dict["Disliked"]

    liked_plays = sp.playlist(playlist_id=liked_id)
    dislikes_plays = sp.playlist(playlist_id=dislikes_id)

    playlist_list = [liked_plays, dislikes_plays]
    df_trivial_list = get_trivial_info(playlist_list)
    song_ids_list = get_song_list(df_trivial_list)
    song_ids1 = song_ids_list[0]
    song_ids2 = song_ids_list[1]

    audio_features1 = sp.audio_features(tracks=song_ids1)
    audio_features2 = sp.audio_features(tracks=song_ids2)

    return audio_features1, audio_features2


def get_feature_lists(audio_features1, audio_features2, user_id) -> str:
    categories = columns[1:]
    tempo_features_together = []
    loudness_features_together = []

    for song1, song2 in zip(audio_features1, audio_features2):
        tempo_features_together.append(song1["tempo"])
        tempo_features_together.append(song2["tempo"])

        loudness_features_together.append(song1["loudness"])
        loudness_features_together.append(song2["loudness"])

    minimum_tempo = min(tempo_features_together)
    maximum_tempo = max(tempo_features_together)
    minimum_loudness = min(loudness_features_together)
    maximum_loudness = max(loudness_features_together)

    for song1, song2 in zip(audio_features1, audio_features2):
        song1["tempo"] = (song1["tempo"] - minimum_tempo) / (
            maximum_tempo - minimum_tempo
        )
        song2["tempo"] = (song2["tempo"] - minimum_tempo) / (
            maximum_tempo - minimum_tempo
        )

        song1["loudness"] = (song1["loudness"] - minimum_loudness) / (
            maximum_loudness - minimum_loudness
        )
        song2["loudness"] = (song2["loudness"] - minimum_loudness) / (
            maximum_loudness - minimum_loudness
        )

    df_features_list = []
    audio_features_list = [audio_features1, audio_features2]
    for audio_features in audio_features_list:
        df_features = pd.DataFrame(
            columns=categories, index=np.arange(0, len(audio_features))
        )
        for i, song in enumerate(audio_features[:99]):
            df_features.loc[i] = [
                song["danceability"],
                song["energy"],
                song["loudness"],
                song["speechiness"],
                song["acousticness"],
                song["valence"],
                song["instrumentalness"],
                song["tempo"],
            ]

        df_features_list.append(df_features)

    for i in range(len(df_features_list)):
        df_features_list[i] = df_features_list[i].mean()

    df_features_list = pd.concat(df_features_list, axis=1)

    N = len(categories)
    angles = [n / float(N) * 2 * pi for n in range(N)]
    angles += angles[:1]

    fig = plt.figure(figsize=(8, 8))
    ax = plt.subplot(111, polar=True)
    ax.set_theta_offset(pi)
    ax.set_theta_direction(-1)

    plt.xticks(angles[:-1], categories)

    ax.set_rlabel_position(0)
    plt.yticks([0, 0.5, 1], ["0", "0.5", "1"], color="grey", size=7)
    plt.ylim(0, 1)

    colors = ["b", "green"]
    for i, key in enumerate(playlist_dict.keys()):
        if i < 4:
            values = list(df_features_list[i])
            values += values[:1]
            ax.plot(
                angles,
                values,
                color=colors[i],
                linewidth=3,
                linestyle="solid",
                label=key,
            )

    # Add legend
    plt.legend(bbox_to_anchor=(0.1, 0.1))

    saved_image_location = "{0}/{1}/{2}/".format(
        Path(__file__).parents[3], "Frontend/src/assets/img/userData", user_id
    )
    os.makedirs(saved_image_location, exist_ok=True)
    plt.savefig(saved_image_location + "acoustics.png")
    plt.close()

    return saved_image_location


def get_user_playlists(user_id, sp):
    my_playlists = pd.DataFrame(columns=["id", "spotify_id", "list_name"])
    playlists = sp.user_playlists(user_id)
    while playlists:
        for i, playlist in enumerate(playlists["items"]):
            spotify_id = playlist["id"]
            list_name = playlist["name"]
            my_playlists = my_playlists.append(
                {"id": i + 1, "spotify_id": spotify_id, "list_name": list_name},
                ignore_index=True,
            )

        if playlists["next"]:
            playlists = sp.next(playlists)
        else:
            playlists = None

    return my_playlists


def get_user_playlists_songs(user_playlists, user_id, sp):
    user_tracks = pd.DataFrame(
        columns=[
            "list_id",
            "song_id",
            "song_name",
            "artist",
            "popularity",
            "release_date",
        ]
    )
    for list_id in user_playlists["spotify_id"]:
        songs = []
        content = sp.user_playlist_tracks(
            user_id, list_id, fields=None, limit=100, offset=0, market=None
        )
        songs += content["items"]
        for song in songs:
            user_tracks = user_tracks.append(
                {
                    "list_id": list_id,
                    "song_id": song["track"]["id"],
                    "song_name": song["track"]["name"],
                    "artist": song["track"]["artists"][0]["name"],
                    "popularity": song["track"]["popularity"],
                    "release_date": song["track"]["album"]["release_date"],
                },
                ignore_index=True,
            )
    return user_tracks


def get_track_features(tracks, sp):
    user_tracks_features = pd.DataFrame(
        columns=[
            "song_id",
            "energy",
            "liveness",
            "tempo",
            "speechiness",
            "acousticness",
            "instrumentalness",
            "danceability",
            "duration_ms",
            "loudness",
            "valence",
            "mode",
            "key",
        ]
    )
    for song in tracks["song_id"]:
        features = sp.audio_features(tracks=[song])[0]
        user_tracks_features = user_tracks_features.append(
            {
                "song_id": song,
                "energy": features["energy"],
                "liveness": features["liveness"],
                "tempo": features["tempo"],
                "speechiness": features["speechiness"],
                "acousticness": features["acousticness"],
                "instrumentalness": features["instrumentalness"],
                "danceability": features["danceability"],
                "duration_ms": features["duration_ms"],
                "loudness": features["loudness"],
                "valence": features["valence"],
                "mode": features["mode"],
                "key": features["key"],
            },
            ignore_index=True,
        )

    return user_tracks_features


def get_top_artists_for_user(playlist_artist_filter, user_id):
    fig = go.Figure(
        data=[
            go.Bar(
                name="Number of Song",
                x=playlist_artist_filter.artist,
                y=playlist_artist_filter.song_id,
                marker_color="rgb(129,180,227)",
            ),
            go.Bar(
                name="Number of Playlist",
                x=playlist_artist_filter.artist,
                y=playlist_artist_filter.list_id,
                marker_color="rgb(76,153,160)",
            ),
        ]
    )
    # Change the bar mode
    fig.update_layout(
        barmode="group",
        xaxis_tickangle=-45,
        title="Number of song and number of playlist per artist",
        xaxis_title="Artist",
    )

    saved_image_location = "{0}/{1}/{2}/".format(
        Path(__file__).parents[3], "Frontend/src/assets/img/userData", user_id
    )
    os.makedirs(saved_image_location, exist_ok=True)
    fig.write_html(saved_image_location + "top_artists.html")
    return saved_image_location


def get_song_features(user_id, sp):
    user_playlists = get_user_playlists(user_id=user_id, sp=sp)
    playlists_with_songs = get_user_playlists_songs(
        user_playlists=user_playlists, user_id=user_id, sp=sp
    )
    track_features = get_track_features(tracks=playlists_with_songs, sp=sp)
    song_feature = pd.merge(
        playlists_with_songs,
        track_features,
        how="left",
        left_on="song_id",
        right_on="song_id",
    )
    list_song_feature = pd.merge(
        user_playlists,
        song_feature,
        how="left",
        left_on="spotify_id",
        right_on="list_id",
    )
    list_song_feature["popularity"] = pd.to_numeric(
        list_song_feature["popularity"], downcast="integer"
    )
    return list_song_feature


def get_user_track_popularity(list_song_feature, user_id):
    fig = go.Figure()

    playlists = list_song_feature["list_name"].unique()

    for playlist in playlists:
        fig.add_trace(
            go.Box(
                x=list_song_feature["list_name"][
                    list_song_feature["list_name"] == playlist
                ],
                y=list_song_feature["popularity"][
                    list_song_feature["list_name"] == playlist
                ],
                name=playlist,
                marker_color="rgb(129,180,227)",
            )
        )
    fig.update_traces(boxpoints="all")  # show all points
    fig.update_layout(
        showlegend=False,
        xaxis_tickangle=-30,
        title="Distribution of track popularity",
        xaxis_title="Playlist",
    )

    saved_image_location = "{0}/{1}/{2}/".format(
        Path(__file__).parents[3], "Frontend/src/assets/img/userData", user_id
    )
    os.makedirs(saved_image_location, exist_ok=True)
    fig.write_html(saved_image_location + "track_popularity.html")
    return saved_image_location
