from rest_framework import serializers
from .models import Tweet, Like
from accounts.serializers import UserSerializer

class RetweetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Tweet
        fields = '__all__'

class TweetSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    retweet = RetweetSerializer(read_only=True)
    class Meta:
        model = Tweet
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tweet = TweetSerializer(read_only=True)
    class Meta:
        model = Like
        fields = '__all__'

class LikeUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Like
        fields = '__all__'