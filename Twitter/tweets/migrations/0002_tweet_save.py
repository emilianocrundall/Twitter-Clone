# Generated by Django 3.0.8 on 2020-07-27 18:37

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tweets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='save',
            field=models.ManyToManyField(blank=True, null=True, related_name='is_saved', to=settings.AUTH_USER_MODEL),
        ),
    ]
