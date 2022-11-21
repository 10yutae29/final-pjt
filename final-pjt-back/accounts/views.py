from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from accounts.models import User
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers, PreferGenreSerializer

from movies.models import PreferGenre, Genre
# # Create your views here.


@api_view(['GET'])
def user_detail(request, user_pk):
    user = User.objects.get(pk=user_pk)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)

@api_view(['GET'])
def recommend(request, user_pk):
    prefer_genres = PreferGenre.objects.get(id=user_pk)
    serializer = PreferGenreSerializer(prefer_genres)
    genres = Genre.objects.all()

    # 가중치 값에 따른 장르명 저장
    genre_prefer_count = {}
    for genre in genres:
        if prefer_genres[f"{genre.name}"] not in genre_prefer_count: 
            genre_prefer_count[prefer_genres[f"{genre.name}"]] = []
        cnt = genre_prefer_count[prefer_genres[f"{genre.name}"]]
        cnt.append(genre.name)
    print(genre_prefer_count)

    return Response(serializer.data)
    
    # user_has_prefers = []
    # print('!!!!!!!!!!!11')
    # for prefer_genre in prefer_genres:
    #     user_has_prefers.append(prefer_genre.id)

    # # 유저의 장르 선호 정보가 있다면
    # if user_pk in user_has_prefers:
    #     user_prefer_genres = PreferGenre.objects[user_pk]
    #     print(user_prefer_genres)
    #     for user_prefer_genre in user_prefer_genres:
    #         context = {
    #             'prefer': user_prefer_genre
    #         }
    #     return JsonResponse(context)
    #     # print(user_prefer_genres.adventure)
    #     #     print(user_prefer_genre)
    #     # pass
    # # 유저의 장르 선호 정보가 없다면
    # else:
    #     # 영화 선택 페이지로 연결
    #     return []