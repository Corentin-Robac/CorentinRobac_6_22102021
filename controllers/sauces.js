const Sauce = require('../models/Sauce');
const fs = require('fs');

// Ajouter une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce Ajoutée !'}))
      .catch(error => res.status(400).json({ error }));
}

// Like et dislike
exports.likeSauce = async (req, res, next) => {
    const userId = req.body.userId; // Id de l'utilisateur
    var userLike = req.body.like; // Statut de la note
    var liked = false; // Boolean liké ou non
    var disliked = false; // Boolean disliké ou non

    await Sauce.findOne({ usersLiked: userId }).then(function(docs) {
        if(docs != null){
            liked = true;
        }
    });

    await Sauce.findOne({ usersDisliked: userId }).then(function(docs) {
        if(docs != null){
            disliked = true;
        }
    });

    if(userLike === 1){
        //Liker une sauce
        Sauce.updateOne({ _id: req.params.id }, 
            {
                $push: {usersLiked: userId},
                $inc: {likes: 1}
            })
        .then(() => res.status(200).json({ message: 'Sauce likée !'}))
        .catch(error => res.status(400).json({ error }));
    }

    if(userLike === -1){
        // Disliker une sauce
        Sauce.updateOne({ _id: req.params.id }, 
            {
                $push: {usersDisliked: userId},
                $inc: {dislikes: 1}
            })
        .then(() => res.status(200).json({ message: 'Sauce dislikée !'}))
        .catch(error => res.status(400).json({ error }));
    }

    if(userLike === 0){
        if(liked === true){
            // Annuler Like
            Sauce.updateOne({ _id: req.params.id }, 
                {
                    $pull: {usersLiked: userId},
                    $inc: {likes: -1}
                })
            .then(() => res.status(200).json({ message: 'Like annulé !'}))
            .catch(error => res.status(400).json({ error }));
        }
        else{
            // Annuler Dislike
            Sauce.updateOne({ _id: req.params.id }, 
                {
                    $pull: {usersDisliked: userId},
                    $inc: {dislikes: -1}
                })
            .then(() => res.status(200).json({ message: 'Dislike annulé !'}))
            .catch(error => res.status(400).json({ error }));
        }
    }
}

// Modifier une sauce 
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
}

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

// Affiche une sauce spécifique
exports.displayOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

// Afficher la liste des sauces
exports.displayAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json( { error }));
}