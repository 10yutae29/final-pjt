from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from accounts.models import User
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers
# from django.conf import settings
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from rest_framework.authtoken.models import Token

# # Create your views here.
# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)


@api_view(['GET'])

def user_detail(request, user_pk):
    user = User.objects.get(pk=user_pk)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)