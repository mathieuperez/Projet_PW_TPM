# Projet_PW_TPM

## Site de Voyage

## Membres d'équipes :
* Zakia Taoufik
* Kevin Marzin
* Mathieu Perez

## Rôles
* **Utilisateur** : Personne utilisant l'application. 
* **Particulier** : Utilisateur connecté qui propose des offres de location et/ou de trajet.
* **Agence** : Utilisateur connecté qui propose des offres de voyage(location+trajet).

## Cahier des Charges
* L'application devra permetre à des prestataires de se créer un compte(email, password). Une fois connectées, ceux-ci pourront proposer des offres de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) et/ou de transport(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages) en fonction de cases à cocher(trajet, location).
* Un utilisateur devra voir une carte(API Maps) sur la page d'accueil. Il peut effecter une sélection sur la carte. Il peut également saisir une période de debut/fin de recherche. L'application affichera les offres de locations et de transports correspondant aux critères de la recherche. (BONUS: afficher les trajets blablacar ou SNCF si la recherche est en france)

## Backlog 
### Backlog Initial

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 1 | En tant que ***Utilisateur***, je souhaite pouvoir m'inscrire sur l'application(login, email, password, role) | 2 | 1 | :white_check_mark:
| 2 | En tant que ***Utilisateur***, je souhaite pouvoir me connecter/déconnecter(login, pw) | 3 | 1 | :white_check_mark: 
| 3 | En tant que ***Utilisateur***, je souhaite pouvoir rechercher des offres: Trajet/Location/Voyage (à partir d'une zone géographique, d'une date deb/fin) | 8 | 2 | :white_check_mark: 
| 4 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de locations(pays, adresse de location, ville, tarif , durée, date de début , surface et description) | 3 | 2 | :white_check_mark: 
| 5 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de trajet(ville de départ, ville d'arrivée, adresse de départ, adresse d'arrivée, tarif, nombre de places, date et heure du départ, date et heure d'arrivée, type de transport) | 3 | 2 | :white_check_mark: 
| 6 | En tant que ***Particulier***, je souhaite pouvoir lister mes offres| 1 | 3 | :white_check_mark: 
| 7 | En tant que ***Particulier***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| 2 | 3 | :white_check_mark: 
| 8 | En tant qu'***Agence***, je souhaite pouvoir créer une offre de Voyage(pays, ville, adresse de location, tarif, date  de l'aller, date du retour, lieu de départ, lieu d'arrivée, durée du voyage, description) | 3 | 2 | :white_check_mark: 
| 9 | En tant qu'***Agence***, je souhaite pouvoir lister mes offres| 1 | 3 | :white_check_mark: 
| 10 | En tant qu'***Agence***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| 2 | 3 | :white_check_mark: 

## Technologies
* Front: Angular
* Serveur: Nodejs
* BD: MongoDB
* Test: Protractor(test E2E angular)
* Test: Mocha(test unitaire)

