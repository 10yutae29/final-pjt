from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from accounts.models import User
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers, PreferGenreSerializer
from .models import User
import random

from movies.models import PreferGenre, Genre
# # Create your views here.


@api_view(['GET'])
def user_detail(request, user_pk):
    user = User.objects.get(pk=user_pk)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)


@api_view(['GET'])
def recommend(request, user_pk):
    genres = Genre.objects.all()
    prefer_genre_datas = PreferGenre.objects.all()
    prefer_genres = PreferGenre.objects.get(id=user_pk)
    serializer = PreferGenreSerializer(prefer_genres)

    user_has_prefers = []
    for prefer_genre_data in prefer_genre_datas:
        user_has_prefers.append(prefer_genre_data.id.pk)
    # 유저의 장르 선호 정보가 있다면

    if user_pk in user_has_prefers:
        # 가중치 값에 따른 장르명 저장
        genre_prefer_count = {}
        for genre in genres:
            if prefer_genres[f"{genre.name}"] not in genre_prefer_count: 
                genre_prefer_count[prefer_genres[f"{genre.name}"]] = []
            cnt = genre_prefer_count[prefer_genres[f"{genre.name}"]]
            cnt.append(genre.name)
        cnt_val_list = sorted(genre_prefer_count.keys(), reverse=True)
        result_cnt = 0
        result_datas = []
        for cnt_val in cnt_val_list:
            if cnt_val: 
                result_datas.append(genre_prefer_count[cnt_val])
                result_cnt += len(genre_prefer_count[cnt_val])
            if result_cnt >= 3 :
                break 
        print(result_datas)

        all_genre_cnt = 0
        result = []
        for result_data in result_datas:
            all_genre_cnt += len(result_data)

        if all_genre_cnt < 4:
            for result_data in result_datas:
                for result_d in result_data:
                    result.append(result_d)
        else:
            if len(result_datas) == 3:
                result = result_datas[0] +result_datas[1]
                third_genre = random.sample(result_datas[2], k=1)
                result += third_genre
            elif len(result_datas) == 2:
                result = result_datas[0]
                need_random_cnt = 3 - len(result_datas[0])
                second_genre = random.sample(result_datas[1], k = need_random_cnt)
                result += second_genre
            elif len(result_datas) == 1:
                result = random.sample(result_datas[0], k=3)
        print(result)
        return result

    # 유저의 장르 선호 정보가 없다면 빈 리스트 반환
    else:
        return []