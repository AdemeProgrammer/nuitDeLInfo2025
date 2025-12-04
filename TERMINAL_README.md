# 🖥️ Console Linux Interactive - Nuit de l'Info 2025

Une console Linux interactive et rétro avec un système de commandes entièrement personnalisable!

## 🎯 Fonctionnalités

### ✨ Interface Rétro Gaming
- Design inspiré des terminaux Linux classiques
- Style pixel art avec effets CRT et scanlines
- Animations fluides et colorées
- Header avec boutons macOS (fermer, minimiser, maximiser)

### 🎮 Système de Commandes
La console vient avec plusieurs commandes pré-installées:

#### Commandes Système
- `help` - Affiche la liste des commandes
- `clear` - Efface l'écran
- `echo [texte]` - Affiche du texte
- `print [texte]` - Affiche du texte stylisé
- `ls` - Liste les fichiers
- `pwd` - Affiche le répertoire courant
- `whoami` - Affiche l'utilisateur actuel
- `date` - Affiche la date et l'heure
- `uname` - Affiche les informations système
- `neofetch` - Affiche les informations système avec ASCII art

#### Commandes Fun/Jeux
- `snake` - Simulation du jeu Snake
- `matrix` - Effet Matrix avec caractères aléatoires
- `hack` - Mode hacker (simulation)
- `coffee` - Prépare un café (ASCII art)
- `rien` - Commande secrète qui lance un mini-jeu surprise!

### ⌨️ Raccourcis Clavier
- `↑` / `↓` - Navigation dans l'historique des commandes
- `TAB` - Autocomplétion des commandes
- `Ctrl + L` - Effacer l'écran
- `Ctrl + C` - Annuler la commande en cours

## 🚀 Installation

### 1. Fichiers nécessaires

Assurez-vous d'avoir ces fichiers dans votre projet:

```
public/
├── css/
│   └── retro-gaming.css         (styles rétro + console)
├── js/
│   ├── retro-gaming.js          (effets rétro)
│   └── linux-terminal.js        (logique de la console)
templates/
├── retro_base.html.twig         (template de base)
└── terminal_demo.html.twig      (exemple d'utilisation)
src/
└── Controller/
    └── TerminalController.php   (controller Symfony)
```

### 2. Accès à la console

Lancez votre serveur Symfony et accédez à:
```
http://localhost:8000/terminal
```

## 💻 Utilisation

### Utilisation basique

```html
<!-- Dans votre template Twig -->
<div id="terminal-container"></div>

<script src="{{ asset('js/linux-terminal.js') }}"></script>
<script>
    // Initialisation simple
    const terminal = new LinuxTerminal('terminal-container');
</script>
```

### Utilisation avancée

```javascript
// Initialisation avec options
const terminal = new LinuxTerminal('terminal-container', {
    username: 'hacker',
    hostname: 'retro-gaming',
    welcomeMessage: 'Bienvenue dans ma console!',
    prompt: '$ '
});

// Rendre accessible globalement
window.terminal = terminal;
```

## 🔧 Personnalisation

### Ajouter vos propres commandes

```javascript
// Ajouter une commande simple
terminal.addCommand('hello', function(args) {
    const name = args[0] || 'World';
    this.print(`Hello, ${name}!`, 'success');
});

// Ajouter une commande complexe avec plusieurs arguments
terminal.addCommand('calculate', function(args) {
    if (args.length < 3) {
        this.print('Usage: calculate <nombre1> <opération> <nombre2>', 'error');
        return;
    }

    const num1 = parseFloat(args[0]);
    const op = args[1];
    const num2 = parseFloat(args[2]);

    let result;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        default:
            this.print('Opération non supportée', 'error');
            return;
    }

    this.print(`Résultat: ${result}`, 'success');
});

// Ajouter un mini-jeu
terminal.addCommand('deviner', function(args) {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    const guess = parseInt(args[0]);

    if (!guess) {
        this.print('🎲 Devinez un nombre entre 1 et 100', 'output');
        this.print('Usage: deviner <nombre>', 'warning');
        return;
    }

    if (guess === secretNumber) {
        this.print('🎉 BRAVO! Vous avez trouvé!', 'success');
    } else if (guess < secretNumber) {
        this.print('⬆️ Plus grand!', 'warning');
    } else {
        this.print('⬇️ Plus petit!', 'warning');
    }
});
```

### Supprimer une commande

```javascript
terminal.removeCommand('snake');
```

### Exécuter une commande par code

```javascript
// Exécuter une commande
terminal.execute('echo Hello World');

// Exécuter plusieurs commandes
terminal.execute('clear');
terminal.execute('neofetch');
```

### Changer le prompt

```javascript
terminal.setPath('/home/user/projects');
```

## 🎨 Personnalisation du Style

### Types de messages

