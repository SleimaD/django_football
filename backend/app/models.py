from django.db import models


class Continent(models.Model):
    name = models.CharField(max_length=100)


class Pays(models.Model):
    name = models.CharField(max_length=100)
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE)


class Equipe(models.Model):
    nom_club = models.CharField(max_length=100)
    ville = models.CharField(max_length=100)
    pays = models.ForeignKey(Pays, on_delete=models.SET_NULL, null=True)
    max_joueurs = models.IntegerField(default=13)
    image = models.ImageField(upload_to='images/', null=True, blank=True)



class Role(models.Model):
    nom_role = models.CharField(max_length=50)
    max_joueurs = models.IntegerField()



class Joueur(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    age = models.IntegerField()
    telephone = models.CharField(max_length=15)
    email = models.EmailField()
    genre = models.CharField(max_length=10)
    pays_origine = models.ForeignKey(Pays, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    equipe = models.ForeignKey(Equipe, on_delete=models.SET_NULL, null=True, related_name='joueurs')

