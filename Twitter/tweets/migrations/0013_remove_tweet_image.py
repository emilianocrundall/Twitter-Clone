# Generated by Django 3.0.8 on 2020-08-31 14:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0012_auto_20200827_1647'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tweet',
            name='image',
        ),
    ]
