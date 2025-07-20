const mongoose = require('mongoose');
// Création de l'application Express

// Schéma de données pour les objets "thing"  
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true }    
});

module.exports = mongoose.model('Thing', thingSchema); // Exportation du modèle "Thing" basé sur le schéma défini

  

