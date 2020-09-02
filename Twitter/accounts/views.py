from django.shortcuts import render
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import generics, permissions, status, filters
from knox.models import AuthToken
from rest_framework.views import APIView
from .models import User

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class UserUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['username']
    filter_backends = (filters.SearchFilter,)

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FollowUserAPIView(APIView):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, user_id, format=None):
        current_user = self.request.user
        try:
            user_follow = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user_follow.follower.filter(id=current_user.id).exists():
            return Response(status=status.HTTP_304_NOT_MODIFIED)
        else:
            user_follow.follower.add(current_user)
            current_user.follow.add(user_follow)
            serializer = UserSerializer(user_follow)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class UnfollowUserAPIView(APIView):
    permissions_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, user_id, format=None):
        current_user = self.request.user
        try:
            user_follow = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user_follow.follower.filter(id=current_user.id).exists():
            user_follow.follower.remove(current_user)
            current_user.follow.remove(user_follow)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_304_NOT_MODIFIED)

class UserFollowingAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        queryset = user.follow.all()
        return queryset

class UserFollowersAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)
        queryset = user.follower.all()
        return queryset
