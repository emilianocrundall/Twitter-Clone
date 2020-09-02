from django.urls import path
from tweets import views

urlpatterns = [
    path('api/tweets/', views.TweetListAPIView.as_view()),
    path('api/new_tweet/', views.NewTweetAPIView.as_view()),
    path('api/tweets/<tweet_id>/delete/', views.DeleteTweetAPIView.as_view()),
    path('api/get_tweets/', views.TweetFeedAPIView.as_view()),
    path('api/get_tweets/<pk>/', views.TweetDetailAPIView.as_view()),
    path('api/users/tweets/<user_id>/', views.UserTweetsAPIView.as_view()),
    path('api/user/likes/', views.LikesCurrentUserAPIView.as_view()),
    path('api/users/<user_id>/likes/', views.LikesUserAPIView.as_view()),
    path('api/users/<user_id>/replies/', views.RepliesByUserAPIView.as_view()),
    path('api/users/tweets/<tweet_id>/likes/', views.LikesTweetAPIView.as_view()),
    path('api/users/tweets/<tweet_id>/like/', views.LikeTweetAPIView.as_view()),
    path('api/users/tweets/<tweet_id>/unlike/', views.UnlikeTweetAPIView.as_view()),
    path('api/get_tweets/<tweet_id>/reply/', views.ReplyTweetAPIView.as_view()),
    path('api/get_tweets/<tweet_id>/replies/', views.RepliesAPIView.as_view()),
    path('api/get_tweets/<tweet_id>/save/', views.SaveTweetAPIView.as_view()),
    path('api/get_tweets/<tweet_id>/remove/', views.RemoveSavedTweetAPIView.as_view()),
    path('api/user/saved_tweets/', views.SavedTweetsAPIView.as_view()),
    path('api/user/retweets/', views.CurrentUserRetweets.as_view()),
    path('api/users/tweets/<tweet_id>/retweet/', views.RetweetAPIView.as_view()),
    path('api/users/tweets/<tweet_id>/undo_retweet/', views.UndoRetweetAPIView.as_view()),
]