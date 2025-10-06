# Systeme de gestion des employes - Backend

## Apercu

Le backend du Systeme de gestion des employes est developpe avec Spring Boot, un framework Java concu pour simplifier la creation d'applications prêtes pour la production. Il expose une API RESTful permettant de gerer les donnees des employes et des departements et se connecte a des bases MySQL et MongoDB.

## Fonctionnalites

- **API RESTful** : points de terminaison pour les operations CRUD sur les employes et les departements.
- **Initialisation des donnees** : exemples de departements et d'employes fournis.
- **Integration** : connexion simultanee a MySQL et MongoDB.
- **Gestion des exceptions** : traitement specifique pour les ressources introuvables.

## Technologies

- **Spring Boot** : framework pour construire des applications de production en Java.
- **MySQL** : base de donnees relationnelle pour les donnees structurees.
- **MongoDB** : base de donnees NoSQL pour le stockage non relationnel.

## Structure des fichiers

```
Ce projet full stack est une architecture en java avec le framework springBoot builder par Maven. L'architecture backend est composé de :

config : 
- CorsConfig qui est la configuration pour permettre une app externe de se connecter aux backend pour les requêtes emis par l'app react.
- DataInitilizer : pour implemnt des données fake de départ dans la BDD


controller :
AuthControleller : qui gère la partie security de l'application, les autorisation des routes
Chaque controller pour gérer les requetes qui leur sont propres

Exception :
Exception custom pour gérer les erreurs métiers sans faire crash l'application

Model :
- Department : le model pour les departements
- Employee : le model pour les employes

Repository :
- DepartmentRepository : le repository pour les departements
- EmployeeRepository : le repository pour les employes

Service :
- DepartmentService : le service pour les departements
- EmployeeService : le service pour les employes

Security :
- SecurityConfig : la configuration de la sécurité de l'application
- Concerne la gestion des JWT, les requêtes qui concerne l'authentification et l'authorisation
- Une custom exception pour gérer les erreurs de userName  lors du chargement 

```



## Description de fichiers clefs

### `EmployeeManagementApplication.java`

Point d'entree principal de l'application Spring Boot.

### `DepartmentController.java` et `EmployeeController.java`

Controllers REST gerant respectivement les requetes liees aux departements et aux employes.

### `Department.java` et `Employee.java`

Entites representant les tables `departments` et `employees` de la base MySQL.

### `DepartmentRepository.java` et `EmployeeRepository.java`

Interfaces de repository pour effectuer les operations CRUD sur les entites.

### `DataInitializer.java`

Service qui initialise la base avec des donnees d'exemple au demarrage.

### `ResourceNotFoundException.java`

Exception personnalisee declenchee lorsque la ressource demandee est absente.

### `application.properties`

Fichier de configuration Spring Boot incluant les parametres de connexion aux bases.

### `data.sql`

Script SQL pour precharger des donnees dans MySQL.
