from django.contrib import admin
from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('equipes/', views.equipe_list, name='equipe-list'),
    path('equipes/<int:id>/', views.equipe_detail, name='equipe-detail'),
    path('joueurs/', views.joueur_list, name='joueur-list'),
    path('joueurs/<int:id>/', views.joueur_detail, name='joueur-detail'),
    path('continents/', views.continent_list, name='continent-list'),
    path('pays/', views.pays_list, name='pays-list'),
    path('roles/', views.role_list, name='role-list'),
    path('api/home/', views.home_data, name='home-data'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
