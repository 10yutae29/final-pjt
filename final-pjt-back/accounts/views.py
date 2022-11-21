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
    # 추천 장르 목록 반환
    user = get_user_model().objects.get(pk=user_pk)
    user_like_movies = user.liked_movies.all()
    for user_like_movie in user_like_movies:
        user_prefer_genres = user_like_movie.genres.all()
        for user_prefer_genre in user_prefer_genres:
            print('user_prefer_genre')
            print(user_prefer_genre)
            new_prefer = Prefer(user=user, genre=user_prefer_genre)
            new_prefer.save()
            prefers = Prefer.objects.all()        
            if new_prefer in prefers:
                new_prefer.count += 1
            else:
                new_prefer.count = 1
            new_prefer.save()
    
    # if request.method == 'GET':
    #     # 추천 페이지 url 요청이 들어오면, movie_like_users에 저장된 내용 업데이트


    #     #
    #     user = get_user_model().objects.get(pk=user_pk)
    #     serializer = UserDetailSerializers(user)
    #     user_like_movies = serializer.data["liked_movies"]
    #     genres = Genre.objects.all()
    #     print(user_like_movies)

    #     for user_like_movie in user_like_movies:
    #         movie = Movie.objects.get(id=user_like_movie)
    #         # for genre in genres:
    #         #     print(genre.id)
    #         print(movie)
    #         print(movie.like_users)

    #     # 가중치 값에 따른 장르명 저장
    #     genre_prefer_count = {}
    #     # for genre in genres:
    #     #     if prefer_genres[f"{genre.name}"] not in genre_prefer_count: 
    #     #         genre_prefer_count[prefer_genres[f"{genre.name}"]] = []
    #     #     cnt = genre_prefer_count[prefer_genres[f"{genre.name}"]]
    #     #     cnt.append(genre.name)
    #     cnt_val_list = sorted(genre_prefer_count.keys(), reverse=True)

    #     # 가중치 값에 따라 장르 추출
    #     result_cnt = 0
    #     result_datas = []
    #     for cnt_val in cnt_val_list:
    #         if cnt_val: 
    #             result_datas.append(genre_prefer_count[cnt_val])
    #             result_cnt += len(genre_prefer_count[cnt_val])
    #         if result_cnt >= 3 :
    #             break 

    #     # 추천 장르 세가지 보내기
    #     all_genre_cnt = 0
    #     result = []
    #     # 장르 선호 정보가 있다면
    #     if result_datas:
    #         for result_data in result_datas:
    #             all_genre_cnt += len(result_data)
    #          # 선호장르 개수가 3보다 작으면 모든 선호장르 리스트 반환
    #         if all_genre_cnt < 4:
    #             for result_data in result_datas:
    #                 for result_d in result_data:
    #                     result.append(result_d)
    #         # 선호장르 개수가 3보다 많을 때
    #         else:
    #             # 가중치 값이 3개라면
    #             if len(result_datas) == 3:
    #                 # 1위, 2위를 결과에 먼저 포함하고
    #                 result = result_datas[0] +result_datas[1]
    #                 # 세번째 장르 리스트 중에서 하나를 랜덤으로 선택
    #                 third_genre = random.sample(result_datas[2], k=1)
    #                 # 결과에 더해서 반환
    #                 result += third_genre
    #             # 가중치 값이 2개라면
    #             elif len(result_datas) == 2:
    #                 # 1위를 먼저 결과에 포함 하고
    #                 result = result_datas[0]
    #                 # 2위에서 선택해야 하는 장르 수를 계산해서
    #                 need_random_cnt = 3 - len(result_datas[0])
    #                 # 2위 장르 리스트 중에서 계산한 값 만큼 랜덤으로 선택
    #                 second_genre = random.sample(result_datas[1], k = need_random_cnt)
    #                 # 결과에 더해서 반환
    #                 result += second_genre
    #             # 가중치 값이 1개라면
    #             elif len(result_datas) == 1:
    #                 # 3개 랜덤으로 선택해서 반환
    #                 result = random.sample(result_datas[0], k=3)
    #     # 장르 선호 정보가 없다면 빈리스트 반환(POST method로 연결됨)
    #     else: 
    #         result = []
    #     context = {
    #         'result' : result
    #     }
    #     return Response(context)
    
    # # 선호 영화 목록 받기
    # elif request.method == 'POST':
    #     picked_movie_ids = request.data["picked_movies"]
    #     for picked_id in picked_movie_ids:
    #         select_movie_genres = []
    #         select_movie = Movie.objects.get(pk=picked_id)
    #         pick_serializer = MovieSerializer(select_movie)
    #         pick_genres = pick_serializer.data["genres"]
    #         for pick_genre in pick_genres:
    #             pick_genre_obj= Genre.objects.get(pk=pick_genre)
    #             select_movie_genres.append(pick_genre_obj.name)
    #         # 여기서 select_movie_genres 값 한번씩 더해주면 됨.
    #         for select_movie_genre in select_movie_genres:
    #             prefer_genres[select_movie_genre] += 1
    #     context = {
    #         'result' : result
    #     }
    #     return Response(context)