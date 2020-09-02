from django.urls import path, include
from accounts import views
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', views.RegisterAPIView.as_view()),
    path('api/auth/login', views.LoginAPIView.as_view()),
    path('api/auth/user', views.UserAPIView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view()),
    path('api/auth/users', views.UserListAPIView.as_view()),
    path('api/auth/users/<pk>/', views.UserDetailAPIView.as_view()),
    path('api/auth/followers/<user_id>/', views.UserFollowersAPIView.as_view()),
    path('api/auth/following/<user_id>/', views.UserFollowingAPIView.as_view()),
    path('api/auth/follow/<user_id>/', views.FollowUserAPIView.as_view()),
    path('api/auth/unfollow/<user_id>/', views.UnfollowUserAPIView.as_view()),
    path('api/auth/user/update/', views.UserUpdateAPIView.as_view())
]
