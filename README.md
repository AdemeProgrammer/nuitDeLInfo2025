# Nuit de l'Info 2025

Projet développé pour la **Nuit de l'Info 2025** - IUT Littoral Côte d'Opale

## Description

Application web interactive mettant en avant le thème de la prévention et de la sensibilisation, avec une esthétique rétro gaming unique. Le projet combine plusieurs fonctionnalités modernes dans un style pixel art nostalgique.

## Technologies

- **Framework**: Symfony 7.4
- **PHP**: 8.2+
- **Base de données**: Doctrine ORM
- **Frontend**: Twig, JavaScript vanilla, CSS3
- **Outils**: Stimulus, Turbo UX

## Fonctionnalités Principales

### 1. Interface Rétro Gaming
- Style pixel art authentique avec police "Press Start 2P"
- Effets CRT et scanlines pour un rendu écran cathodique
- Palette de couleurs néon personnalisable
- Animations arcade fluides
- Champ d'étoiles animé en arrière-plan
- Mode rétro activable/désactivable dynamiquement

### 2. Console Linux Interactive
- Terminal Linux simulé avec plus de 20 commandes
- Système de commandes entièrement extensible
- Historique de commandes navigable (↑/↓)
- Autocomplétion avec TAB
- Raccourcis clavier (Ctrl+L, Ctrl+C)
- Mini-jeux intégrés (Snake, Matrix, etc.)
- API complète pour ajouter des commandes personnalisées

### 3. Module de Prévention Virus
- Sensibilisation aux menaces informatiques
- Interface pédagogique interactive
- Système d'alertes et de notifications

### 4. Composants Réutilisables
- Plus de 50 classes CSS pixel art
- 12 macros Twig prêtes à l'emploi
- Boutons, cartes, badges, barres de progression
- Menu de navigation rétro
- Système de grille responsive
- Console système avec output typé

## Installation

### Prérequis
- PHP 8.2 ou supérieur
- Composer
- Symfony CLI (optionnel mais recommandé)

### Étapes d'installation

1. Cloner le projet
```bash
git clone <url-du-repo>
cd nuitDeLInfo2025
```

2. Installer les dépendances
```bash
composer install
```

3. Configurer l'environnement
```bash
cp .env .env.local
# Éditer .env.local avec vos paramètres
```

4. Créer la base de données
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

5. Démarrer le serveur
```bash
symfony server:start
# ou
php -S localhost:8000 -t public
```

## Utilisation

### Routes Disponibles

| Route | URL | Description |
|-------|-----|-------------|
| Accueil | `/` | Page d'accueil principale |
| Démo Rétro | `/demo-retro` | Démonstration des composants rétro gaming |
| Console | `/terminal` | Console Linux interactive |
| Prévention Virus | `/virus` | Module de prévention et sensibilisation |
| Composants | `/composants-retro` | Bibliothèque de composants |

### Mode Rétro Gaming

#### Activation/Désactivation
Cliquez sur le bouton **"8-BIT MODE"** en bas à droite de n'importe quelle page pour activer ou désactiver le mode rétro.

#### Code Konami
Tapez la séquence : `↑ ↑ ↓ ↓ ← → ← → B A` pour déclencher un effet spécial

#### Sons 8-bit
Les interactions déclenchent des sons rétro générés en temps réel via Web Audio API

### Console Interactive

#### Commandes Système de Base
```bash
help          # Affiche toutes les commandes disponibles
clear         # Efface l'écran
echo [texte]  # Affiche du texte
ls            # Liste les fichiers
pwd           # Affiche le répertoire courant
whoami        # Affiche l'utilisateur actuel
date          # Affiche la date et l'heure
neofetch      # Informations système avec ASCII art
```

#### Commandes Fun
```bash
snake         # Lance le jeu Snake
matrix        # Effet Matrix
hack          # Mode hacker (simulation)
coffee        # Prépare un café ASCII
```

#### Ajouter des Commandes Personnalisées
```javascript
// Dans votre JavaScript
terminal.addCommand('hello', function(args) {
    const name = args[0] || 'World';
    this.print(`Hello, ${name}!`, 'success');
});
```

### Utiliser les Composants Rétro

#### Dans un Template Twig
```twig
{# Étendre le template de base rétro #}
{% extends 'retro_base.html.twig' %}

{% block header_title %}
    MON TITRE
{% endblock %}

{% block main_content %}
    <div class="retro-card">
        <h2 class="retro-subtitle">Sous-titre</h2>
        <p class="retro-text">Contenu...</p>
        <button class="retro-button">ACTION</button>
    </div>
{% endblock %}
```

