from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    profile_photo = models.ImageField(blank=True, null=True, upload_to="covers/%Y/%m/%D/")
    follow = models.ManyToManyField(settings.AUTH_USER_MODEL, symmetrical=False, blank=True, related_name='following')
    follower = models.ManyToManyField(settings.AUTH_USER_MODEL, symmetrical=False, blank=True, related_name='followers')
    bio = models.CharField(max_length=300, blank=True)
    complete_name = models.CharField(max_length=200, blank=True)
