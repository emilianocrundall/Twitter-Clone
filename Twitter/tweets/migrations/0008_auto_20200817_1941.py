# Generated by Django 3.0.8 on 2020-08-17 19:41

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tweets', '0007_auto_20200817_1832'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Response',
            new_name='Reply',
        ),
    ]
