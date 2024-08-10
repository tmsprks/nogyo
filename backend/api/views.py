from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, WalletSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Wallet
from rest_framework.exceptions import ValidationError


class WalletListCreate(generics.ListCreateAPIView):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(author=user)
    
    def perform_create(self, serializer):
        user = self.request.user
        if Wallet.objects.filter(author=user).exists():
            raise ValidationError("Each user can only have one wallet.")
        if serializer.is_valid():
            serializer.save(author=user)
        else:
            print(serializer.errors)


class WalletDelete(generics.DestroyAPIView):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(author=user)

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]