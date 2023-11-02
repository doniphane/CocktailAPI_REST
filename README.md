
****************************************************
                        Cocktail API
Introduction :

- Ceci est une API REST pour gérer une collection de cocktails. Elle permet de récupérer, ajouter, mettre à jour et supprimer des cocktails.


Installez les dépendances :

- npm install


Lancez le serveur :

- npm start


Endpoints


Obtenir tous les cocktails : 

URL : /cocktails
Méthode : GET
Réponse : Liste des cocktails


Obtenir un cocktail par ID :

URL : /cocktails/:id
Méthode : GET


Ajouter un cocktail :

URL : /cocktails
Méthode : POST

{
  "name": "nom du cocktail",
  "description": "description du cocktail",
  "category": "catégorie du cocktail"
}

Mettre à jour un cocktail : 

URL : /cocktails/:id
Méthode : PUT
Corps de la requête : 

{
  "name": "nouveau nom",
  "description": "nouvelle description",
  "category": "nouvelle catégorie"
}

Sécurité


- L'API utilise validator pour valider les entrées et éviter les données malveillantes ou incorrectes.
- L'ai utlise JWT token pour conexion des utilisateur ainsi que la gestion des ajouts des cocktails
