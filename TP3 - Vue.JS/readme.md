# SkySentry - Application Météo avec Vue.js (TP 3)

## Description
SkySentry-Vue.js est une application web météo développée dans le cadre du TP 3 pour introduire les concepts du framework JavaScript Vue.js. Basée sur l'application météo des TP précédents, cette version utilise Vue.js pour interroger l'API OpenWeatherMap, manipuler la vue avec des bindings réactifs, des conditions et des boucles, et afficher les conditions météorologiques actuelles ainsi que les prévisions sur 5 jours pour une ville donnée. Les utilisateurs peuvent également afficher/masquer des informations avancées telles que l'humidité, la pression atmosphérique, la vitesse du vent, et les températures minimale et maximale.

## Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.)
- Une connexion Internet pour accéder à l'API OpenWeatherMap et aux CDN (Vue.js, Weather Icons)

## Installation
1. **Téléchargez l'archive du projet** :
    - Décompressez l'archive zip fournie pour le TP 3 dans un dossier de votre choix.

2. **Structure du projet** :
   ```
   projet-meteo/
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── app.js
   ├── index.html
   └── readme.md
   ```

3. **Utiliser l'application** :
    - **Option 1** : Ouvrez le fichier `index.html` directement dans un navigateur (file://). Notez que les requêtes API peuvent être bloquées en raison des restrictions CORS.
    - Alternative : Utilisez un autre serveur local comme `live-server` (via npm) ou un environnement de développement comme VS Code.

## Utilisation
1. **Recherche d'une ville** :
    - Entrez le nom d'une ville dans le champ de recherche (par exemple, "Paris") et cliquez sur "Valider".
    - L'application affiche les conditions météorologiques actuelles, incluant la température, une icône météo, et une description.
2. **Afficher/Masquer les détails avancés** :
    - Cliquez sur l'icône en forme de flèche à droite de chaque ville pour afficher ou masquer les détails avancés (description, pression, humidité, vitesse du vent, températures min/max).
3. **Prévisions sur 5 jours** :
    - Après une recherche, les prévisions météo pour les 5 prochains jours sont affichées en bas de la section des prévisions, avec la date, la température, l'icône météo, et la description pour chaque jour.
4. **Navigation** :
    - Les boutons "Accueil", "Contact" et "Aide" dans l'en-tête affichent une alerte (fonctionnalité non implémentée pour ce TP).

## Fonctionnalités
- **Interrogation de l'API** : Utilisation de l'API OpenWeatherMap pour récupérer les données météo actuelles (`/weather`) et les prévisions sur 5 jours (`/forecast`).
- **Vue.js** :
    - **Binding réactif** : Utilisation de `v-model` pour lier le champ de recherche à l'état de l'application.
    - **Boucles** : Utilisation de `v-for` pour afficher la liste des villes et les prévisions sur 5 jours.
    - **Conditions** : Utilisation de `v-if` et `v-bind:class` pour gérer l'affichage conditionnel des détails avancés et des styles.
    - **Gestion d'état** : Stockage des données météo et des prévisions dans l'état réactif de Vue.js.
- **Limitation des résultats** : Affichage d'un maximum de 5 villes, avec suppression des entrées plus anciennes.
- **Notifications** : Affichage d'un message temporaire si une ville est déjà dans la liste (elle est alors remontée en haut).
- **Prévisions sur 5 jours** : Extraction des dates à partir du champ `dt_txt` de l'API, avec préférence pour les prévisions de midi (12:00:00) pour chaque jour.

## Dépendances
- **Vue.js** : Chargé via CDN (`https://unpkg.com/vue@3/dist/vue.global.js`).
- **Weather Icons** : Chargé via CDN (`https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css`).
- **OpenWeatherMap API** : Clé API incluse dans `app.js` pour un usage éducatif.

## Remarques
- **Clé API** : La clé API OpenWeatherMap incluse est destinée à un usage éducatif. Pour une utilisation en production, obtenez une clé personnelle sur `https://openweathermap.org/`.
- **CORS** : Pour tester localement, un serveur HTTP est requis pour éviter les erreurs CORS lors des requêtes API.
- **Responsive Design** : L'application est optimisée pour les écrans de bureau et mobiles grâce à un design responsive défini dans `styles.css`.
- **Navigation** : Les boutons de navigation sont des placeholders, comme spécifié dans les consignes du TP.

## Soumission
Pour soumettre le TP 3 sur Moodle :
1. Créez une archive zip contenant les fichiers suivants :
    - `index.html`
    - `css/styles.css`
    - `js/app.js`
    - `readme.md`
2. Nommez l'archive `TP3_Nom_Prenom.zip` (remplacez par votre nom et prénom).
3. Déposez l'archive sur la plateforme Moodle dans la section dédiée au TP 3.

## Auteur
Alexandre LACOUR  
©2025 Appli météo