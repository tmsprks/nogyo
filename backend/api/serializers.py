from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Wallet, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['email', 'first_name', 'last_name', 'metamask_address', 'chain_id', 'signing_info', 'user_type', 'street', 'city', 'state', 'country', 'zip_code']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "username", "password", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        user = super().update(instance, validated_data)

        profile = instance.profile
        profile.email = profile_data.get('email', profile.email)
        profile.first_name = profile_data.get('first_name', profile.first_name)
        profile.last_name = profile_data.get('last_name', profile.last_name)
        profile.metamask_address = profile_data.get('metamask_address', profile.metamask_address)
        profile.chain_id = profile_data.get('chain_id', profile.chain_id)
        profile.signing_info = profile_data.get('signing_info', profile.signing_info)
        profile.user_type = profile_data.get('user_type', profile.user_type)
        profile.street = profile_data.get('street', profile.street)
        profile.city = profile_data.get('city', profile.city)
        profile.state = profile_data.get('state', profile.state)
        profile.country = profile_data.get('country', profile.country)
        profile.zip_code = profile_data.get('zip_code', profile.zip_code)
        profile.save()

        return user
    
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["id", "wallet_address", "wallet_chain","created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}