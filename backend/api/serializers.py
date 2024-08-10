from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Wallet, Address

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["id", "wallet_address", "wallet_chain","created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'country']

class UserSerializer(serializers.ModelSerializer):
    wallet = WalletSerializer(required=False)
    address = AddressSerializer(required=False)

    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name", "wallet", "address"]
        extra_kwargs = {"password": {"write_only": True}}

    def update(self, instance, validated_data):
        wallet_data = validated_data.pop('wallet', None)
        address_data = validated_data.pop('address', None)
        password = validated_data.pop('password', None)

        instance.email = validated_data.get('email', instance.email)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        if wallet_data:
            Wallet.objects.update_or_create(user=instance, defaults=wallet_data)
        if address_data:
            Address.objects.update_or_create(user=instance, defaults=address_data)

        return instance