from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Wallet, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['email', 'first_name', 'last_name', 'metamask_address', 'chain_id', 'signing_info', 'user_type']

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
        metamask_address = profile_data.get('metamask_address')
        chain_id = profile_data.get('chain_id')
        signing_info = profile_data.get('signing_info')

        instance.email = validated_data.get('email', instance.email)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()

        profile = instance.profile
        if profile_data:
            profile.metamask_address = metamask_address
            profile.chain_id = chain_id
            profile.signing_info = signing_info
            profile.save()

        return instance
    
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ["id", "wallet_address", "wallet_chain","created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}