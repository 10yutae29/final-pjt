from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('comment/',views.comment_list),
]