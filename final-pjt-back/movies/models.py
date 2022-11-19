from django.db import models
from django.conf import settings

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
    genres = models.ManyToManyField(Genre, related_name='movies')
    popularity = models.IntegerField()
    poster_path = models.CharField(max_length=200)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_movies')


    
class PreferGenre(models.Model):
    id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)


genres = Genre.objects.all()
for genre in genres:
    name = genre.name
    PreferGenre.add_to_class(name, models.IntegerField())