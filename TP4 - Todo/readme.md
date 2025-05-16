# TP4 - Application Todo (Vue.js)

Bienvenue dans le **TP4 - Vue.js Todo App**, une application de gestion de tâches développée dans le cadre du cours
*Développement Web avec JavaScript*. Cette application permet une gestion complète des tâches avec filtrage et stockage
local.

## **Fonctionnalités**

- Gestion complète des tâches (ajout, suppression, modification)
- Informations détaillées pour chaque tâche :
    - Titre
    - Description
    - Date de début et fin
    - État (à faire, en cours, terminé)
    - Priorité (haute, moyenne, basse)
- Filtrage des tâches selon :
    - État
    - Priorité
    - Date de début
    - Date de fin
- Stockage local des données via localStorage
- Interface responsive adaptée mobile/desktop
- Affichage/masquage des détails au clic

## **Technologies**

- **Vue.js 3** : Framework JavaScript pour l'interface réactive
- **HTML5/CSS3** : Structure et mise en forme
- **Bootstrap 5** : Framework CSS pour le design responsive
- **Web Storage API** : Stockage local des données


## **Structure du Projet**
La structure des fichiers du projet se présente comme suit : 

    TP4 - Todo/
    ├── css/
    │ └── styles.css # Fichier CSS pour la mise en page
    ├── js/
    │ └── app.js # Code JavaScript pour gérer les tâches avec Vue.js
    └── index.html # Fichier d'entrée principal

## **Installation et Lancement**

### 1. Prérequis

- Un navigateur web moderne
- Un éditeur de code (Visual Studio Code, IntelliJ IDEA...)
- Optionnel : serveur local pour éviter les limitations CORS

### 2. Étapes d'installation

1. Clonez le projet :
   ```bash
   git clone <url_du_repository>
   ```
2. Ouvrez `index.html` dans votre navigateur
3. Alternative avec serveur local :
   ```bash
   python -m http.server 8000
   ```
   Puis accédez à `http://localhost:8000`

## **Guide d'utilisation**

1. **Ajouter une tâche**
    - Remplissez le formulaire avec :
        - Titre
        - Description
        - Dates début/fin
        - État
        - Priorité
    - Validez avec "Ajouter"

2. **Gérer les tâches**
    - Supprimez via le bouton dédié
    - Modifiez l'état en cliquant dessus
    - Affichez les détails en cliquant sur la tâche

3. **Filtrer l'affichage**
    - Par état
    - Par priorité
    - Par date début/fin

## **Remarques**

- Toutes les données sont sauvegardées localement dans votre navigateur
- Interface adaptative pour tout type d'écran
- Compatible avec les principaux navigateurs
- Aucun rechargement de page lors des actions

## **Auteur**

**Alexandre LACOUR**  
2025 - Projet réalisé pour le cours *Développement Web avec JavaScript*