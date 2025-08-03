const Thing = require('../models/Thing');

exports.creatThings = (req, res, next) => {
    delete req.body._id; // Suppression de la propriété 'delete' de req.body
    const thing = new Thing({
        ...req.body // Utilisation de l'opérateur de décomposition pour créer un nouvel objet avec les propriétés de req.body
    });
thing.save() // Enregistrement de l'objet dans la base de données
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si l'enregistrement échoue
}

exports.modifyThing = (req, res, next) => {       
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mise à jour de l'objet "Thing" avec l'ID spécifié
    .then(() => res.status(201).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la mise à jour échoue
}

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) // Suppression de l'objet "Thing" avec l'ID spécifié
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la suppression échoue
}

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Recherche d'un objet "Thing
    .then(thing => res.status(200).json(thing)) // Envoi de l'objet trouvé en réponse
    .catch(error => res.status(404).json({ error })); // Envoi d'une erreur si l'objet n'est pas trouvé 
}

exports.getAllThing = (req, res, next) => {
  Thing.find() // Recherche de tous les objets "Thing" dans la base de données
    .then(things => res.status(200).json(things)) // Envoi des objets trouvés en réponse
    .catch(error => res.status(400).json({ error })); // Envoi d'une erreur si la recherche échoue

}