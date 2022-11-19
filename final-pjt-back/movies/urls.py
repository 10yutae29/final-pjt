from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('',views.movie_list),
    path('<int:movie_pk>/',views.movie_detail),
    path('<int:movie_pk>/likes/',views.movie_likes),
    # path('<int:movie_pk>/comments/',views.),
    path('prefer/',views.prefer_genre),
    path('prefer-list/',views.prefer_genre_list),
    path('save/',views.get_movie),
    path('save-genre/',views.get_genres),
]