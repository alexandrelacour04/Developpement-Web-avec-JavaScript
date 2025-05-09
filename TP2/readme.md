# SkySentry - Application Météo avec jQuery

## Description
SkySentry-jQuery est une application web météo développée avec jQuery. Elle permet de rechercher et d'afficher les conditions météorologiques actuelles pour une ville donnée, ainsi que les prévisions sur 5 jours. L'application utilise l'API OpenWeatherMap et intègre des manipulations DOM avec jQuery pour afficher les données météo.

## Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.)
- Une connexion Internet pour accéder à l'API OpenWeatherMap et aux CDN (jQuery, Weather Icons)

## Installation
1. **Téléchargez l'archive du projet** :
    - Décompressez l'archive zip dans un dossier de votre choix.

2. **Structure du projet** :
   ```
   projet-meteo/
   ├── css/
   │   └── styles.css
   ├── js/
   │   └── script.js
   ├── index.html
   └── readme.md
   ```

3. **Utiliser l'application** :
    - Option 1 : Ouvrez `index.html` directement dans un navigateur (file://). 

## Utilisation
1. **Recherche d'une ville** :
    - Entrez le nom d'une ville dans le champ de recherche et cliquez sur "Valider".
    - L'application affiche les conditions météorologiques actuelles (température, description, icône).
2. **Afficher/Masquer les détails** :
    - Cliquez sur l'icône en forme de flèche à droite de chaque ville pour afficher ou masquer les informations avancées (humidité, pression, vitesse du vent, températures min/max).
3. **Prévisions sur 5 jours** :
    - Après une recherche, les prévisions sur 5 jours sont affichées en bas de la section des prévisions.
4. **Navigation** :
    - Les boutons "Accueil", "Contact" et "Aide" dans l'en-tête affichent une alerte (non implémentés pour ce TP).

## Fonctionnalités
- **Interrogation de l'API** : Utilisation de l'API OpenWeatherMap pour les données météo actuelles et les prévisions.
- **jQuery** :
    - Manipulation du DOM avec jQuery pour afficher les données météo.
    - Gestion des événements pour la recherche et le toggle des détails.
    - Affichage dynamique des prévisions sur 5 jours.
- **Limitation** : Maximum 5 villes affichées, les anciennes entrées sont supprimées.
- **Notifications** : Message affiché si une ville est déjà dans la liste.

## Dépendances
- **jQuery** : Chargé via CDN (`https://code.jquery.com/jquery-3.6.0.min.js`).
- **Weather Icons** : Chargé via CDN (`https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css`).
- **OpenWeatherMap API** : Clé API incluse dans le code (remplacez-la si nécessaire).

## Remarques
- La clé API OpenWeatherMap incluse est à usage éducatif. Pour un usage en production, obtenez votre propre clé sur `https://openweathermap.org/`.
- L'application est optimisée pour les écrans de bureau et mobiles (design responsive).

## Auteur
Alexandre LACOUR  
©2025 Appli météo