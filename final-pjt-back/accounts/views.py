from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers, UserCangeSerializer
from movies.serializers import MovieSerializer, MovieListSerializer
from django.contrib.auth import get_user_model
import random
from movies.models import Genre, Movie, Prefer
from itertools import chain



# # Create your views here.


@api_view(['GET'])
def user_detail(request, user_pk):
    user = get_user_model().objects.get(pk=user_pk)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)


@api_view(['GET','POST'])
def recommend(request, user_pk):
    if request.method == 'POST':
        user_picked_movie_ids = request.data['picked_movies']
        print(user_picked_movie_ids)
        for user_picked_movie_id in user_picked_movie_ids:
            user_picked_movie = Movie.objects.get(pk=user_picked_movie_id)
            user_picked_genres = user_picked_movie.genres.all()
            for user_picked_genre in user_picked_genres:
                prefers = Prefer.objects.all()
                if prefers.filter(user=request.user, genre=user_picked_genre).exists():
                    prefer = Prefer.objects.get(user=request.user, genre=user_picked_genre)
                    prefer.count += 1
                    prefer.save()
                else:
                    prefer = Prefer.objects.create(user=request.user, genre=user_picked_genre, count=1)
        context = { }
        return Response(context)

    elif request.method == 'GET':
        user = get_user_model().objects.get(pk=user_pk)
        prefers = Prefer.objects.all()
        if prefers.filter(user=user).exists():
            user_prefers = prefers.filter(user=user)
            genre_prefer_count = {}
            for user_prefer in user_prefers:
                if user_prefer.count in genre_prefer_count.keys():
                    genre_prefer_count[user_prefer.count].append(user_prefer.genre.id)
                else: 
                    genre_prefer_count[user_prefer.count] = [user_prefer.genre.id]
            cnt_val_list = sorted(genre_prefer_count.keys(), reverse=True)
            # ????????? ?????? ?????? ?????? ??????
            result_cnt = 0
            result_datas = []
            for cnt_val in cnt_val_list:
                if cnt_val: 
                    result_datas.append(genre_prefer_count[cnt_val])
                    result_cnt += len(genre_prefer_count[cnt_val])
                if result_cnt >= 3 :
                    break 
            # ?????? ?????? ????????? ?????????
            all_genre_cnt = 0
            prefer_genres = []
            # ?????? ?????? ????????? ?????????
            if result_datas:
                for result_data in result_datas:
                    all_genre_cnt += len(result_data)
                # ???????????? ????????? 3?????? ????????? ?????? ???????????? ????????? ??????
                if all_genre_cnt < 4:
                    for result_data in result_datas:
                        for result_d in result_data:
                            prefer_genres.append(result_d)
                # ???????????? ????????? 3?????? ?????? ???
                else:
                    # ????????? ?????? 3?????????
                    if len(result_datas) == 3:
                        # 1???, 2?????? ????????? ?????? ????????????
                        prefer_genres = result_datas[0] +result_datas[1]
                        # ????????? ?????? ????????? ????????? ????????? ???????????? ??????
                        third_genre = random.sample(result_datas[2], k=1)
                        # ????????? ????????? ??????
                        prefer_genres += third_genre
                    # ????????? ?????? 2?????????
                    elif len(result_datas) == 2:
                        # 1?????? ?????? ????????? ?????? ??????
                        prefer_genres = result_datas[0]
                        # 2????????? ???????????? ?????? ?????? ?????? ????????????
                        need_random_cnt = 3 - len(result_datas[0])
                        # 2??? ?????? ????????? ????????? ????????? ??? ?????? ???????????? ??????
                        second_genre = random.sample(result_datas[1], k = need_random_cnt)
                        # ????????? ????????? ??????
                        prefer_genres += second_genre
                    # ????????? ?????? 1?????????
                    elif len(result_datas) == 1:
                        # 3??? ???????????? ???????????? ??????
                        prefer_genres = random.sample(result_datas[0], k=3)
        # ?????? ?????? ????????? ????????? ???????????? ??????(POST method??? ?????????)
        else:
            prefer_genres = []

        if len(prefer_genres) == 0:
            return Response([])
            
        elif len(prefer_genres) == 1:
            genre = Genre.objects.get(pk=prefer_genres)
            movies = Movie.objects.filter(genres = genre).order_by('?')[:12]
            serializer = MovieListSerializer(movies, many=True)
            return Response(serializer.data)

        elif len(prefer_genres) == 2:
            random_movie_querysets = []
            genre1 = Genre.objects.get(pk=prefer_genres[0])
            movies1 = Movie.objects.filter(genres = genre1).order_by('?')[:8]
            random_movie_querysets += list(chain(movies1))
            genre2 = Genre.objects.get(pk=prefer_genres[1])
            movies2 = Movie.objects.filter(genres = genre2).order_by('?')[:7]
            random_movie_querysets += list(chain(movies2))
            serializer = MovieListSerializer(random_movie_querysets, many=True)
            return Response(serializer.data)

        elif len(prefer_genres) == 3:
            random_movie_querysets = []
            for prefer_genre in prefer_genres:
                genre = Genre.objects.get(pk=prefer_genre)
                movies = Movie.objects.filter(genres = genre).order_by('?')[:5]
                random_movie_querysets += list(chain(movies))
            serializer = MovieListSerializer(random_movie_querysets, many=True)
            return Response(serializer.data)

@api_view(['PUT'])
def userchange(request, user_pk):
    user = get_user_model().objects.get(pk=user_pk)
    if request.method == 'PUT':
        serializer = UserCangeSerializer(user, data=request.data )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

