const mongoose = require('mongoose'); // Connexion avec MongoDB
const uniqueValidator = require('mongoose-unique-validator'); // Ajoute une validation de pré-enregistrement pour des champs uniques

// Schéma de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);