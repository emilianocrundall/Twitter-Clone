# Generated by Django 3.0.8 on 2020-08-18 18:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0008_auto_20200817_1941'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='response',
        ),
        migrations.RemoveField(
            model_name='retweet',
            name='response',
        ),
        migrations.AddField(
            model_name='tweet',
            name='reply',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reply_to', to='tweets.Tweet'),
        ),
        migrations.DeleteModel(
            name='Reply',
        ),
    ]
