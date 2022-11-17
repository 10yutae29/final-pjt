from django.urls import path
from . import views

app_name = 'community'
urlpatterns = [
    path('comment/',views.comment_list),
    path('comment/<int:comment_pk>/',views.comment_detail),
    path('like/',views.like),
]
