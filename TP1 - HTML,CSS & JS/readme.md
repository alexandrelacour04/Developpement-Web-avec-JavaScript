# README - Installation et Lancement du Site

## Description

Ce projet est une **application météo** simple qui permet aux utilisateurs de rechercher la météo pour une ville donnée.


---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système:

- **Navigateur Web** (Google Chrome, Mozilla Firefox, Edge, etc.)
- **Serveur HTTP local** (par
  exemple: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) via VS Code, ou
  Apache/Nginx)


---

## Instructions pour l'installation

### 1. Extraire le projets :

- Ne pas renommer le projet

### 2. Vérification des fichiers

Assurez-vous que les fichiers suivants existent dans la structure du projet:

- `index.html` – La page principale.
- `css/styles.css` – Les fichiers CSS pour la mise en forme.
- `js/script.js` – Fichier JS qui contient la logique.

### 3. Lancer le projet avec un serveur local

Pour lancer le projet double cliqué sur le fichier index.html

## Structure des fichiers

Voici un aperçu de la structure des fichiers du projet :

```
<nom_du_projet>/
│
├── index.html          # Fichier principal HTML
├── css/
│   └── styles.css      # Fichier principal de styles CSS
├── js/
│   └── script.js       # Script JavaScript pour la logique métier
└── assets/             # (Optionnel) Répertoire pour les images ou autres fichiers
```

---

## Comment utiliser le site ?

1. **Ouvrir l'interface utilisateur (`index.html`)**


2. **Rechercher la météo**
    - Saisissez le nom d'une ville dans le champ prévu à cet effet.
    - Cliquez sur le bouton **Valider**.
    - La section **Prévisions météo** affichera les prévisions correspondantes.

3. **Navigation**
    - Le menu inclut les options _Accueil_, _Contact_ et _Aide_ (non fonctionnelles pour le moment).

---

## Problèmes courants

### Aucune information météo n'est disponible

- Vérifiez votre connexion internet.
- Assurez-vous que l'API utilisée pour récupérer les données météo est active (si applicable).
- Consultez la console du développeur pour des éventuels messages d'erreur (Ctrl+Shift+I ou F12).

### Les styles ou scripts ne fonctionnent pas

- Assurez-vous que les chemins des fichiers CSS et JS sont corrects.
- Testez avec un autre navigateur.

---

## Support

Pour toute question ou problème, veuillez contacter [alexandre.lacour04@gmail.com](mailto:alexandre.lacour04@gmail.com).
