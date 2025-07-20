const express = require('express');

const app = express();

//premier middleware enregistre « Requête reçue ! » dans la console et passe l'exécution ;
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

//deuxième middleware enregistre « Réponse envoyée avec succès ! » dans la console et passe l'exécution ;
app.use((req, res, next) => {
    res.status(201);
    next();
    });
   
//troisième middleware envoie une réponse JSON avec le message « Bienvenue à toi ! » et passe l'exécution ;
app.use((req, res, next) => {
    res.json({ message: 'bienvenue à toi!' })
    next();
});

//quatrième middleware enregistre « Réponse envoyée avec succès ! » dans la console ;
app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
    });




    //route GET pour récupérer un groupe d'articles - tableau d'objets (schéma de données spécifique requis par le front-end).Envoi en JSON,code 200 = demande réussie
app.get('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff); // Envoie le tableau d'objets en JSON avec le code de statut 200
  // Envoie une réponse JSON avec le tableau d'objets
});


module.exports = app;