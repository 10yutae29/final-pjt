from rest_framework import serializers
from .models import User
from community.models import Comment



class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class UserDetailSerializers(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    liked_movies = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'