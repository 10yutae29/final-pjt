from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers
from movies.serializers import MovieSerializer
from django.contrib.auth import get_user_model
import random
from movies.models import Genre, Movie, Prefer
# # Create your views here.


@api_view(['GET'])
def user_detail(request, user_pk):
    user = get_user_model().objects.get(pk=user_pk)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)


@api_view(['GET','POST'])
def recommend(request, user_pk):
    if request.method == 'POST':
        print(request.data)
        pass
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
            # 가중치 값에 따라 장르 추출
            result_cnt = 0
            result_datas = []
            for cnt_val in cnt_val_list:
                if cnt_val: 
                    result_datas.append(genre_prefer_count[cnt_val])
                    result_cnt += len(genre_prefer_count[cnt_val])
                if result_cnt >= 3 :
                    break 
            # 추천 장르 세가지 보내기
            all_genre_cnt = 0
            result = []
            # 장르 선호 정보가 있다면
            if result_datas:
                for result_data in result_datas:
                    all_genre_cnt += len(result_data)
                 # 선호장르 개수가 3보다 작으면 모든 선호장르 리스트 반환
                if all_genre_cnt < 4:
                    for result_data in result_datas:
                        for result_d in result_data:
                            result.append(result_d)
                # 선호장르 개수가 3보다 많을 때
                else:
                    # 가중치 값이 3개라면
                    if len(result_datas) == 3:
                        # 1위, 2위를 결과에 먼저 포함하고
                        result = result_datas[0] +result_datas[1]
                        # 세번째 장르 리스트 중에서 하나를 랜덤으로 선택
                        third_genre = random.sample(result_datas[2], k=1)
                        # 결과에 더해서 반환
                        result += third_genre
                    # 가중치 값이 2개라면
                    elif len(result_datas) == 2:
                        # 1위를 먼저 결과에 포함 하고
                        result = result_datas[0]
                        # 2위에서 선택해야 하는 장르 수를 계산해서
                        need_random_cnt = 3 - len(result_datas[0])
                        # 2위 장르 리스트 중에서 계산한 값 만큼 랜덤으로 선택
                        second_genre = random.sample(result_datas[1], k = need_random_cnt)
                        # 결과에 더해서 반환
                        result += second_genre
                    # 가중치 값이 1개라면
                    elif len(result_datas) == 1:
                        # 3개 랜덤으로 선택해서 반환
                        result = random.sample(result_datas[0], k=3)
            # 장르 선호 정보가 없다면 빈리스트 반환(POST method로 연결됨)

        else:
            result = []

        context = {
            'prefer_genres' : result
        }
        return Response(context)