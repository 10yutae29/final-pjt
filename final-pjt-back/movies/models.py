from django.db import models

# Create your models here.

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)


class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=30)
    release_date = models.DateTimeField()
    overview = models.TextField()
    vote_average = models.FloatField()
    genre_ids = models.CharField(max_length=100)
    popularity = models.IntegerField()
    poster_path = models.CharField(max_length=200)

    