# Generated by Django 3.0.8 on 2020-08-26 14:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tweets', '0010_auto_20200826_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='retweet',
            field=models.ManyToManyField(blank=True, related_name='retweet', to=settings.AUTH_USER_MODEL),
        ),
    ]
