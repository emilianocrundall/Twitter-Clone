# Generated by Django 3.0.8 on 2020-07-14 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_complete_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='complete_name',
        ),
    ]
