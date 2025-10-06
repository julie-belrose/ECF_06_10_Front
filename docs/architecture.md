Ce projet full stack est une architecture en java avec le framework springBoot builder par Maven. L'architecture backend est composé de :

## Backend 

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

---

## Frontend
