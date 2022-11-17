from rest_framework.response import Response
from rest_framework.decorators import api_view
from .forms import CommentForm
from .serializers import CommentListSerializer

from django.shortcuts import render
from .models import Comment
from .serializers import CommentListSerializer
# Create your views here.

@api_view(['GET'])
def comment(request):
    # 전체 댓글 목록 조회_ 권한 없어도 가능 / GET
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentListSerializer(comments, many=True)
        return Response(serializer.data)

    # 댓글 작성_ 권한 있어야 가능 / POST
    # elif request.method == 'POST':
    #     comment = 

        # comment_form = CommentForm()
        # context = {
        #     'comments': comments,
        #     'comment_form': comment_form,
        # }
    # 댓글 삭제_ 권한 있어야 가능 / 본인만 가능 / DELETE
    # 댓글 수정_ 권한 있어야 가능 / 본인만 가능 / PUT



def like(request):
    pass