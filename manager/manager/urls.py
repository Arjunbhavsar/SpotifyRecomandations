"""manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from spotify_manager.views.follow_create import get_follow_data
from spotify_manager.views.mongo_dump import (
    decompress_and_upload_to_mongo,
    # dump_streaming_history,
)

from spotify_manager.views.visualizations import get_liked_disliked_graphs

urlpatterns = [
    # url(r"^follow/create", create_follow),
    url(r"^user/dump", decompress_and_upload_to_mongo),
    url(r"^user/(?P<user_id>\w+)/likes", get_liked_disliked_graphs),
    # url(r"^user/sh/dump", dump_streaming_history),
    url(r"^user/(?P<user_id>\w+)/follow", get_follow_data),
    path("admin/", admin.site.urls),
]
