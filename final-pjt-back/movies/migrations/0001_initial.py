# Generated by Django 3.2.13 on 2022-11-19 04:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=30)),
                ('release_date', models.DateTimeField()),
                ('overview', models.TextField()),
                ('vote_average', models.FloatField()),
                ('popularity', models.IntegerField()),
                ('poster_path', models.CharField(max_length=200)),
                ('genres', models.ManyToManyField(related_name='movies', to='movies.Genre')),
                ('like_users', models.ManyToManyField(related_name='liked_movies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
