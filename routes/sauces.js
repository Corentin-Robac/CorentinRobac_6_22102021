const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Ajouter une sauce
router.post('/', auth, multer, saucesCtrl.createSauce);

// Like et dislike
router.post('/:id/like', auth, saucesCtrl.likeSauce);

// Modifier une sauce 
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Supprimer une sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Affiche une sauce spécifique
router.get('/:id', auth, saucesCtrl.displayOneSauce);

// Afficher la liste des sauces
router.get('/', auth, saucesCtrl.displayAllSauces);

module.exports = router;