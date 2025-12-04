# 🎮 Guide d'Intégration Rétro Gaming

> **Nuit de l'Info 2025 - Défi IUTLCO: "On veut du gros pixel!"**

## 📋 Table des Matières

1. [Introduction](#introduction)
2. [Méthodes d'Intégration](#méthodes-dintégration)
3. [Composants Disponibles](#composants-disponibles)
4. [Personnalisation](#personnalisation)
5. [Exemples Pratiques](#exemples-pratiques)
6. [FAQ](#faq)

---

## Introduction

Ce guide vous explique comment intégrer le style rétro gaming pixel art à votre projet pour la Nuit de l'Info 2025. Le système est entièrement modulable et peut être utilisé de différentes façons selon vos besoins.

---

## Méthodes d'Intégration

### Méthode 1: Page Complète Rétro (Recommandé)

Créez une nouvelle page en étendant le template de base:

```twig
{# templates/ma_page_retro.html.twig #}
{% extends 'retro_base.html.twig' %}

{% block title %}Mon Titre{% endblock %}

{% block main_content %}
    <div class="retro-card">
        <h2 class="retro-subtitle">Mon Contenu</h2>
        <p class="retro-text">Votre texte ici...</p>
    </div>
{% endblock %}
```

### Méthode 2: Intégration Partielle

Ajoutez les assets à votre page existante et utilisez les classes CSS:

```twig
{# templates/ma_page.html.twig #}
{% extends 'base.html.twig' %}

{% block stylesheets %}
    <link rel="stylesheet" href="{{ asset('css/retro-gaming.css') }}">
{% endblock %}

{% block body %}
    <div class="retro-card">
        <h2 class="retro-subtitle">Section Rétro</h2>
        <p class="retro-text">Contenu...</p>
        <button class="retro-button">Action</button>
    </div>
{% endblock %}

{% block javascripts %}
    <script src="{{ asset('js/retro-gaming.js') }}"></script>
{% endblock %}
```

### Méthode 3: Mode Toggle Dynamique

Permettez aux utilisateurs d'activer/désactiver le mode rétro:

```twig
{% extends 'base.html.twig' %}

{% block stylesheets %}
    <link rel="stylesheet" href="{{ asset('css/retro-gaming.css') }}">
{% endblock %}

{% block body %}
    {# Votre contenu normal #}
    <div class="container">
        <h1>Ma Page</h1>
        <p>Contenu normal...</p>
    </div>
{% endblock %}

{% block javascripts %}
    <script src="{{ asset('js/retro-gaming.js') }}"></script>
    {# Le bouton toggle est automatiquement ajouté #}
{% endblock %}
```

---

## Composants Disponibles

### 🎨 Classes CSS

#### Conteneurs et Layout

```css
.retro-container      /* Conteneur principal centré */
.retro-border         /* Bordure néon avec effet glow */
.retro-card           /* Carte avec style rétro */
.retro-grid           /* Grille responsive */
```

#### Typographie

```css
.retro-title          /* Titre principal (2rem) */
.retro-subtitle       /* Sous-titre (1rem) */
.retro-text           /* Texte normal (0.8rem) */
```

#### Boutons

```css
.retro-button         /* Bouton primary (vert) */
.retro-button.secondary  /* Bouton secondary (magenta) */
```

#### Éléments Interactifs

```css
.retro-badge          /* Badge/score style arcade */
.retro-progress-bar   /* Barre de progression */
.retro-progress-fill  /* Remplissage de la barre */
.retro-menu           /* Menu de navigation */
.retro-menu-item      /* Item du menu */
```

#### Effets

```css
.retro-blink          /* Clignotement */
.retro-float          /* Flottement */
.retro-glitch         /* Effet glitch (nécessite data-text) */
.retro-console        /* Console style terminal */
.retro-console-line   /* Ligne de console */
```

### 🎮 API JavaScript

```javascript
// Instance globale disponible après chargement
window.retroGaming

// Toggle le mode rétro
retroGaming.toggleRetroMode()

// Afficher une notification
retroGaming.showNotification('Message', 'success') // types: success, error, warning, info

// Effet de typing
retroGaming.typeWriter(element, 'Texte à écrire', 50)

// Effet glitch
retroGaming.glitchEffect(element, 1000)

// Animer une barre de progression
retroGaming.animateProgressBar('.selector', 85, 2000)

// Créer des particules
retroGaming.createParticles(x, y, 10)

// Ajouter effets hover
retroGaming.addHoverEffects('.selector')

// Écran Game Over
retroGaming.showGameOver('GAME OVER')

// Effet console
retroGaming.createConsoleEffect(element, ['ligne1', 'ligne2'], 1000)
```

---

## Personnalisation

### Variables CSS

Personnalisez les couleurs et vitesses d'animation dans `public/css/retro-gaming.css`:

```css
:root {
    /* Couleurs */
    --retro-bg: #0f0f1e;          /* Fond */
    --retro-primary: #00ff41;      /* Vert néon */
    --retro-secondary: #ff00ff;    /* Magenta */
    --retro-accent: #00ffff;       /* Cyan */
    --retro-warning: #ffff00;      /* Jaune */
    --retro-danger: #ff0040;       /* Rouge */

    /* Animations */
    --blink-speed: 1s;             /* Vitesse clignotement */
    --scan-speed: 4s;              /* Vitesse scanlines */
}
```

### Désactiver les Effets

Pour désactiver certains effets, modifiez les classes dans vos templates:

```twig
{# Sans l'effet CRT #}
<body class="retro-mode-no-crt">

{# Sans les scanlines #}
<style>
    .retro-mode::before { display: none; }
</style>
```

---

## Exemples Pratiques

### Exemple 1: Page d'Accueil Rétro

```twig
{% extends 'retro_base.html.twig' %}

{% block header_title %}
    🌊 OCÉANS EN DANGER 🌊
{% endblock %}

{% block main_content %}
    <div class="retro-card retro-float">
        <h2 class="retro-subtitle">MISSION: SAUVER LES OCÉANS</h2>
        <p class="retro-text">
            Plongez dans une aventure pixel art pour découvrir
            les enjeux de la protection des océans...
        </p>
        <button class="retro-button" onclick="location.href='/mission'">
            DÉMARRER LA MISSION
        </button>
    </div>

    <div class="retro-grid">
        <div class="retro-card">
            <h3 class="retro-subtitle">🐟 BIODIVERSITÉ</h3>
            <p class="retro-text">Découvrez les espèces marines...</p>
        </div>
        <div class="retro-card">
            <h3 class="retro-subtitle">♻️ POLLUTION</h3>
            <p class="retro-text">Luttez contre la pollution...</p>
        </div>
    </div>
{% endblock %}
```

### Exemple 2: Quiz Rétro

```twig
{% extends 'retro_base.html.twig' %}

{% block main_content %}
    <div class="retro-card">
        <h2 class="retro-subtitle">QUIZ NIVEAU 1</h2>

        <div class="retro-mb-2">
            <span class="retro-badge">SCORE: {{ score }}</span>
            <span class="retro-badge">VIE: 3</span>
        </div>

        <p class="retro-text retro-mb-2">{{ question }}</p>

        <button class="retro-button retro-mb-1">Réponse A</button>
        <button class="retro-button retro-mb-1">Réponse B</button>
        <button class="retro-button retro-mb-1">Réponse C</button>
    </div>
{% endblock %}

{% block javascripts %}
    <script>
        // Ajouter effets sur les boutons
        document.querySelectorAll('.retro-button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                retroGaming.createParticles(e.clientX, e.clientY, 20);
            });
        });
    </script>
{% endblock %}
```

### Exemple 3: Tableau de Bord avec Stats

```twig
{% extends 'retro_base.html.twig' %}

{% block main_content %}
    <div class="retro-card">
        <h2 class="retro-subtitle">📊 STATISTIQUES</h2>

        <div class="retro-mb-2">
            <p class="retro-text">Pollution réduite:</p>
            <div class="retro-progress-bar">
                <div class="retro-progress-fill" id="pollution-bar" style="width: 0%"></div>
            </div>
        </div>

        <div class="retro-mb-2">
            <p class="retro-text">Espèces sauvées:</p>
            <div class="retro-progress-bar">
                <div class="retro-progress-fill" id="species-bar" style="width: 0%"></div>
            </div>
        </div>
    </div>
{% endblock %}

{% block javascripts %}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            retroGaming.animateProgressBar('#pollution-bar', {{ pollution_percent }}, 2000);

            setTimeout(() => {
                retroGaming.animateProgressBar('#species-bar', {{ species_percent }}, 2000);
            }, 500);
        });
    </script>
{% endblock %}
```

### Exemple 4: Section Rétro dans Page Normale

```twig
{% extends 'base.html.twig' %}

{% block stylesheets %}
    {{ parent() }}
    <link rel="stylesheet" href="{{ asset('css/retro-gaming.css') }}">
{% endblock %}

{% block body %}
    {# Contenu normal #}
    <div class="container">
        <h1>Ma Page Normale</h1>
        <p>Contenu en style normal...</p>
    </div>

    {# Section rétro gaming #}
    <section style="background: var(--retro-bg); padding: 40px 0;">
        <div class="retro-container">
            <div class="retro-border">
                <h2 class="retro-title retro-center">
                    🎮 MINI-GAME 🎮
                </h2>
                <p class="retro-text retro-center">
                    Une section complètement rétro dans votre page!
                </p>
                <div class="retro-center retro-mt-2">
                    <button class="retro-button">JOUER</button>
                </div>
            </div>
        </div>
    </section>

    {# Retour au contenu normal #}
    <div class="container">
        <h2>Suite du Contenu Normal</h2>
    </div>
{% endblock %}
```

---

## FAQ

### Comment activer le mode rétro sur toute une page?

Ajoutez la classe `retro-mode` au `<body>`:

```twig
<body class="retro-mode">
```

### Le code Konami ne fonctionne pas?

Assurez-vous que:
1. Le JavaScript est chargé: `<script src="{{ asset('js/retro-gaming.js') }}"></script>`
2. La séquence exacte est: ↑ ↑ ↓ ↓ ← → ← → B A
3. Utilisez les touches fléchées, puis les lettres B et A

### Comment changer les couleurs?

Modifiez les variables CSS dans `retro-gaming.css` ou surchargez-les:

```css
<style>
    :root {
        --retro-primary: #ff6600; /* Orange au lieu de vert */
    }
</style>
```

### Les polices pixel art ne s'affichent pas?

Vérifiez votre connexion internet, la police est chargée depuis Google Fonts. Alternative offline:

```css
/* Téléchargez la police et ajoutez-la localement */
@font-face {
    font-family: 'Press Start 2P';
    src: url('/fonts/PressStart2P.woff2') format('woff2');
}
```

### Comment désactiver les scanlines CRT?

```css
.retro-mode::before {
    display: none !important;
}
```

### Le mode est trop sombre?

Ajustez la couleur de fond:

```css
:root {
    --retro-bg: #1a1a3e; /* Plus clair */
}
```

### Comment intégrer avec le sujet océans?

Le template est thématiquement neutre. Changez simplement:
- Les titres et textes pour parler des océans
- Les badges (ex: "POISSONS SAUVÉS: 42")
- Les couleurs (bleus pour l'océan)
- Les emojis (🌊 🐟 🐙 🦈)

```twig
{% block header_title %}
    🌊 OPÉRATION OCÉAN PIXEL 🌊
{% endblock %}
```

---

## Support

Pour toute question ou problème:
1. Consultez le fichier `readme.8bit`
2. Vérifiez les exemples dans `demo_retro.html.twig`
3. Inspectez la console navigateur (F12) pour les erreurs

---

**Créé pour la Nuit de l'Info 2025 - Défi IUTLCO 🎮**

*"On veut du gros pixel!" ✨👾🕹️*
