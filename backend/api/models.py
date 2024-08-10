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
    

class UserProfile(models.Model):
    USER_TYPE_CHOICES = [
        ('consumer', 'Consumer'),
        ('producer', 'Producer'),
        ('intermediary', 'Intermediary'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='consumer')
    email = models.EmailField(null=True, blank=True)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)
    metamask_address = models.CharField(max_length=42, null=True, blank=True)
    chain_id = models.IntegerField(null=True, blank=True)
    signing_info = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.user.username
    
