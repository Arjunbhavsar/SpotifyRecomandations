import spotipy
import spotipy.util as util

# Basic user authorization and printing the saved tracks
scope = "user-library-read"
username = "55kjweb2cok4nobnlxqsaph28"
token = util.prompt_for_user_token(
    username,
    scope,
    client_id="f85594c5722f4e6e91c9afb63cb3392d",
    client_secret="dbe71afea5274171b8613577319cf3fa",
    redirect_uri="http://localhost:8082/",
)

if token:
    sp = spotipy.Spotify(auth=token)
    results = sp.current_user_saved_tracks()
    for item in results["items"]:
        track = item["track"]
        print(track["name"] + " - " + track["artists"][0]["name"])
else:
    print("Can't get token for", username)
