# Projet_PW_TPM

## Site de Voyage

## Membres d'équipes :
* Zakia Taoufik
* Kevin Marzin
* Mathieu Perez

## Rôles
* **Utilisateur** : Personne utilisant l'application pour effectuer une recherche de voyage(non connecté).
* **Prestataire** : Utilisateur connecté qui propose des offres de voyage(location/trajet).
* **Client** : Utilisateur connecté qui valide l'inscription d'une agence(et permet donc d'ajout des offres) et peut les supprimer.

## Cahier des Charges
* L'application devra permetre à des prestataires de se créer un compte(email, password). Une fois connectées, ceux-ci pourront proposer des offres de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) et/ou de transport(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages) en fonction de cases à cocher(trajet, location).
* Un utilisateur devra voir une carte(API Maps) sur la page d'accueil. Il peut effecter une sélection sur la carte. Il peut également saisir une période de debut/fin de recherche. L'application affichera les offres de locations et de transports correspondant aux critères de la recherche. (BONUS: afficher les trajets blablacar ou SNCF si la recherche est en france)(BONUS: gerer L/T/L+T)

## Backlog 
### Backlog Initial

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 1 | En tant qu'***Prestataire***, je souhaite pouvoir m'inscrire sur l'application(email, password) | |  | X 
| 2 | En tant qu'***Prestataire***, je souhaite pouvoir me connecter/déconnecter(email, pw) | |  | X 
| 3 | En tant qu'***Prestataire***, je souhaite pouvoir créer une offre de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) | |  | X 
| 4 | En tant qu'***Prestataire***, je souhaite pouvoir créer une offre de trajet(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages) | |  | X 
| 5 | En tant qu'***Prestataire***, je souhaite pouvoir créer une offre de Voyage(pays, adresse de location, tarif, date et heure aller, date et heure du retour, durée trajet aller, durée trajet retour, prise de bagages, options du séjour) | |  | X 
| 6 | En tant qu'***Prestataire***, je souhaite pouvoir lister mes offres| |  | X 
| 7 | En tant qu'***Prestataire***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| |  | X 
| 8 | En tant qu'***utilisateur***, je souhaite pouvoir rechercher des offres: Trajet/Location/Trajet+Location (à partir d'une zone géographique, d'une date deb/fin) | |  | X 

## Technologies
* Front: Angular
* Serveur: Nodejs
* BD: MongoDB
* Test: Mocha, Protractor(test E2E angular)

