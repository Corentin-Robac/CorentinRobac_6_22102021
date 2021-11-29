# Piiquante

Projet 6 Openclassrooms Développeur web

## Prérequis 

Voici les dépendances que vous devez installer :
- NodeJS 12.14 ou 14.0.
- Angular CLI 7.0.2.
- node-sass : Assurez-vous d'utiliser la version correspondante à NodeJS. 
Pour Node 14.0 par exemple, vous avez besoin de node-sass dans la version 4.14+.

Pour changer la version de node, il est conseillé d'utiliser nvm, vous trouverez la documentation de nvm ici : https://github.com/nvm-sh/nvm/blob/master/README.md

Sous Windows, ces installations nécessitent d'utiliser PowerShell en mode administrateur.

Vérifier la version de Node : node -v
Vérifier la version d'Angular cli - ng --version
Vérifier la version de Node-sass : node-sass --version

## Installation

Suivez les instructions suivantes pour installer le projet

```
mkdir piiquante
cd piiquante
mkdir back
mkdir front
mkdir images
cd back
git clone https://github.com/Corentin-Robac/CorentinRobac_6_22102021.git
npm install
npm -g nodemon
nodemon server
cd ..
cd front
git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git
npm install
npm install --save-dev run-script-os
npm start
```

## Usage Front

Lancer `npm start` devrait à la fois exécuter le serveur local et lancer votre navigateur.
Si votre navigateur ne démarre pas, ou affiche une erreur 404, accédez à votre navigateur à l'adresse http://localhost:8080.
L'application devrait se recharger automatiquement lorsque vous modifiez un fichier.
Utilisez `Ctrl+C` dans le terminal pour arrêter le serveur local.

## Usage Back

Pour avoir accès à l'authentification, un dossier .env est requis, contactez-moi pour l'obtenir.
Une fois en possession du fichier, importer le dans le dossier 'back'.