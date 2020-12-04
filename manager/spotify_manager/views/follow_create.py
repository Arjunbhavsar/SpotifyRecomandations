import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from spotify_manager.models.follow import Follow


@api_view(["POST"])
def create_follow(request):
    payload = request.data
    print(payload)
    follow_data = Follow(follower_count=payload["followerCount"],
                         following_users_count=payload["followingUsersCount"],
                         following_artists=payload["followingArtists"],
                         user_id=payload["user_id"])
    follow_data.save()
    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def get_follow_data(request, user_id):
    user_follow_data = Follow.objects.get(user_id=user_id)
    return Response(data=json.loads(user_follow_data.to_json()), status=status.HTTP_200_OK)
