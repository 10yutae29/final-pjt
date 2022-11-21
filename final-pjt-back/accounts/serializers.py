from rest_framework import serializers
from community.models import Comment
from django.contrib.auth import get_user_model


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class UserDetailSerializers(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    liked_movies = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = '__all__'