from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import MoviesSet

router = DefaultRouter()
router.register("get", MoviesSet)

app_name = 'movies'

urlpatterns = [
    path("", include(router.urls)),
    path('genres/',views.genre_list),
    path('<int:movie_pk>/',views.movie_detail),
    path('<int:movie_pk>/likes/',views.movie_likes),
    # path('<int:movie_pk>/comments/',views.),
    # path('prefer/<int:user_pk>/',views.prefer_genre),
    path('save/',views.get_movie),
    path('save-genre/',views.get_genres),
]