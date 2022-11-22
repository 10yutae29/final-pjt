from rest_framework import serializers
from .models import Movie
from community.models import Comment
from django.contrib.auth import get_user_model


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'





class MovieSerializer(serializers.ModelSerializer):

    class CommentSerializer(serializers.ModelSerializer):

        class UserSerializer(serializers.ModelSerializer):

            class Meta:
                model = get_user_model()
                fields = ('id', 'username' )
        
        user = UserSerializer(read_only=True)
        
        class Meta:
            model = Comment
            fields = '__all__'

    comment_set = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