```javascript
// Message normal (vert)
this.print('Message normal', 'output');

// Message de succès (vert clair)
this.print('Succès!', 'success');

// Message d'erreur (rouge)
this.print('Erreur!', 'error');

// Message d'avertissement (jaune)
this.print('Attention!', 'warning');

// Commande (cyan)
this.print('$ ma-commande', 'command');
```

### Modifier les couleurs

Dans `retro-gaming.css`, modifiez les variables CSS:

```css
:root {
    --retro-primary: #00ff41;    /* Vert terminal */
    --retro-secondary: #ff00ff;  /* Magenta */
    --retro-accent: #00ffff;     /* Cyan */
    --retro-warning: #ffff00;    /* Jaune */
    --retro-danger: #ff0040;     /* Rouge */
}
```

## 📚 API Complète

### Constructeur

```javascript
new LinuxTerminal(containerId, options)
```

**Paramètres:**
- `containerId` (string): ID de l'élément HTML conteneur
- `options` (object): Options de configuration
  - `username` (string): Nom d'utilisateur affiché
  - `hostname` (string): Nom d'hôte affiché
  - `welcomeMessage` (string): Message de bienvenue
  - `prompt` (string): Symbole du prompt (par défaut: `$ `)

### Méthodes publiques

```javascript
// Gestion des commandes
terminal.addCommand(name, handler)
terminal.removeCommand(name)
terminal.execute(commandLine)

// Affichage
terminal.print(text, type)
terminal.printHTML(html, type)
terminal.cmdClear()

// Configuration
terminal.setPath(path)
terminal.focusInput()
```

## 🎯 Exemples d'utilisation

### Exemple 1: Quiz interactif

```javascript
let score = 0;

terminal.addCommand('quiz', function(args) {
    this.print('🎓 QUIZ DE PROGRAMMATION', 'success');
    this.print('Quelle est la sortie de: console.log(typeof NaN)', 'output');
    this.print('Utilisez: reponse <votre_réponse>', 'warning');
});

terminal.addCommand('reponse', function(args) {
    const answer = args[0]?.toLowerCase();
    if (answer === 'number') {
        score += 10;
        this.print('✅ Correct! +10 points', 'success');
        this.print(`Score total: ${score}`, 'output');
    } else {
        this.print('❌ Faux! La réponse est "number"', 'error');
    }
});
```

### Exemple 2: Système de fichiers simulé

```javascript
const fileSystem = {
    '/': ['documents', 'images', 'readme.txt'],
    '/documents': ['projet.pdf', 'notes.txt'],
    '/images': ['photo1.jpg', 'photo2.png']
};

let currentDir = '/';

terminal.addCommand('cd', function(args) {
    const newDir = args[0];
    if (!newDir) {
        this.print('Usage: cd <directory>', 'error');
        return;
    }

    const path = currentDir === '/' ? '/' + newDir : currentDir + '/' + newDir;

    if (fileSystem[path]) {
        currentDir = path;
        this.setPath(currentDir);
        this.print(`Changed directory to ${currentDir}`, 'success');
    } else {
        this.print(`Directory not found: ${newDir}`, 'error');
    }
});

terminal.addCommand('ls', function(args) {
    const contents = fileSystem[currentDir] || [];
    this.print(contents.join('  '), 'output');
});
```

### Exemple 3: Commande avec animation

```javascript
terminal.addCommand('loading', function(args) {
    this.print('Chargement en cours...', 'warning');

    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;

    const interval = setInterval(() => {
        if (i < 20) {
            this.print(`${frames[i % frames.length]} Loading... ${i * 5}%`, 'output');
            i++;
        } else {
            clearInterval(interval);
            this.print('✅ Chargement terminé!', 'success');
        }
    }, 200);
});
```

## 🐛 Dépannage

### Le terminal ne s'affiche pas
- Vérifiez que l'ID du conteneur correspond: `terminal-container`
- Assurez-vous que les CSS sont bien chargés
- Vérifiez la console JavaScript pour les erreurs

### Les commandes ne fonctionnent pas
- Vérifiez que `linux-terminal.js` est bien chargé
- Assurez-vous d'avoir initialisé le terminal
- Vérifiez l'orthographe des commandes

### Style cassé
- Vérifiez que `retro-gaming.css` est chargé
- Assurez-vous que la police "Press Start 2P" est disponible
- Videz le cache du navigateur

## 🎮 Easter Eggs

Essayez ces commandes secrètes dans le terminal:
- `rien` - Lance un mini-jeu surprise
- `matrix` - Effet Matrix
- `hack` - Mode hacker
- `coffee` - Prépare un café ASCII

## 📝 Licence

Projet créé pour la Nuit de l'Info 2025 - Défi IUTLCO

## 🤝 Contribution

N'hésitez pas à ajouter vos propres commandes et à personnaliser la console selon vos besoins!

---

**Bon coding! 🚀**
