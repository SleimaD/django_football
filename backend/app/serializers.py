from rest_framework import serializers
from .models import Continent, Pays, Equipe, Joueur, Role



class ContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Continent
        fields = '__all__'



class PaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pays
        fields = '__all__'



class JoueurSerializer(serializers.ModelSerializer):
    # equipe = EquipeSerializer(read_only=True)
    class Meta:
        model = Joueur
        fields = '__all__'
        depth = 1

class EquipeSerializer(serializers.ModelSerializer):
    joueur_count = serializers.SerializerMethodField()
    joueurs = JoueurSerializer(many=True, read_only=True) 
    
    class Meta:
        model = Equipe
        fields = '__all__'

    extra_kwargs = {
            'pays': {'required': False},
            'image': {'required': False, 'allow_null': True}
        }

    def get_joueur_count(self, obj):
        return obj.joueurs.count() 
    




        

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
