# Workshop

L'objectif de ce projet est de développer une landing page ou une page de démonstration qui utilise un modèle d'IA de classification de son basé sur TensorFlow.js.
Le code qui est fourni actuellement permet de charger et de prédire des fichiers audio WAV mono d'une seconde à 16kHz (16 000 samples).
L'objectif est de proposer une interface web permettant d'utiliser et d'explorer des fonctionnalités supplémentaires pour rendre cet outil plus interactif.

## Technologies permises :
Bien que la démonstration actuelle utilise du JavaScript vanille, vous êtes libres d'utiliser Node.js ou tout autre framework web de votre choix (React, Angular, Vue.js, etc.) pour améliorer l'expérience utilisateur et les interactions sur la page web.

## Problématique :
L'outil actuel est simplement un formulaire HTML brut qui permet d'uploader un fichier audio et d'afficher la prédiction.
Il n'y a pas d'interactivité ni de css pour améliorer l'expérience utilisateur.

## Attendu possible :
- Proposer une architecture technique qui permet d'ajouter des fonctionnalités supplémentaires à l'outil de classification audio.
- Intégrer des fonctionnalités permettant l'enregistrement audio direct depuis le navigateur, la transformation de ce dernier en format WAV adéquat, et son analyse en temps réel ou non.
- Concevoir une interface utilisateur intuitive qui facilite l'interaction avec l'outil de classification audio.
- Utiliser des API comme Whisper pour ajouter des fonctionnalités de reconnaissance vocale une fois le mot clé prononcé.
- Ajouter ChatGPT après la reconnaissance vocale pour générer des réponses textuelles à partir des mots clés prononcés.

## Livrables
- Page Web : Une landing page ou une page de démonstration fonctionnelle qui incorpore le modèle TensorFlow.js pour la classification audio.
- Documentation : Un document expliquant les choix techniques, les fonctionnalités implémentées.
