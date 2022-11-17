from rest_framework import serializers
from .models import Comment

class CommentListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        # 댓글 작성과 수정에만 사용할 시리얼라이저이므로 
        # 유저 인증을 통해 유저 정보 받고 무비 정보 받으면 컨텐츠만 입력할 수 있도록 할 것.
        # fields = ('content',)
        fields = '__all__'
