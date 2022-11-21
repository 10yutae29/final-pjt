from django.db import models
from django.conf import settings

# Create your models here.

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    prefer_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='prefer_genres')



class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=30)
    release_date = models.DateTimeField()
    overview = models.TextField()
    vote_average = models.FloatField()
    genres = models.ManyToManyField(Genre)
    popularity = models.IntegerField()
    poster_path = models.CharField(max_length=200)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_movies')


    
# class PreferGenre(models.Model):
#     id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
#     sciencefiction = models.IntegerField()
#     adventure = models.IntegerField()
#     fantasy = models.IntegerField()
#     animation = models.IntegerField()
#     drama = models.IntegerField()
    # horror = models.IntegerField()
    # action = models.IntegerField()
    # comedy = models.IntegerField()
    # history = models.IntegerField()
    # western = models.IntegerField()
    # thriller = models.IntegerField()
    # crime = models.IntegerField()
    # documentary = models.IntegerField()
    # mystery = models.IntegerField()
    # music = models.IntegerField()
    # romance = models.IntegerField()
    # family = models.IntegerField()
    # war = models.IntegerField()
    # tvmovie = models.IntegerField()

    # def __getitem__(self, key):
    #     return getattr(self, key)

# genres = Genre.objects.all()
# for genre in genres:
#     name = genre.name
#     PreferGenre.add_to_class(name, models.IntegerField())