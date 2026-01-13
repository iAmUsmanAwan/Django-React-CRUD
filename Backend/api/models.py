from django.db import models


class Country(models.Model):
    name = models.CharField(unique=True, max_length=100)
    # code = models.CharField(max_length=10, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class League(models.Model):
    name = models.CharField(unique=True, max_length=100)
    # code = models.CharField(max_length=10, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    


class Characteristics(models.Model):
    name = models.CharField(unique=True, max_length=100)
    # code = models.CharField(max_length=10, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    


class FootballClub(models.Model):
    name = models.CharField(unique=True, max_length=100)
    description = models.CharField(blank=True, null=True, max_length=1000)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    characteristics = models.ManyToManyField(Characteristics, blank=True)
    attendants = models.IntegerField(blank=True, null=True)
    city = models.CharField(blank=True, null=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    