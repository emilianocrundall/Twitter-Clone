from django.db import models
from django.conf import settings

class Tweet(models.Model):
    text = models.CharField(blank=True, null=True, max_length=280)
    date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='owner', on_delete=models.CASCADE)
    saved = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='saved')
    reply = models.ForeignKey("self", blank=True, null=True, related_name='reply_to', on_delete=models.CASCADE)
    retweet = models.ForeignKey("self", blank=True, null=True, related_name='retweet_to', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.text

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_like', on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, related_name='tweet_like', on_delete=models.CASCADE, blank=True, null=True)
