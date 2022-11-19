from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .forms import CommentForm
from .serializers import CommentListSerializer

from django.shortcuts import render
from .models import Comment
from .serializers import CommentListSerializer, CommentSerializer
# Create your views here.

@api_view(['GET', 'POST'])
def comment_list(request):
    # 전체 댓글 목록 조회_ 권한 없어도 가능 / GET
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)

    # 댓글 작성_ 권한 있어야 가능 / POST / 
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# 게시글 수정, 삭제
@api_view(['DELETE', 'GET', 'PUT'])
def comment_detail(request, comment_pk):
    comment = Comment.objects.get(id=comment_pk)

    # 확인차 넣은 조회... 쓸일 없을 듯?
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    # 댓글 삭제_ 권한 있어야 가능 / 본인만 가능 / DELETE
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # 댓글 수정_ 권한 있어야 가능 / 본인만 가능 / PUT 
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)