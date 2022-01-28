// Imports
const express = require('express'); //  infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications
//const bodyParser = require('body-parser'); //deprecated
const mongoose = require('mongoose'); // Créer une connexion entre MongoDB et le framework d'application Web Express
const path = require('path'); // Fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires
const helmet = require('helmet'); // Sécuriser Express.js en définissant divers en-têtes HTTP

// Routage
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Connexion MongoDB
mongoose.connect('mongodb+srv://Crob:nUEFO09Dlqxpr78S@cluster0.qxjpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // Créer l'application Express

app.use(helmet()); // Sécurise les entêtes

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajouter les headers mentionnés aux requêtes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Envoyer des requêtes avec les méthodes mentionnées
    next();
});

//app.use(bodyParser.json()); //deprecated
app.use(express.json()); // Remplace bodyparser.json, extrait la partie entière du corps d'un flux de requête entrant et l'expose sur req.body comme quelque chose de plus facile à interfacer 

app.use('/images', express.static(path.join(__dirname, 'images'))); // Sert les images

// Routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;