const express = require('express');

const bodyParser = require('body-parser');

// Importation de mongoose pour la gestion de la base de données MongoDB  
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Création de l'application Express
// Cette application gère les requêtes HTTP et les réponses
mongoose.connect("mongodb+srv://sandrinePichla:caca@cluster0.b43ynz7.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware pour gérer les requêtes CORS // Permet aux requêtes provenant de n'importe quelle origine d'accéder à l'API
app.use((req, res, next) => {   
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // Middleware pour parser le JSON dans les requêtes

app.use('/api/stuff' , stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;