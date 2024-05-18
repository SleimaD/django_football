import os
import django
django.setup()
from app.seed import seed_countries, seed_roles_players, seed_teams

if __name__ == "__main__":
    seed_teams()
    seed_roles_players()
    seed_countries()
    


