from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('<int:user_pk>/',views.user_detail),
    path('recommend/<int:user_pk>/',views.recommend),
]