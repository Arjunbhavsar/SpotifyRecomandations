import os

import boto3
from django.apps import AppConfig

s3 = None


class AmazonS3:
    def __init__(self):
        credentials = {
            "aws_access_key_id": os.getenv("ACCESS_KEY_ID"),
            "aws_secret_access_key": os.getenv("SECRET_ACCESS_KEY"),
        }
        self.client = boto3.client("s3", **credentials)
        self.bucket = os.getenv("BUCKET_NAME")


class SpotifyManagerConfig(AppConfig):
    name = "spotify_manager"

    def ready(self):
        global s3
        s3 = AmazonS3()
