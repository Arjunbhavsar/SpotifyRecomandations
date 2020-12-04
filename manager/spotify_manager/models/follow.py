# Create your models here.
from mongoengine import DynamicDocument, fields


class Follow(DynamicDocument):
    followerCount = fields.IntField(null=False)
    followingUsersCount = fields.IntField(null=False)
    followingArtists = fields.ListField()
    user_id = fields.IntField()

    meta = {
        "collection": "follow"
    }

    # def __init__(
    #     self, follower_count, following_users_count, following_artists, user_id, *args, **values
    # ):
    #     super().__init__(*args, **values)
    #     self.followerCount = follower_count
    #     self.followingUsersCount = following_users_count
    #     self.followingArtists = following_artists
    #     self.user_id = user_id
