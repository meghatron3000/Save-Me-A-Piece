from rest_framework import serializers
from claims.models import Claim

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        # fields = ('id', 'name', 'address', 'phonenumber')
        fields = '__all__'