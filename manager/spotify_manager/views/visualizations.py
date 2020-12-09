import spotipy
import os

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
import pandas as pd

from spotify_manager.apps import s3
from spotify_manager.utils.helper import (
    get_audio_features,
    get_feature_lists,
    get_user_playlists,
    get_user_playlists_songs,
    get_track_features,
    get_top_artists_for_user,
)

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

base_url = "https://{0}.s3.us-east-2.amazonaws.com/".format(os.environ["BUCKET_NAME"])


@api_view(["GET"])
def get_liked_disliked_graphs(request, user_id):
    auth_token = request.META.get("HTTP_AUTHORIZATION", None)
    sp = spotipy.Spotify(auth=auth_token)
    n_bins = 20
    fig, axs = plt.subplots(figsize=(24, 8), nrows=2, ncols=4)
    axs = axs.flatten()

    audio_features1, audio_features2 = get_audio_features(sp=sp)

    for song1, song2 in zip(audio_features1, audio_features2):
        if song1 is None:
            audio_features1.remove(song1)
        if song2 is None:
            audio_features2.remove(song2)

    index = 0
    result_fig = None
    for feature in columns[1:]:
        ax = axs[index]
        ax.set_title(feature)
        feature_list_to_plot1 = []
        feature_list_to_plot2 = []

        for song1, song2 in zip(audio_features1, audio_features2):
            feature_list_to_plot1.append(song1[feature])
            feature_list_to_plot2.append(song2[feature])

        sns.distplot(
            feature_list_to_plot1,
            hist=True,
            bins=n_bins,
            color="blue",
            hist_kws={"edgecolor": "orange"},
            kde_kws={"linewidth": 4},
            ax=ax,
        )
        result_fig = sns.distplot(
            feature_list_to_plot2,
            hist=True,
            bins=n_bins,
            color="green",
            hist_kws={"edgecolor": "yellow"},
            kde_kws={"linewidth": 4},
            ax=ax,
        )
        index += 1

    result_fig = result_fig.get_figure()
    saved_image_location = "{0}/{1}/{2}/".format(
        Path(__file__).parents[3], "Frontend/src/assets/img/userData", user_id
    )
    os.makedirs(saved_image_location, exist_ok=True)
    result_fig.savefig(saved_image_location + "likes_dislikes.png")
    plt.ioff()
    plt.close()

    s3.client.upload_file(
        saved_image_location + "likes_dislikes.png",
        os.environ["BUCKET_NAME"],
        "{0}-{1}".format(user_id, "likes_dislikes.png"),
        {"ACL": "public-read", "ContentType": "image/png"},
    )

    return Response(
        data={
            "image": base_url + "{0}-{1}".format(user_id, "likes_dislikes.png"),
            "description": "something something something",
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_acoustics_chart(request, user_id):
    auth_token = request.META.get("HTTP_AUTHORIZATION", None)
    sp = spotipy.Spotify(auth=auth_token)
    audio_features1, audio_features2 = get_audio_features(sp=sp)
    saved_image_location = get_feature_lists(
        audio_features1=audio_features1,
        audio_features2=audio_features2,
        user_id=user_id,
    )

    s3.client.upload_file(
        saved_image_location + "acoustics.png",
        os.environ["BUCKET_NAME"],
        "{0}-{1}".format(user_id, "acoustics.png"),
        {"ACL": "public-read", "ContentType": "image/png"},
    )

    return Response(
        data={
            "image": base_url + "{0}-{1}".format(user_id, "acoustics.png"),
            "description": "something something something",
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def get_top_artists(request, user_id):
    auth_token = request.META.get("HTTP_AUTHORIZATION", None)
    sp = spotipy.Spotify(auth=auth_token)
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
    playlist_artist = (
        list_song_feature.groupby("artist", as_index=True)["song_id", "list_id"]
        .nunique()
        .sort_values(by=["song_id", "list_id"], ascending=False)
    )
    playlist_artist = playlist_artist.reset_index(level="artist")
    playlist_artist_filter = playlist_artist[
        (playlist_artist["song_id"] > 1) | (playlist_artist["list_id"] > 1)
    ]
    saved_image_location = get_top_artists_for_user(
        playlist_artist_filter=playlist_artist_filter, user_id=user_id
    )

    s3.client.upload_file(
        saved_image_location + "top_artists.html",
        os.environ["BUCKET_NAME"],
        "{0}-{1}".format(user_id, "top_artists.html"),
        {"ACL": "public-read", "ContentType": "text/html"},
    )

    return Response(
        data={
            "image": base_url + "{0}-{1}".format(user_id, "top_artists.html"),
            "description": "something something something",
        },
        status=status.HTTP_200_OK,
    )
