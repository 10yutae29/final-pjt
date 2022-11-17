from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.shortcuts import render
from .models import Comment
from .serializers import CommentListSerializer
# Create your views here.

# @api_view(['GET'])
def comment_list(request):
    pass
    # serializers = CommentListSerializer(comments, many=True)
    # return Response(serializers)