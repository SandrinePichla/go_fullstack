const express = require('express');

const bodyParser = require('body-parser');

// Importation de mongoose pour la gestion de la base de données MongoDB  
const mongoose = require('mongoose');

const Thing = require('./models/thing'); // Importation du modèle "Thing" pour les objets

// Création de l'application Express
// Cette application gère les requêtes HTTP et les réponses

mongoose.connect("mongodb+srv://sandrinePichla:caca@cluster0.b43ynz7.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

// Middleware pour gérer les requêtes CORS // Permet aux requêtes provenant de n'importe quelle origine d'accéder à l'API
app.use((req, res, next) => {   
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour enregistrer les requêtes reçues
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id; // Suppression de la propriété 'delete' de req.body
    const thing = new Thing({
        ...req.body // Utilisation de l'opérateur de décomposition pour créer un nouvel objet avec les propriétés de req.body
    });
thing.save() // Enregistrement de l'objet dans la base de données
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si l'enregistrement échoue
});
    
app.put('/api/stuff/:id', (req, res, next) => {       
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mise à jour de l'objet "Thing" avec l'ID spécifié
    .then(() => res.status(201).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la mise à jour échoue
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Recherche d'un objet "Thing
    .then(thing => res.status(200).json(thing)) // Envoi de l'objet trouvé en réponse
    .catch(error => res.status(404).json({ error })); // Envoi d'une erreur si l'objet n'est pas trouvé 
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) // Suppression de l'objet "Thing" avec l'ID spécifié
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la suppression échoue
});

app.get('/api/stuff', (req, res, next) => {
  Thing.find() // Recherche de tous les objets "Thing" dans la base de données
    .then(things => res.status(200).json(things)) // Envoi des objets trouvés en réponse
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la recherche échoue

});

module.exports = app;