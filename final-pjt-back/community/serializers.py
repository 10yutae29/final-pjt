from rest_framework import serializers
from .models import Comment

class CommentListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


# 댓글 작성과 수정에만 사용하는 시리얼라이저로, content만 들어가 져도 됨,,,, 그 유저랑 무비는 자동으로 주어질텐데....ㅇㅂㅇ?
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
