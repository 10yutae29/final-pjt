from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse
import requests

from rest_framework import status
from .models import Movie, Genre, PreferGenre
from accounts.models import User
from .serializers import MovieListSerializer, MovieSerializer, PreferGenreListSerializer

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


def recommend(request):
    prefer_genres = PreferGenre.objects.all()

    # 선호 장르가 있는 유저의 리스트를 만들어서 확인한다.
    user_has_prefers = []
    for prefer_genre in prefer_genres:
        user_has_prefers.append(prefer_genre.id)
    
    # 로그인된 사용자의 정보를 받아올 예정 테스트를 위해 임의로 선택한 유저(3) 정보
    request.user = prefer_genre.id

    # 유저의 장르 선호 정보가 있다면
    if request.user in user_has_prefers:
        user_prefer_genres = PreferGenre.objects.get(pk=request.user)
        print('!!!!!!!!!!!11')
        print(user_prefer_genres)
        for user_prefer_genre in user_prefer_genres:
            context = {
                'prefer': user_prefer_genre
            }
        return JsonResponse(context)
        # print(user_prefer_genres.adventure)

        #     print(user_prefer_genre)

        # pass



    # 유저의 장르 선호 정보가 없다면
    else:
        # 영화 선택 페이지로 연결
        return []




@api_view(['GET'])
def prefer_genre_list(request):
    prefer_genres = PreferGenre.objects.all()
    serializer = PreferGenreListSerializer(prefer_genres, many=True)
    return Response(serializer.data)


def prefer_genre(requset):
    genres = Genre.objects.all()
    user = User.objects.get(pk=2)
    prefer_genre = PreferGenre()
    prefer_genre.id = user
    prefer_genre.sciencefiction = 4
    prefer_genre.adventure = 2
    prefer_genre.fantasy = 3
    prefer_genre.animation = 0
    prefer_genre.drama = 1
    prefer_genre.horror = 2
    prefer_genre.action = 0
    prefer_genre.comedy = 0
    prefer_genre.history = 0
    prefer_genre.western = 0
    prefer_genre.thriller = 0
    prefer_genre.crime = 0
    prefer_genre.documentary = 0
    prefer_genre.mystery = 0
    prefer_genre.music = 0
    prefer_genre.romance = 0
    prefer_genre.family = 0
    prefer_genre.war = 0
    prefer_genre.tvmovie = 0
    prefer_genre.save()

# 장르 이름으로 prefer_genre 인스턴스에 접근하고 싶어.....
# def prefer_genre(requset):
#     genres = Genre.objects.all()
#     user = User.objects.get(pk=3)
#     prefer_genre = PreferGenre()
#     prefer_genre.id = user
#     for genre in genres:
#         name = genre.name
#         prefer_genre[name] = 0
#     prefer_genre.save()


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
    results = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f5c70cf3de1ffb0fae4f5469051c4be3").json().get('genres')
    
    for result in results:
        genre = Genre()
        genre.id = result.get('id')
        genre.name = result.get('name').lower().replace(' ', '')
        genre.save()
