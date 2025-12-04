# 🚀 Quick Start - Mode Rétro Gaming

**Nuit de l'Info 2025 - Défi IUTLCO: "On veut du gros pixel!"**

## ⚡ Installation en 3 minutes

### Étape 1: Vérifier les fichiers

Tous les fichiers sont déjà en place :

```
✅ public/css/retro-gaming.css
✅ public/js/retro-gaming.js
✅ templates/retro_base.html.twig
✅ templates/demo_retro.html.twig
✅ templates/retro_components.html.twig
✅ src/Controller/RetroController.php
✅ readme.8bit
```

### Étape 2: Tester la démo

1. Démarrez votre serveur Symfony :
   ```bash
   symfony server:start
   # ou
   php -S localhost:8000 -t public
   ```

2. Accédez à la page de démonstration :
   ```
   http://localhost:8000/demo-retro
   ```

3. Testez les fonctionnalités :
   - Cliquez sur le bouton **"8-BIT MODE"** en bas à droite
   - Tapez le code Konami : ↑ ↑ ↓ ↓ ← → ← → B A
   - Survolez les boutons et menus
   - Ouvrez la console (F12) pour voir les messages

### Étape 3: Intégrer à votre projet

#### Option A: Page complète rétro (Recommandé pour le défi)

Créez un nouveau template :

```twig
{# templates/ma_page_nuit_info.html.twig #}
{% extends 'retro_base.html.twig' %}

{% block header_title %}
    🌊 MON PROJET NUIT DE L'INFO 🌊
{% endblock %}

{% block main_content %}
    <div class="retro-card">
        <h2 class="retro-subtitle">VOTRE CONTENU ICI</h2>
        <p class="retro-text">...</p>
    </div>
{% endblock %}
```

#### Option B: Ajouter le mode rétro à une page existante

```twig
{% block stylesheets %}
    {{ parent() }}
    <link rel="stylesheet" href="{{ asset('css/retro-gaming.css') }}">
{% endblock %}

{% block body %}
    <div class="retro-card">
        <!-- Votre contenu -->
    </div>
{% endblock %}

{% block javascripts %}
    {{ parent() }}
    <script src="{{ asset('js/retro-gaming.js') }}"></script>
{% endblock %}
```

## 🎮 Composants Essentiels

### Titre et texte
```twig
<h1 class="retro-title">MON TITRE</h1>
<h2 class="retro-subtitle">Sous-titre</h2>
<p class="retro-text">Texte normal</p>
```

### Boutons
```twig
<button class="retro-button">PRIMARY</button>
<button class="retro-button secondary">SECONDARY</button>
```

### Cartes
```twig
<div class="retro-card">
    <h3 class="retro-subtitle">Titre de la carte</h3>
    <p class="retro-text">Contenu...</p>
</div>
```

### Badges
```twig
<span class="retro-badge">SCORE: 100</span>
<span class="retro-badge retro-blink">ATTENTION</span>
```

### Barre de progression
```twig
<div class="retro-progress-bar">
    <div class="retro-progress-fill" style="width: 75%"></div>
</div>
```

## 🎨 Personnalisation Rapide

### Changer les couleurs

Ajoutez dans votre template :

```html
<style>
    :root {
        --retro-primary: #votre-couleur;
        --retro-secondary: #votre-couleur;
    }
</style>
```

### Activer le mode rétro par défaut

```twig
<body class="retro-mode">
```

## 📦 Pour le rendu du défi

Le fichier **`readme.8bit`** contient toutes les informations demandées :
- URL d'accès : `/demo-retro`
- Instructions d'installation
- Description des fonctionnalités
- Adaptation au thème

Déposez simplement ce fichier sur la plateforme de soumission !

## 🎯 Checklist avant soumission

- [ ] La page `/demo-retro` fonctionne
- [ ] Le style pixel art s'affiche correctement
- [ ] Les animations et effets fonctionnent
- [ ] Le bouton toggle fonctionne
- [ ] Le code Konami fonctionne (easter egg bonus!)
- [ ] La page est responsive (testez sur mobile)
- [ ] Le fichier `readme.8bit` est à jour

## 📚 Documentation Complète

- **`RETRO_INTEGRATION_GUIDE.md`** : Guide détaillé d'intégration
- **`readme.8bit`** : Documentation pour le jury (format défi)
- **`retro_components.html.twig`** : Bibliothèque de composants réutilisables

## 🆘 Problèmes Courants

### Les styles ne s'appliquent pas
```bash
# Vider le cache Symfony
php bin/console cache:clear
```

### Les polices ne chargent pas
- Vérifiez votre connexion internet (police Google Fonts)
- Ou téléchargez Press Start 2P en local

### Le JavaScript ne fonctionne pas
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que le fichier JS est bien chargé

### Le routing ne fonctionne pas
- Videz le cache : `php bin/console cache:clear`
- Vérifiez que `RetroController.php` existe dans `src/Controller/`

## 💡 Astuces

1. **Pour le jury** : Mettez en avant le code Konami et les effets interactifs
2. **Performance** : Tous les effets sont en CSS pur (pas d'images lourdes)
3. **Responsive** : Tout fonctionne sur mobile et desktop
4. **Modulaire** : Peut s'intégrer à n'importe quelle page
5. **Thématique** : Adaptez facilement les couleurs au sujet océans

## 🏆 Points Forts pour le Défi

✅ **Style rétro authentique** : Effets CRT, scanlines, pixel art
✅ **Entièrement modulable** : Template extensible, composants réutilisables
✅ **Interactif** : Sons 8-bit, animations, code Konami
✅ **Performance** : CSS pur, JavaScript vanilla optimisé
✅ **Documentation** : Guide complet, exemples, readme.8bit
✅ **Responsive** : Fonctionne sur tous supports
✅ **Harmonieux** : S'adapte à n'importe quel contenu

## 🎮 Easter Eggs à Montrer

1. Code Konami : ↑ ↑ ↓ ↓ ← → ← → B A
2. Messages console (F12)
3. Effets hover sur les boutons
4. Champ d'étoiles animé
5. Sons 8-bit sur interactions

---

**Prêt à impressionner le jury ? Let's go! 🚀**

*Créé pour la Nuit de l'Info 2025 - Département Informatique IUT Littoral Côte d'Opale*
