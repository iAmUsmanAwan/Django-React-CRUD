from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'countries', CountryViewSet, basename='countries')

router.register(r'leagues', LeagueViewSet, basename='leagues')

router.register(r'characteristics', CharacteristicsViewSet, basename='characteristics')

router.register(r'footballclubs', FootballClubViewSet, basename='footballclubs')


urlpatterns = router.urls
