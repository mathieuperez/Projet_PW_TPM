# Projet_PW_TPM

## Site de Voyage

## Membres d'équipes :
* Zakia Taoufik
* Kevin Marzin
* Mathieu Perez

## Cahier des Charges
* L'application devra permetre à des agences de se créer un compte(username, password, email). Une fois connectées, celles-ci pourront proposer des offres de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) avec potentiellement une offre de vol(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages) en plus.
* L'application devra permetre à des particuliers de se créer un compte(username, password, email). Une fois connectées, ceux-ci pourront proposer des offres de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) ou de transport(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages).
* Un utilisateur lambda non connecté devra voir une carte(API Maps) sur la page d'accueil. En effectuant une sélection sur la carte, l'application devra effectuer une recherche des offres de locations dans cette zone puis les afficher. 
* Un utilisateur lambda non connecté devra pouvoir accéder à une barre de recherche d'offres par pays ou par date de debut/fin de séjour depuis la page d'accueil. L'application devra afficher les offres de locations et de transports correspondant aux critères de la recherche.
* Pour chaque recherche(depuis la carte ou la barre de recherche), l'application devra également aller chercher les offres correspondant à ces critères sur un autre site de voyage(exemple: chercher api opendata de trivago/booking.com/housetrip/rbnb)

## Backlog 
### Rôles
* **Utilisateur** : Personne utilisant l'application pour effectuer une recherche de voyage.
* **Agence** : Utilisateur connecté qui propose des offres de voyage.
* **Administrateur** : Utilisateur connecté qui valide l'inscription d'une agence(et permet donc d'ajout des offres) et peut les supprimer.

### Backlog Initial

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 1 | En tant qu'***agence***, je souhaite pouvoir m'inscrire sur l'application(nom,etc.. ) | |  | X 
| 2 | En tant qu'***agence***, je souhaite pouvoir me connecter/déconnecter(username, pw) | |  | X 
| 3 | En tant qu'***agence***, je souhaite pouvoir créer une offre de voyage(nom, description, tarif par personne, date deb/fin, pays) | |  | X 
| 4 | En tant qu'***agence***, je souhaite pouvoir modifier/supprimer une offre de voyage| |  | X 
| 5 | En tant qu'***utilisateur***, je souhaite pouvoir rechercher des offres (à partir d'une zone géographique, d'une date deb/fin) | |  | X 
| 6 | En tant qu'***utilisateur***, je souhaite pouvoir chercher des transports de particuliers(co-voit/ PEUT ETRE LES VOLS PLUS TARD) si j'ai choisi une location de particulier(hotel, maison d'hôte). | |  | X 


## Technologies



