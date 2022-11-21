from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response

from accounts.models import User
from rest_framework.decorators import api_view
from .serializers import UserDetailSerializers

# Create your views here.

@api_view(['GET'])
def user_detail(request):
    user = User.objects.get(pk=request.user)
    serializer = UserDetailSerializers(user)
    return Response(serializer.data)