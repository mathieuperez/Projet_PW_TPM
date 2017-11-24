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
| 1 | En tant que ***Utilisateur***, je souhaite pouvoir m'inscrire sur l'application(email, password) | 2 | 1 | :x:
| 2 | En tant que ***Utilisateur***, je souhaite pouvoir me connecter/déconnecter(email, pw) | 3 | 1 | :x: 

### Tâches

| ID_Tache | Description | Affectation | Durée Estimée ( heure homme ) | US Associés | Etat |
| --- | --- | --- | --- | --- | --- |
| T1_P | Créer l'interface Front-end de connexion<br><ul><li>Création d'une interface permettant aux utilisateur de remplir les champs e-mail et mot de passe afin de se connecter</li></ul> |  | 2 | 1 | :x:
| T2_P | Créer l'interface Front-end de l'accueil<br><ul><li>un bouton de connexion</li><li>oblet vers les pages de recherches (locations, trajets, voyages)</li></ul> |  | 2 | 1 | :x:
| T3_P | Créer l'interface Front-end de création d'un compte avec les champs : <br><ul><li>e-mail</li><li>Mot de passe</li><li>rôle(agence/Particulier)</li></ul> |  | 3 | 1 | :x:
| T4_B | Mise en service et test du serveur MongoDB<br><ul><li>Ajouter monk et s'en servir comme lien avec notre base de donnée MongoDB</li><li>Ouvrir un terminal et lancer la commande "mongod --dbpath bepp-project/api/node_modules/data/"</li></ul>|  | 3 | 1 et 2 | :x:
| T5_MB | Définir les requêtes (MongoDB) dont on aura besoin pour chaque service<ul><li>Compléter le service REST qui insère un utilisateur dans la BD(création d'un compte utilisateur US1)</li><li>Compléter le service REST qui vérifie que la BD contient bien le login et le password d'un utilisateur(connexion d'un utilisateur US1)</li></ul> |  | 6 | 1 et 2 | :x:
| T6_M | Mettre en place le coté serveur : l'Express et le NodeJS |  | 4 | ∅ | :x:
| T7_PM | Définir les liaisons entre les placeholders et les services |  | 4 | ∅ | :x:
| T8_M | Service REST POST  : Créer un utilisateur|  | 2 | 1 | :x:
| T9_M | Service REST POST  : Authentification |  | 4 | 1 | :x:
| T10_M | Initialiser l'environnement de développement du framework Angular |  | 1/2 | ∅ | :x:
| T11_DOC | La documentation des services "SWAGGER" |  | 1/2 | ∅ | :x:
| T12_TEST | Redaction des tests : E2E(Protractor)|  | 1 | 1 et 2 | :x:
| T13_TEST | Effectuer les tests : E2E(Protractor)|  | 4 | 1 et 2 | :x:
| T14_PM | Faire le lien entre l'interface de la tâche T1_P et les services de l'api |  | 1 | 2 | :x:
| T15_PM | Faire le lien entre l'interface de la tâche T2_P et les services de l'api |  | 1 | 1 | :x:

### Les tests E2E

sur le [lien suivant](sprint1/tests.md).

### Les dépendances entre les tâches.

sur le [lien suivant](sprint1/dependance.md).

### L'organisation des tâches : Timeline et Kanban

sur le [lien suivant](sprint1/organisation.md).


https://www.telerik.com/kendo-angular-ui/components/popup/
