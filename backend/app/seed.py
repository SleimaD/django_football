from django_seed import Seed
from .models import Continent, Pays, Role, Equipe, Joueur
import requests




#! Fonction pour récupérer et ajouter les pays via l'API
def seed_countries():
    response = requests.get("https://restcountries.com/v3.1/all")
    if response.status_code == 200:
        countries_data = response.json()
        for country in countries_data:
            continent_name = country.get('region')
            continent = Continent.objects.filter(name=continent_name).first()
            if continent:
                Pays.objects.get_or_create(
                    name=country['name']['common'],
                    continent=continent
                )



#! Données pour les équipes
team_entries = [
    {"nom_club": "Real Madrid", "ville": "Madrid", "pays": "Espagne", "max_joueurs": 15, "image": "images/realmadrid.png"},
    {"nom_club": "FC Barcelone", "ville": "Barcelone", "pays": "Espagne", "max_joueurs": 15, "image": "images/barca.png"},
    {"nom_club": "PSG", "ville": "Paris", "pays": "France", "max_joueurs": 15, "image": "images/psg.png"},
    {"nom_club": "Bayern Munich", "ville": "Munich", "pays": "Allemagne", "max_joueurs": 15, "image": "images/bayern.png"},
    {"nom_club": "Chelsea", "ville": "Londres", "pays": "Royaume-Uni", "max_joueurs": 15, "image": "images/chelsea.png"},
]


def seed_teams():
    for entry in team_entries:
        country = Pays.objects.filter(name=entry["pays"]).first()
        if country:
            Equipe.objects.get_or_create(
                nom_club=entry["nom_club"],
                ville=entry["ville"],
                pays=country,
                max_joueurs=entry["max_joueurs"]
            )


#! Données pour les rôles et joueurs
role_entries = [
    {"nom_role": "Attaquant", "max_joueurs": 5},
    {"nom_role": "Milieux de terrain", "max_joueurs": 5},
    {"nom_role": "Défenseur", "max_joueurs": 5},
    {"nom_role": "Gardien", "max_joueurs": 2},
]



