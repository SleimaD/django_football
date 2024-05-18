from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Continent, Pays, Equipe, Joueur, Role
from .serializers import ContinentSerializer, PaysSerializer, EquipeSerializer, JoueurSerializer, RoleSerializer


#! afficher les models
@api_view(['GET'])
def continent_list(request):
    continents = Continent.objects.all()
    serializer = ContinentSerializer(continents, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pays_list(request):
    pays = Pays.objects.all()
    serializer = PaysSerializer(pays, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def equipe_list(request):
    equipes = Equipe.objects.all()
    serializer = EquipeSerializer(equipes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def joueur_list(request):
    joueurs = Joueur.objects.all()
    serializer = JoueurSerializer(joueurs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def role_list(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


