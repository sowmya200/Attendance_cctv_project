from rest_framework import serializers
from .models import Signin,NewEmployee

class SigninSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signin
        fields = ['id', 'email', 'password']
        
class NewEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewEmployee
        fields = '__all__'

