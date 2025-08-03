const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Middleware pour enregistrer les requêtes reçues
router.post('/', stuffCtrl.creatThings);    
router.put('/:id', stuffCtrl.modifyThing);
router.get('/:id', stuffCtrl.getOneThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/', stuffCtrl.getAllThing);

module.exports = router;