from django.urls import path, include
from . import views


app_name = 'accounts'
urlpatterns = [
    path('<int:user_pk>/',views.user_detail),
    path('recommend/<int:user_pk>/',views.recommend, name='recommend'),
    path('<int:user_pk>/userchange/', views.userchange,),
]