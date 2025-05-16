# Développement Web avec JavaScript

## Pourquoi ce Repository ?
Ce repository GitHub contient mon travail pour la matière **Développement Web avec JavaScript**, un cours qui enseigne comment créer des applications web interactives avec JavaScript et des frameworks comme jQuery et Vue.js. Il regroupe les **travaux pratiques (TPs)** réalisés tout au long du semestre, centrés sur le développement d'une application météo appelée **SkySentry**. Chaque TP ajoute de nouvelles fonctionnalités et technologies, et ce repo sert à organiser, versionner et partager mon code.

## Contenu du Repository
Le repository inclut les fichiers sources des TPs, avec des dossiers pour chaque TP ou des branches spécifiques si indiqué. Voici un aperçu des TPs :

- **TP 1** : Création d'une interface de base pour l'application météo avec HTML, CSS, et JavaScript vanilla (saisie utilisateur, affichage statique).
- **TP 2** : Ajout de requêtes à l'API OpenWeatherMap avec jQuery pour afficher les conditions météo actuelles d'une ville.
- **TP 3** : Migration vers Vue.js, ajout des prévisions sur 5 jours (en utilisant `dt_txt` de l'API), et affichage/masquage des détails avancés (humidité, pression, vent, températures min/max).
- **TP 4** : 

Chaque TP contient :
- Les fichiers HTML, CSS, et JavaScript (ex. : `index.html`, `css/styles.css`, `js/app.js`).
- Un `readme.md` spécifique avec des instructions d'installation et d'utilisation.

## Structure du Projet (exemple pour TP 3)
```
projet-meteo/
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
└── readme.md
```

## Comment Utiliser ce Repository
1. **Cloner le repo** :
   ```bash
   git clone https://github.com/alexandrelacour04/R4.A.10-Complement-web
   ```
2. **Naviguer vers un TP** : Chaque TP est dans un dossier (ex. : `tp3/`) ou une branche (ex. : `git checkout tp3`).
3. **Lancer un TP** :
    - Ouvrir `index.html` dans un navigateur (peut avoir des limitations CORS).
    - Ou utiliser un serveur local :
      ```bash
      python -m http.server 8000
      ```
      Puis aller à `http://localhost:8000`.
4. **Suivre le readme du TP** : Chaque TP a son propre `readme.md` avec des instructions détaillées.

## Remarques
- La clé API OpenWeatherMap dans le code est pour un usage éducatif. Pour un usage personnel, remplacez-la (voir `https://openweathermap.org/`).
- Ce repo est destiné à l'évaluation des TPs par les enseignants et peut être utilisé comme portfolio de mes compétences en développement web.

## Auteur
Alexandre LACOUR  
©2025 - Projet réalisé pour le cours Développement Web avec JavaScript