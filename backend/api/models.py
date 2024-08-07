from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Wallet(models.Model):
    wallet_address = models.CharField(max_length=42)
    wallet_chain = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Wallet")

    def __str__(self):
        return self.wallet_address


