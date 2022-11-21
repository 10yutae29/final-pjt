# Generated by Django 3.2.13 on 2022-11-21 15:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='genre',
            name='prefer_user',
            field=models.ManyToManyField(related_name='prefer_genres', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='movie',
            name='genres',
            field=models.ManyToManyField(to='movies.Genre'),
        ),
        migrations.DeleteModel(
            name='PreferGenre',
        ),
    ]