#### Classes CSS Principales
```html
<!-- Titres -->
<h1 class="retro-title">Grand Titre</h1>
<h2 class="retro-subtitle">Sous-titre</h2>
<p class="retro-text">Texte normal</p>

<!-- Boutons -->
<button class="retro-button">Primaire</button>
<button class="retro-button secondary">Secondaire</button>

<!-- Cartes -->
<div class="retro-card">
    <h3 class="retro-subtitle">Titre</h3>
    <p class="retro-text">Contenu</p>
</div>

<!-- Badges -->
<span class="retro-badge">SCORE: 100</span>
<span class="retro-badge retro-blink">URGENT</span>

<!-- Barre de progression -->
<div class="retro-progress-bar">
    <div class="retro-progress-fill" style="width: 75%"></div>
</div>
```

## Personnalisation

### Changer les Couleurs

Dans votre CSS ou template :
```css
:root {
    --retro-primary: #00ff41;    /* Vert néon */
    --retro-secondary: #ff00ff;  /* Magenta */
    --retro-accent: #00ffff;     /* Cyan */
    --retro-warning: #ffff00;    /* Jaune */
    --retro-danger: #ff0040;     /* Rouge */
}
```

### Créer de Nouvelles Pages Rétro

1. Créer un nouveau template qui étend `retro_base.html.twig`
2. Surcharger les blocks nécessaires (`header_title`, `main_content`, etc.)
3. Utiliser les classes CSS et macros disponibles
4. Créer une route dans un contrôleur

## Structure du Projet

```
nuitDeLInfo2025/
├── assets/              # Assets frontend (Stimulus, etc.)
├── config/              # Configuration Symfony
├── migrations/          # Migrations de base de données
├── public/
│   ├── css/
│   │   └── retro-gaming.css    # Styles rétro
│   ├── js/
│   │   ├── retro-gaming.js     # Effets rétro
│   │   └── linux-terminal.js   # Console interactive
│   └── images/          # Images et ressources
├── src/
│   ├── Controller/      # Contrôleurs
│   │   ├── AccueilController.php
│   │   ├── RetroController.php
│   │   ├── TerminalController.php
│   │   └── VirusController.php
│   ├── Entity/          # Entités Doctrine
│   └── Repository/      # Repositories
├── templates/           # Templates Twig
│   ├── retro_base.html.twig
│   ├── demo_retro.html.twig
│   ├── terminal_demo.html.twig
│   └── retro_components.html.twig
└── tests/              # Tests unitaires et fonctionnels
```

## Performances

- CSS pur sans images lourdes (effets générés en CSS)
- JavaScript vanilla optimisé (pas de framework lourd)
- Pas de dépendances externes pour le style rétro
- Chargement rapide et responsive
- Compatible tous navigateurs modernes

## Responsive Design

Le projet est entièrement responsive et fonctionne sur :
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablette (768px - 1366px)
- Mobile (< 768px)

Tous les composants s'adaptent automatiquement à la taille de l'écran.

## Compatibilité Navigateurs

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari 14+
- Opera (dernières versions)

## Développement

### Ajouter une Nouvelle Fonctionnalité

1. Créer le contrôleur dans `src/Controller/`
2. Créer les templates dans `templates/`
3. Ajouter les assets JavaScript/CSS si nécessaire
4. Configurer les routes
5. Tester et documenter

### Commandes Utiles

```bash
# Vider le cache
php bin/console cache:clear

# Lister les routes
php bin/console debug:router

# Créer une migration
php bin/console make:migration

# Exécuter les tests
php bin/phpunit
```

## Tests

```bash
# Lancer tous les tests
php bin/phpunit

# Tests spécifiques
php bin/phpunit tests/Controller/
```

## Déploiement

1. Configurer les variables d'environnement en production
2. Optimiser Composer : `composer install --no-dev --optimize-autoloader`
3. Vider et warmer le cache : `php bin/console cache:clear --env=prod`
4. Exécuter les migrations : `php bin/console doctrine:migrations:migrate --no-interaction`
5. Configurer le serveur web (Apache/Nginx)

## Fonctionnalités Interactives

- Toggle mode rétro dynamique
- Code Konami fonctionnel
- Sons 8-bit générés en temps réel
- Effets particules sur les interactions
- Console avec historique et autocomplétion
- Animations fluides en CSS pur
- Notifications style pixel art

## Licence

Projet propriétaire développé pour la Nuit de l'Info 2025

## Équipe

Département Informatique - IUT Littoral Côte d'Opale

## Support

Pour toute question ou problème :
1. Consultez la documentation dans les commentaires du code
2. Vérifiez la console JavaScript (F12) pour les erreurs
3. Videz le cache Symfony : `php bin/console cache:clear`

---

**Développé avec passion pour la Nuit de l'Info 2025**
