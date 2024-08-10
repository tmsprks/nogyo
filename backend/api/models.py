from django.contrib.auth.models import User
from django.db import models

class Wallet(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    wallet_chain = models.CharField(max_length=100)
    wallet_address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Address(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)


