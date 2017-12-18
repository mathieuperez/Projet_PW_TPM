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
<li>Mocha</li> 
</ul>

## Sprint 2

### Mini Backlog

| ID | User Story | Difficulté | Priorité | Fait |
| --- | --- | --- | --- | --- |
| 3 | En tant que ***Utilisateur***, je souhaite pouvoir rechercher des offres: Trajet/Location/Voyage (à partir d'une zone géographique, d'une date deb/fin) | 8 | 2 | :white_check_mark:
| 7 | En tant que ***Particulier***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste | 5 | 3 | :white_check_mark: 
| 8 | En tant qu'***Agence***, je souhaite pouvoir créer une offre de Voyage(pays, ville, adresse de location, tarif, date de l'aller, date du retour, lieu de départ, lieu d'arrivée, durée du voyage, description) | 3 | 2 | :white_check_mark: 
| 9 | En tant qu'***Agence***, je souhaite pouvoir lister mes offres | 1 | 3 | :white_check_mark: 
| 10 | En tant qu'***Agence***, je souhaite pouvoir modifier/supprimer une de mes offres depuis la liste| 2 | 3 | :white_check_mark: 

### Tâches

| ID_Tache | Description | Affectation | Durée Estimée ( heure homme ) | US Associés | Etat |
| --- | --- | --- | --- | --- | --- |
| T1_P | Créer l'interface Front-end de recherche de trajets et faire la recherche<br><ul><li>Une carte maps permettant à l'utilisateur de selectionner un pays</li><li>Un champs "date" pour préciser la recherche</li><li>Un bouton pour réinitialiser la recherche</li><li>Un tableau affichant toutes les offres de trajets</li></ul> | Kevin | 2 | 3 | :white_check_mark:
| T2_P | Créer l'interface Front-end de recherche de locations et faire la recherche<br><ul><li>Une carte maps permettant à l'utilisateur de selectionner un pays</li><li>Un champs "date" pour préciser la recherche</li><li>Un bouton pour réinitialiser la recherche</li><li>Un tableau affichant toutes les offres de locations</li></ul> | Kevin | 2 | 3 | :white_check_mark:
| T3_P | Créer l'interface Front-end de recherche de voyages et faire la recherche<br><ul><li>Une carte maps permettant à l'utilisateur de selectionner un pays</li><li>Un champs "date" pour préciser la recherche</li><li>Un bouton pour réinitialiser la recherche</li><li>Un tableau affichant toutes les offres de voyages</li></ul> | Kevin | 2 | 3 | :white_check_mark:
| T4_P | Créer l'interface Front-end de l'ajout d'un voyage pour un particulier connecté<br><ul><li>pays</li><li>ville</li><li>adresse de location</li><li>tarif</li><li>date de l'aller</li><li>date du retour</li><li>lieu de départ</li><li>lieu d'arrivée</li><li>durée du voyage</li><li>description</li></ul> | Kevin | 1 | 8 | :white_check_mark: 
| T5_P | Créer l'interface Front-end de la modification d'un trajet d'un particulier connecté<br><ul><li>Création d'une interface préremplie permettant aux particuliers de modifier les informations d'une offre de trajet</li><li>Modifier l'interface listant tous les trajets d'un particulier en y ajoutant un bouton pourla modification</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T6_P | Modifier l'interface Front-end d'affichage des trajets d'un particulier connecté<br><ul><li>Modifier l'interface en y ajoutant un bouton pour la suppression</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T7_P | Créer l'interface Front-end de la modification d'une location d'un particulier connecté<br><ul><li>Création d'une interface préremplie permettant aux particuliers de modifier les informations d'une offre de location</li><li>Modifier l'interface listant tous les locations d'un particulier en y ajoutant un bouton pourla modification</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T8_P | Modifier l'interface Front-end d'affichage des locations d'un particulier connecté<br><ul><li>Modifier l'interface en y ajoutant un bouton pour la suppression</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T9_P | Créer l'interface Front-end de la modification d'un voyage d'un particulier connecté<br><ul><li>Création d'une interface préremplie permettant aux particuliers de modifier les informations d'une offre de voyage</li><li>Modifier l'interface listant tous les voyages d'un particulier en y ajoutant un bouton pourla modification</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T10_P | Modifier l'interface Front-end d'affichage des voyages d'un particulier connecté<br><ul><li>Modifier l'interface en y ajoutant un bouton pour la suppression</li></ul> | Kevin | 1 | 7 | :white_check_mark: 
| T11_P | Sécuriser l'Authentification | Kevin | 1 | 2 | :white_check_mark:
| T12_B | Mise en place de Mlab| Zakia | 1 | ∅ | :white_check_mark:
| T13_PM | Définir les liaisons entre les placeholders et les services | Kevin, Zakia | 9 | ∅ | :white_check_mark:
| T14_M | Service REST POST  : Modifier l'Authentification | Mathieu | 1 | 2 | :white_check_mark:
| T15_M | Service REST POST  : Créer un voyage| Kevin | 1 | 4 | :white_check_mark:
| T16_M | Service REST PATCH  : Modifier un voyage| Kevin | 5 | 10 | :white_check_mark:
| T17_M | Service REST GET  : Récupérer les voyages| Kevin | 1 | 9 | :white_check_mark:
| T18_M | Service REST DELETE  : Supprimer un voyage| Kevin | 1 | 10 | :white_check_mark:
| T19_M | Service REST Patch  : Modifier une location| Mathieu | 5 | 7 | :white_check_mark:
| T20_M | Service REST GET  : Récupérer les locations| Mathieu | 1 | 5 | :white_check_mark:
| T21_M | Service REST DELETE  : Supprimer une location| Mathieu | 1 | 7 | :white_check_mark:
| T22_M | Service REST Patch  : Modifier un trajet| Zakia | 5 | 7 | :white_check_mark:
| T23_M | Service REST GET  : Récupérer les trajets| Zakia | 1 | 5 | :white_check_mark:
| T24_M | Service REST DELETE  : Supprimer un trajet| Zakia | 1 | 7 | :white_check_mark:
| T25_DOC | La documentation des services "SWAGGER" | Mathieu | 2 | ∅ | :white_check_mark:
| T26_TEST | Faire les tests : E2E(Protractor)| Zakia | 10 | Toutes(1-10) | :x:
| T27_TEST | Faire les tests : TU (Mocha)| Mathieu | 5 | 1, 2, 4, 6, 7 | :white_check_mark:
| T28_TEST | Faire les tests : TU (Mocha)| Zakia | 3 | 5, 6, 7 | :white_check_mark:
| T29_TEST | Faire les tests : TU (Mocha)| Kevin | 3 | 8, 9, 10 | :white_check_mark:
| T30_PM | Faire le lien entre l'interface de la tâche T4_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T31_PM | Faire le lien entre l'interface de la tâche T5_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:
| T32_PM | Faire le lien entre l'interface de la tâche T6_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T33_PM | Faire le lien entre l'interface de la tâche T7_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:
| T34_PM | Faire le lien entre l'interface de la tâche T8_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:
| T35_PM | Faire le lien entre l'interface de la tâche T9_P et les services de l'api | Tous | 1 | 1 | :white_check_mark:
| T36_PM | Faire le lien entre l'interface de la tâche T10_P et les services de l'api | Tous | 1 | 2 | :white_check_mark:

### Les dépendances entre les tâches.

sur le [lien suivant](sprint2/dependance.md).
