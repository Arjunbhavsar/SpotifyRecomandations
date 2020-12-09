import spotipy
import os

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from spotify_manager.utils.helper import get_audio_features, get_feature_lists

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
    saved_image_location = "{0}/{1}/{2}".format(
        Path(__file__).parents[3], "Frontend/src/assets/img/userData", user_id
    )
    os.makedirs(saved_image_location, exist_ok=True)
    result_fig.savefig(saved_image_location + "likes_dislikes.png")
    plt.ioff()
    plt.close()

    return Response(
        data={
            "image": saved_image_location + "likes_dislikes.png",
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
    return Response(
        data={
            "image": saved_image_location,
            "description": "something something something",
        },
        status=status.HTTP_200_OK,
    )
