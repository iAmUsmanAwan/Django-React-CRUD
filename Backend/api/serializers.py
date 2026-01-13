from rest_framework import serializers
from .models import *

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('id', 'name')


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('id', 'name')

class CharacteristicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristics
        fields = ('id', 'name')


class FootballClubSerializer(serializers.ModelSerializer):
    characteristics = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Characteristics.objects.all()
    )
    
    class Meta:
        model = FootballClub
        fields = '__all__'

