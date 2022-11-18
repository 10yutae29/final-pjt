from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse
import requests

from rest_framework import status
from .models import Movie, Genre
from .serializers import MovieListSerializer, MovieSerializer, CommentSerializer

from pprint import pprint
# Create your views here.


@api_view(['GET'])
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)
    

@api_view(['GET', 'POST'])
def movie_detail(request, movie_pk):
    if request.method == 'GET':
        movie = Movie.objects.get(pk=movie_pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['POST'])
def movie_likes(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if movie.like_users.filter(pk=request.user.pk).exists():
        movie.like_users.remove(request.user)
        is_liked = False
    else:
        movie.like_users.add(request.user)
        is_liked = True
    context = {
        'is_liked': is_liked,
    }
    return JsonResponse(context)










def get_movie(request):
    response = requests.get("https://api.themoviedb.org/3/movie/top_rated?api_key=f5c70cf3de1ffb0fae4f5469051c4be3&language=ko-kr").json()
    results = response.get('results')
    
    for result in results:
        movie = Movie()
        movie.id = result.get('id')
        movie.poster_path = result.get('poster_path')
        movie.popularity = result.get('popularity')
        movie.vote_average = result.get('vote_average')
        movie.overview = result.get('overview')
        movie.release_date = result.get('release_date')
        movie.title = result.get('title')
        movie.save()

        genre_ids = result.get('genre_ids')
        for genre_id in genre_ids:
            movie.genres.add(genre_id)
            

def get_genres(request):
    results = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f5c70cf3de1ffb0fae4f5469051c4be3&language=ko-kr").json().get('genres')
    
    for result in results:
        genre = Genre()
        genre.id = result.get('id')
        genre.name = result.get('name')
        genre.save()