player_entries = [
    {"nom": "Bellingham", "prenom": "Jude", "age": 20, "telephone": "1234567890", "email": "jude.b@gmail.com", "genre": "Male", "pays_origine": "Royaume-Uni", "image": "images/jude.png", "role": "Milieu de terrain", "equipe": "Real Madrid"},

    {"nom": "ter Stegen", "prenom": "Marc-André", "age": 32, "telephone": "1234567890", "email": "marc.ts@gmail.com", "genre": "Male", "pays_origine": "Allemand", "image": "images/terstegen.png", "role": "Gardien", "equipe": "FC Barcelone"},

    {"nom": "Donnarumma", "prenom": "Gianluigi", "age": 25, "telephone": "1234567890", "email": "g.d@gmail.com", "genre": "Male", "pays_origine": "Italie", "image": "images/gian.png", "role": "Gardien", "equipe": "PSG"},

    {"nom": "Neuer", "prenom": "Manuel", "age": 38, "telephone": "1234567890", "email": "neuer@gmail.com", "genre": "Male", "pays_origine": "Allemagne", "image": "images/neuer.png", "role": "Gardien", "equipe": "Bayern Munich"},

    {"nom": "Mendy", "prenom": "Édouard", "age": 32, "telephone": "1234567890", "email": "e.mendy@gmail.com", "genre": "Male", "pays_origine": "Senegal", "image": "images/mendy.png", "role": "Gardien", "equipe": "PSG"},

    {"nom": "Carvajal", "prenom": "Dani", "age": 32, "telephone": "1234567890", "email": "carvajal.d@gmail.com", "genre": "Male", "pays_origine": "Espagne", "image": "images/carvajal.png", "role": "Défenseur", "equipe": "Real Madrid"},

    {"nom": "Ronald", "prenom": "Araujo", "age": 25, "telephone": "1234567890", "email": "roro@gmail.com", "genre": "Male", "pays_origine": "Uruguay", "image": "images/araujo.png", "role": "Défenseur", "equipe": "FC Barcelone"},

    {"nom": "Achraf", "prenom": "Hakimi", "age": 25, "telephone": "1234567890", "email": "a.hakimi@gmail.com", "genre": "Male", "pays_origine": "Maroc", "image": "images/hakimi.png", "role": "Défenseur", "equipe": "PSG"},

    {"nom": "Dayot", "prenom": "Upamecano", "age": 25, "telephone": "1234567890", "email": "dayot@gmail.com", "genre": "Male", "pays_origine": "Guinée Bissau", "image": "images/dayot.png", "role": "Défenseur", "equipe": "Bayern Munich"},

    {"nom": "Antonio", "prenom": "Rüdiger", "age": 31, "telephone": "1234567890", "email": "rudi@gmail.com", "genre": "Male", "pays_origine": "Allemagne", "image": "images/rudiger.png", "role": "Défenseur", "equipe": "Real Madrid"},

    {"nom": "Casemiro", "prenom": "Casemiro", "age": 32, "telephone": "1234567890", "email": "casemiro@gmail.com", "genre": "Male", "pays_origine": "Bresil", "image": "images/casemiro.png", "role": "Milieu de terrain", "equipe": "Real Madrid"},

    {"nom": "Sergio", "prenom": "Busquets", "age": 35, "telephone": "1234567890", "email": "bubu@gmail.com", "genre": "Male", "pays_origine": "Espagne", "image": "images/busquets.png", "role": "Milieu de terrain", "equipe": "FC Barcelone"},
    
    {"nom": "Marco", "prenom": "Verratti", "age": 31, "telephone": "1234567890", "email": "verrati@gmail.com", "genre": "Male", "pays_origine": "Italie", "image": "images/verrati.png", "role": "Milieu de terrain", "equipe": "PSG"},

    {"nom": "Joshua", "prenom": "Kimmich", "age": 29, "telephone": "1234567890", "email": "joshua.k@gmail.com", "genre": "Male", "pays_origine": "Allemagne", "image": "images/kimmich.png", "role": "Milieu de terrain", "equipe": "Bayern Munich"},

    {"nom": "Jorginho", "prenom": "Jorginho", "age": 33, "telephone": "1234567890", "email": "jorgi@gmail.com", "genre": "Male", "pays_origine": "Bresil", "image": "images/jorginho.png", "role": "Milieu de terrain", "equipe": "Chelsea"},

    {"nom": "Vinicius", "prenom": "Júnior", "age": 23, "telephone": "1234567890", "email": "vinicius@gmail.com", "genre": "Male", "pays_origine": "Bresil", "image": "images/vinicius.png", "role": "Attaquant", "equipe": "Real Madrid"},

    {"nom": "Pierre-Emerick", "prenom": "Aubameyang", "age": 34, "telephone": "1234567890", "email": "auba@gmail.com", "genre": "Male", "pays_origine": "Gabon", "image": "images/aubameyang.png", "role": "Attaquant", "equipe": "FC Barcelone"},

    {"nom": "Neymar", "prenom":"jr", "age": 32, "telephone": "1234567890", "email": "nene@gmail.com", "genre": "Male", "pays_origine": "Bresil", "image": "images/neymar.png", "role": "Attaquant", "equipe": "PSG"},

    {"nom": "Lewandowski", "prenom": "Robert", "age": 33, "telephone": "1234567890", "email": "lele@gmail.com", "genre": "Male", "pays_origine": "Pologne", "image": "images/lewandowski.png", "role": "Attaquant", "equipe": "FC Barcelone"},

    {"nom": "Mason", "prenom": "Mount", "age": 25, "telephone": "1234567890", "email": "mount.m@gmail.com", "genre": "Male", "pays_origine": "Royaume-Uni", "image": "images/mason.png", "role": "Attaquant", "equipe": "Chelsea"},
]





def seed_roles_players():
    for entry in role_entries:
        Role.objects.get_or_create(
            nom_role=entry["nom_role"],
            max_joueurs=entry["max_joueurs"]
        )
    for entry in player_entries:
        team = Equipe.objects.filter(nom_club=entry["equipe"]).first()
        role = Role.objects.filter(nom_role=entry["role"]).first()
        pays_origine = Pays.objects.filter(name=entry["pays_origine"]).first()
        Joueur.objects.get_or_create(
            nom=entry["nom"],
            prenom=entry["prenom"],
            age=entry["age"],
            telephone=entry["telephone"],
            email=entry["email"],
            genre=entry["genre"],
            pays_origine=pays_origine,
            role=role,
            equipe=team
        )
