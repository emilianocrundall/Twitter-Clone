# Generated by Django 3.0.8 on 2020-08-17 18:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0006_auto_20200812_1955'),
    ]

    operations = [
        migrations.AlterField(
            model_name='response',
            name='response',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='response_to_response', to='tweets.Response'),
        ),
    ]
