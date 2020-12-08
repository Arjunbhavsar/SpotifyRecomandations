import spotipy
import os
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import matplotlib.pyplot as plt
import seaborn as sns

from spotify_manager.utils.helper import getTrivialInfo, getSongList


@api_view(["GET"])
def get_liked_disliked_graphs(request, user_id):
    sp = spotipy.Spotify(auth=os.environ["AUTH_TOKEN"])
    playlist_dict = {
        "Liked": "3s3OCt230DDEIGX8xOY58A",
        "Dislike": "7I2vgcXF2DBLsmC7EqahC0",
    }
    liked_id = playlist_dict["Liked"]
    dislikes_id = playlist_dict["Dislike"]

    likedplay = sp.playlist(playlist_id=liked_id)
    dislikeplay = sp.playlist(playlist_id=dislikes_id)

    column = (
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
    playlistList = [likedplay, dislikeplay]
    n_bins = 20
    fig, axs = plt.subplots(figsize=(24, 8), nrows=2, ncols=4)
    axs = axs.flatten()
    dfTrivialList = getTrivialInfo(playlistList)
    songIdsList = getSongList(dfTrivialList)
    songIds1 = songIdsList[0]
    songIds2 = songIdsList[1]

    audioFeatures1 = sp.audio_features(tracks=songIds1)
    audioFeatures2 = sp.audio_features(tracks=songIds2)

    for song1, song2 in zip(audioFeatures1, audioFeatures2):
        if song1 is None:
            audioFeatures1.remove(song1)
        if song2 is None:
            audioFeatures2.remove(song2)

    index = 0
    result_fig = None
    for feature in column[1:]:
        ax = axs[index]
        ax.set_title(feature)
        featureListToPlot1 = []
        featureListToPlot2 = []

        for song1, song2 in zip(audioFeatures1, audioFeatures2):
            featureListToPlot1.append(song1[feature])
            featureListToPlot2.append(song2[feature])

        sns.distplot(
            featureListToPlot1,
            hist=True,
            bins=n_bins,
            color="blue",
            hist_kws={"edgecolor": "orange"},
            kde_kws={"linewidth": 4},
            ax=ax,
        )
        result_fig = sns.distplot(
            featureListToPlot2,
            hist=True,
            bins=n_bins,
            color="pink",
            hist_kws={"edgecolor": "yellow"},
            kde_kws={"linewidth": 4},
            ax=ax,
        )
        index += 1

    result_fig = result_fig.get_figure()
    return Response(data=result_fig, content_type="image/png", status=status.HTTP_200_OK)
