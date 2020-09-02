from django.shortcuts import render
from rest_framework.views import Response
from rest_framework import status, permissions, generics, filters
from rest_framework.views import APIView
from .serializers import TweetSerializer, LikeSerializer, LikeUserSerializer
from accounts.models import User
from .models import Tweet, Like
from accounts.serializers import UserSerializer

class NewTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, format=None):
        current_user = self.request.user
        serializer = TweetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=current_user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class DeleteTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def delete(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            tweet = Tweet.objects.get(id=tweet_id, owner_id=current_user.id)
            tweet.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class TweetFeedAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TweetSerializer
    def get_queryset(self):
        current_user = self.request.user
        users = User.objects.filter(follower=current_user)
        queryset = Tweet.objects.filter(owner__in=users)
        return queryset

class UserTweetsAPIView(generics.ListAPIView):
    serializer_class = TweetSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = Tweet.objects.filter(owner=user_id, reply__isnull=True)
        return queryset

class TweetListAPIView(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    search_fields = ['text']
    filter_backends = (filters.SearchFilter,)

class TweetDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TweetSerializer
    queryset = Tweet.objects.all()

class LikesCurrentUserAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LikeUserSerializer
    def get_queryset(self):
        user_id = self.request.user.id
        queryset = Like.objects.filter(user=user_id)
        return queryset

class LikesUserAPIView(generics.ListAPIView):
    serializer_class = LikeSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = Like.objects.filter(user=user_id)
        return queryset

class LikesTweetAPIView(generics.ListAPIView):
    serializer_class = LikeUserSerializer
    def get_queryset(self):
        tweet_id = self.kwargs['tweet_id']
        queryset = Like.objects.filter(tweet=tweet_id)
        return queryset

class LikeTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            get_tweet = Tweet.objects.get(id=tweet_id)
            if Like.objects.filter(tweet=get_tweet.id, user=current_user.id).exists():
                return Response(status=status.HTTP_304_NOT_MODIFIED)
            else:
                request.data.update({
                    "tweet":get_tweet.id
                })
                serializer = LikeUserSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save(user=current_user)
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class UnlikeTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def delete(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            get_like = Like.objects.get(tweet=tweet_id, user=current_user.id)
            get_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ReplyTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            get_tweet = Tweet.objects.get(id=tweet_id)
            request.data.update({
                "reply": get_tweet.id
            })
            serializer = TweetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(owner=current_user)
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class RepliesAPIView(generics.ListAPIView):
    serializer_class = TweetSerializer
    def get_queryset(self):
        tweet_id = self.kwargs['tweet_id']
        queryset = Tweet.objects.filter(reply=tweet_id)
        return queryset

class RepliesByUserAPIView(generics.ListAPIView):
    serializer_class = TweetSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = Tweet.objects.filter(owner=user_id, reply__isnull=False)
        return queryset

class SavedTweetsAPIView(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        current_user = self.request.user
        queryset = Tweet.objects.filter(saved=current_user.id)
        return queryset

class SaveTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            get_tweet = Tweet.objects.get(id=tweet_id)
            if get_tweet.saved.filter(id=current_user.id).exists():
                return Response(status=status.HTTP_304_NOT_MODIFIED)
            else:
                get_tweet.saved.add(current_user)
                serializer = TweetSerializer(get_tweet)
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class RemoveSavedTweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            get_tweet = Tweet.objects.get(id=tweet_id)
            if get_tweet.saved.filter(id=current_user.id).exists():
                get_tweet.saved.remove(current_user)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_304_NOT_MODIFIED)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class CurrentUserRetweets(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        current_user = self.request.user
        queryset = Tweet.objects.filter(owner=current_user.id, retweet__isnull=False)
        return queryset

class RetweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            tweet = Tweet.objects.get(id=tweet_id)
            if Tweet.objects.filter(owner=current_user, retweet=tweet.id).exists():
                return Response(status=status.HTTP_304_NOT_MODIFIED)
            else:
                serializer = TweetSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save(owner=current_user, retweet=tweet)
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class UndoRetweetAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, tweet_id, format=None):
        current_user = self.request.user
        try:
            tweet = Tweet.objects.get(owner=current_user.id, retweet_id=tweet_id)
            tweet.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tweet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
