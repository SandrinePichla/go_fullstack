const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')


const stuffCtrl = require('../controllers/stuff');

// Middleware pour enregistrer les requêtes reçues

router.get('/', auth, stuffCtrl.getAllThing);
router.post('/', auth, multer, stuffCtrl.creatThing);
router.get('/:id', auth, stuffCtrl.getOneThing);    
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;