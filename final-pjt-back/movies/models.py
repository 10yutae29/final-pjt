from django.db import models
from django.conf import settings

# Create your models here.

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)


class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=30)
    release_date = models.DateField()
    overview = models.TextField()
    vote_average = models.FloatField()
    genres = models.ManyToManyField(Genre)
    popularity = models.IntegerField()
    poster_path = models.CharField(max_length=200)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_movies')


class Prefer(models.Model):
    
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    count = models.IntegerField(null=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'genre'], name='user_prefer_value'),
        ]