## Technologies
**Front-end** :
<ul>
<li>Angular</li> 
    <li>Bootstrap</li>
</ul>

**Back-end** :
<ul>
<li>Node.js</li> 
<li>Express</li>
<li>Base de données : MongoDB</li> 
</ul>

**Test** :
<ul>
<li>Protractor</li> 
</ul>

## Sprint 1

### Mini Backlog

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 1 | En tant que ***Utilisateur***, je souhaite pouvoir m'inscrire sur l'application(login, email, password, role) | 2 | 1 | :white_check_mark:
| 2 | En tant que ***Utilisateur***, je souhaite pouvoir me connecter/déconnecter(login, pw) | 3 | 1 | :white_check_mark: 
| 4 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de locations(pays, adresse de location, ville, tarif , durée, date de début , surface et description) | 3 | 2 | :white_check_mark: 
| 5 | En tant que ***Particulier***, je souhaite pouvoir créer une offre de trajet(ville de départ, ville d'arrivée, adresse de départ, adresse d'arrivée, tarif, nombre de places, date et heure du départ, date et heure d'arrivée, type de transport) | 3 | 2 | :white_check_mark: 
| 6 | En tant que ***Particulier***, je souhaite pouvoir lister mes offres| 1 | 3 | :white_check_mark: 

### Tâches

| ID_Tache | Description | Affectation | Durée Estimée ( heure homme ) | US Associés | Etat |
| --- | --- | --- | --- | --- | --- |
| T1_P | Créer l'interface Front-end de connexion<br><ul><li>Création d'une interface permettant aux utilisateur de remplir les champs login et mot de passe afin de se connecter</li></ul> | Mathieu | 2 | 1 | :white_check_mark:
| T2_P | Créer l'interface Front-end de l'accueil<br><ul><li>un bouton de connexion</li><li>onglets vers les pages de recherches (locations, trajets, voyages)</li></ul> | Kevin | 2 | 1 | :white_check_mark:
| T3_P | Créer l'interface Front-end de création d'un compte avec les champs : <br><ul><li>login</li><li>e-mail</li><li>Mot de passe</li><li>rôle(agence/Particulier)</li></ul> | Kevin | 3 | 1 | :white_check_mark:
| T4_P | Créer l'interface Front-end de la gestion d'un trajet/location pour un particulier connecté<br><ul><li>Création d'une interface permettant aux particuliers de lister toutes leurs offres de trajets/location </li></ul> <br><ul><li> Boutton "ajouter trajet"/ "ajouter location" qui permet a un particulier connecté d'ajouter un trajet/location </li></ul> | Kevin | 2 | 1 | :white_check_mark: 
| T5_P | Créer l'interface Front-end de l'ajout d'un trajet pour un particulier connecté<br><ul><li>ville de départ</li><li>ville d'arrivée</li><li>adresse de départ</li><li>adresse d'arrivée</li><li>tarif</li><li>nombre de places</li><li> date et heure du départ</li><li>date et heure d'arrivée</li><li>type de transport</li></ul> | Kevin | 2 | 1 | :white_check_mark: 
| T6_P | Créer l'interface Front-end de l'ajout d'une location pour un particulier connecté<br><ul><li>pays</li><li> adresse de location</li><li>ville</li><li>tarif</li><li>durée du séjour</li><li>date de début</li><li>surface</li><li>description</li></ul> | Kevin | 2 | 1 | :white_check_mark: 
| T7_B | Mise en service et test du serveur MongoDB<br><ul><li>Ajouter monk et s'en servir comme lien avec notre base de donnée MongoDB</li><li>Ouvrir un terminal et lancer la commande "mongod --dbpath bepp-project/api/node_modules/data/"</li></ul>| Tous | 3 | 1 et 2 | :white_check_mark:
| T9_M | Mettre en place le coté serveur : l'Express et le NodeJS | Kevin | 4 | ∅ | :white_check_mark:
| T10_PM | Définir les liaisons entre les placeholders et les services | Kevin | 4 | ∅ | :white_check_mark:
| T11_M | Service REST POST  : Créer un utilisateur| Mathieu | 2 | 1 | :white_check_mark:
| T12_M | Service REST POST  : Authentification | Zakia | 4 | 2 | :white_check_mark:
| T13_M | Service REST POST  : Créer un trajet| Zakia | 2 | 4 | :white_check_mark:
| T14_M | Service REST POST  : Créer une location| Zakia | 2 | 3 | :white_check_mark:
| T15_M | Service REST GET  : Récupérer les trajets| Zakia | 2 | 5 | :white_check_mark:
| T16_M | Service REST GET  : Récupérer les locations| Zakia | 2 | 5 | :white_check_mark:
| T17_M | Initialiser l'environnement de développement du framework Angular | Kevin | 1/2 | ∅ | :white_check_mark:
| T18_DOC | La documentation des services "SWAGGER" | Mathieu | 1/2 | ∅ | :white_check_mark:
| T19_TEST | Redaction des tests : E2E(Protractor)| Mathieu | 1 | 1 et 2 | :x:
| T20_TEST | Effectuer les tests : E2E(Protractor)| Mathieu | 4 | 1 et 2 | :x:
| T21_PM | Faire le lien entre l'interface de la tâche T1_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T22_PM | Faire le lien entre l'interface de la tâche T2_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:
| T23_PM | Faire le lien entre l'interface de la tâche T3_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T24_PM | Faire le lien entre l'interface de la tâche T4_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:
| T25_PM | Faire le lien entre l'interface de la tâche T5_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T26_PM | Faire le lien entre l'interface de la tâche T6_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:


### Les tests E2E

sur le [lien suivant](sprint1/tests.md).

### Les dépendances entre les tâches.

sur le [lien suivant](sprint1/dependance.md).

### L'organisation des tâches : Timeline et Kanban

sur le [lien suivant](sprint1/organisation.md).
