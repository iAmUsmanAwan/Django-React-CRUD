from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CountrySerializer

    def list(self, request):
        queryset = Country.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LeagueSerializer

    def list(self, request):
        queryset = League.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CharacteristicsViewSet(viewsets.ModelViewSet):
    queryset = Characteristics.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CharacteristicsSerializer

    def list(self, request):
        queryset = Characteristics.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class FootballClubViewSet(viewsets.ModelViewSet):
    queryset = FootballClub.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FootballClubSerializer

    # def list(self, request):
    #     queryset = FootballClub.objects.all()
    #     serializer = self.serializer_class(queryset, many=True)
    #     return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def list(self, request):
        queryset = FootballClub.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


