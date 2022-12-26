from rest_framework import serializers
from community.models import Comment
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction
from rest_framework.response import Response
from allauth.account.adapter import get_adapter

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

class CustomRegisterSerializer(RegisterSerializer):
    profile_image = serializers.ImageField(max_length=200, use_url=True, default='/default_image.jpg')
    nickname = serializers.CharField(max_length=10)
    self_introduce = serializers.CharField(max_length=30, required=False)

    class Meta:
        model = get_user_model()
        fields = '__all__'

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'profile_image':self.validated_data.get('profile_image', ''),
            'nickname':self.validated_data.get('nickname', ''),
            'self_introduce':self.validated_data.get('self_introduce', ''),
        }
    
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.profile_image = self.cleaned_data.get('profile_image')
        user.nickname = self.cleaned_data.get('nickname')
        user.self_introduce = self.cleaned_data.get('self_introduce')
        user.save()
        adapter.save_user(request, user, self)
        return user

    # @transaction.atomic
    # def save(self, request):
    #     if request.method == 'POST':
    #         print(request.data)
    #         print(request.FILES)
    #         serializer = CustomRegisterSerializer(data=request.data, request.FILES)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data)
        # user = super().save(request)
        # print('여기는 도착')
        # print(request.FILES)
        # # user.profile_image = request.FILES
        # user.profile_image = self.data.get('profile_image')
        # user.nickname = self.data.get('nickname')
        # user.self_introduce = self.data.get('self_introduce')
        # user.save()
        # return user

class UserCangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('email', 'nickname', 'self_introduce', 'profile_image')
