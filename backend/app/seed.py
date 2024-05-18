from django_seed import Seed
from .models import Country, Continent
import requests

#! Fetch data from an open source country API
countries_url = 'https://restcountries.com/v3.1/all'
response = requests.get(countries_url)
if response.status_code == 200:
    countries_data = response.json()
else:
    print(f"Request failed with status code {response.status_code}")
    exit(1)


seeder = Seed.seeder() 
def run():
    #! Add countries in the seeder
    for country in countries_data:
        
        #! Declare the variable only if its corresponding value is existing
        country_name = country['name']['common'] if 'name' in country and 'common' in country['name'] else None
        continent_name = country['region'] if 'region' in country else None
        
        if country_name and continent_name:
            #! Find the matching continent
            try:
                #! continent = continent in continent table which id is = to country
                continent = Continent.objects.get(name=continent_name)
                #! Add the country to the seeder with its continent_id
                seeder.add_entity(Country, 1, {
                    'name' : country_name, 
                    'continent_id' : continent.id
                })
            except Continent.DoesNotExist:
                print(f"No continent found for {continent_name}")

    pks = seeder.execute()
    print(pks)