import os
from math import pi
from pathlib import Path

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


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

    return "/" + user_id + "/acoustics.png"
