# Generated by Django 3.0.8 on 2020-07-13 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='complete_name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]