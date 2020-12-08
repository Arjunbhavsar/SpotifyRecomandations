# Datasets used -
# https://www.kaggle.com/leonardopena/top-50-spotify-songs-by-each-country
# https://www.kaggle.com/leonardopena/top50spotify2019
# https://www.kaggle.com/leonardopena/top-spotify-songs-from-20102019-by-year

import pandas as pd
from pprint import pprint
# add CSV file location
csvfile = '/Users/shubhamgaikwad/Desktop/SQL-NOSQL/Spotify-project/top50.csv'
# add JSON file destination
jsonfile = '/Users/shubhamgaikwad/Desktop/SQL-NOSQL/Spotify-project/top50_2019.json'

df = pd.read_csv(csvfile, engine='python')

print("converting csv to json")
df.to_json(jsonfile, orient='records', indent=2)

# to import the json file to mongodb cluster-
#mongoimport --uri mongodb+srv://main_user:$hubham123@music-cluster.t9tjf.mongodb.net/music-data --collection music-collection --type json --file /Users/shubhamgaikwad/Desktop/SQL-NOSQL/Spotify-project/top_songs_last10_years_.json --jsonArray