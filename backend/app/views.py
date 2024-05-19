from django.shortcuts import render
from django.db.models import Count, Q, F
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Continent, Pays, Equipe, Joueur, Role
from .serializers import ContinentSerializer, PaysSerializer, EquipeSerializer, JoueurSerializer, RoleSerializer



@api_view(['GET'])
def home_data(request):
    data = {}

    #! Équipes remplies 
    filled_teams = Equipe.objects.annotate(player_count=Count('joueurs')).filter(player_count=F('max_joueurs'))
    data['filled_teams'] = EquipeSerializer(filled_teams, many=True).data

    #! Équipes non remplies
    not_filled_teams = Equipe.objects.annotate(player_count=Count('joueurs')).filter(player_count__lt=F('max_joueurs'))[:2]
    data['not_filled_teams'] = EquipeSerializer(not_filled_teams, many=True).data

    #! Joueurs sans équipe
    free_players = Joueur.objects.filter(equipe__isnull=True)[:4]
    data['free_players'] = JoueurSerializer(free_players, many=True).data

    #! Joueurs avec équipe
    players_with_teams = Joueur.objects.exclude(equipe__isnull=True)[:4]
    data['players_with_teams'] = JoueurSerializer(players_with_teams, many=True).data

    #! Équipes d'Europe et hors Europe
    european_teams = Equipe.objects.filter(pays__continent__name="Europe")
    non_european_teams = Equipe.objects.exclude(pays__continent__name="Europe")
    data['european_teams'] = EquipeSerializer(european_teams, many=True).data
    data['non_european_teams'] = EquipeSerializer(non_european_teams, many=True).data

    #! Joueuses aléatoires avec équipe 
    random_female_players = Joueur.objects.filter(
        genre='Female',  
        equipe__isnull=False
    ).order_by('?')[:5]
    data['random_female_players'] = JoueurSerializer(random_female_players, many=True).data

    #! Joueurs aléatoires avec équipe 
    random_players = Joueur.objects.exclude(equipe__isnull=True).order_by('?')[:5]
    data['random_players'] = JoueurSerializer(random_players, many=True).data

    return Response(data)



#! views to display
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



#! views to add/edit/delete
@api_view(['GET', 'POST'])
def equipe_list(request):
    if request.method == 'GET':
        equipes = Equipe.objects.all()
        serializer = EquipeSerializer(equipes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EquipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def equipe_detail(request, pk):
    try:
        equipe = Equipe.objects.get(pk=pk)
    except Equipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EquipeSerializer(equipe)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EquipeSerializer(equipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        equipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def joueur_list(request):
    if request.method == 'GET':
        joueurs = Joueur.objects.all()
        serializer = JoueurSerializer(joueurs, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JoueurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def joueur_detail(request, pk):
    try:
        joueur = Joueur.objects.get(pk=pk)
    except Joueur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JoueurSerializer(joueur)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = JoueurSerializer(joueur, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        # Supprimer l'image du joueur si présente
        if joueur.image:
            joueur.image.delete()
        joueur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

