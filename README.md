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
* Un utilisateur devra voir une carte(API Maps) sur la page d'accueil. Il peut effecter une sélection sur la carte. Il peut également saisir une période de debut/fin de recherche. L'application affichera les offres de locations et de transports correspondant aux critères de la recherche. (BONUS: afficher les trajets blablacar ou SNCF si la recherche est en france)(BONUS: gerer L/T/L+T)

## Backlog 
### Backlog Initial

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 1 | En tant que ***Utilisateur***, je souhaite pouvoir m'inscrire sur l'application(email, password, role) | 2 | 1 | :x:
| 2 | En tant que ***Utilisateur***, je souhaite pouvoir me connecter/déconnecter(email, pw) | 3 | 1 | :x: 
| 3 | En tant que ***Utilisateur***, je souhaite pouvoir rechercher des offres: Trajet/Location/Voyage (à partir d'une zone géographique, d'une date deb/fin) | 8 | 2 | :x: 
| 4 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de locations(pays, adresse de location, tarif , durée, date de début et options du séjour) | 3 | 2 | :x: 
| 5 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de trajet(tarif par personne, date et heure du départ, durée estimée du trajet, prise de bagages) | 3 | 2 | :x: 
| 6 | En tant que ***Particulier***, je souhaite pouvoir lister mes offres| 1 | 3 | :x: 
| 7 | En tant que ***Particulier***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| 2 | 3 | :x: 
| 8 | En tant qu'***Agence***, je souhaite pouvoir créer une offre de Voyage(pays, adresse de location, tarif, date et heure aller, date et heure du retour, durée trajet aller, durée trajet retour, prise de bagages, options du séjour) | 3 | 2 | :x: 
| 9 | En tant qu'***Agence***, je souhaite pouvoir lister mes offres| 1 | 3 | :x: 
| 10 | En tant qu'***Agence***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| 2 | 3 | :x: 

## Technologies
* Front: Angular
* Serveur: Nodejs
* BD: MongoDB
* Test: Protractor(test E2E angular)

