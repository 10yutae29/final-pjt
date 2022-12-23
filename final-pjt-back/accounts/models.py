from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    profile_image = models.ImageField(max_length=200, blank=True)
    nickname = models.CharField(max_length=10)
    self_introduce = models.CharField(max_length=30)

    pass