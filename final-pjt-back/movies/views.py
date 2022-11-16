from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
import requests

import json

from .models import Movie
from .serializers import MovieListSerializer

# Create your views here.

@api_view(['GET'])
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)
    

def get_movie(request):
    response = requests.get("https://api.themoviedb.org/3/movie/top_rated?api_key=f5c70cf3de1ffb0fae4f5469051c4be3&language=ko-kr").json()
    results = response.get('results')
    
    for result in results:
        movie = Movie()
        movie.id = result.get('id')
        movie.poster_path = result.get('poster_path')
        movie.popularity = result.get('popularity')
        movie.genre_ids = result.get('genre_ids')
        movie.vote_average = result.get('vote_average')
        movie.genre_ids = result.get('genre_ids')
        movie.overview = result.get('overview')
        movie.release_date = result.get('release_date')
        movie.title = result.get('title')
    
    open("mydata-new.json","wb").write(open("mydata.json").read().decode("unicode_escape").encode("utf8"))
