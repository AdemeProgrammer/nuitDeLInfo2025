/**
 * LINUX TERMINAL INTERACTIVE
 * Console Linux avec système de commandes personnalisables
 * Nuit de l'Info 2025 - Défi IUTLCO
 */

class LinuxTerminal {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.options = {
            username: options.username || 'user',
            hostname: options.hostname || 'retro-gaming',
            welcomeMessage: options.welcomeMessage || this.getDefaultWelcome(),
            prompt: options.prompt || '$ ',
            ...options
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentPath = '~';

        // Système de commandes extensible
        this.commands = {
            help: this.cmdHelp.bind(this),
            clear: this.cmdClear.bind(this),
            echo: this.cmdEcho.bind(this),
            print: this.cmdPrint.bind(this),
            ls: this.cmdLs.bind(this),
            pwd: this.cmdPwd.bind(this),
            whoami: this.cmdWhoami.bind(this),
            date: this.cmdDate.bind(this),
            uname: this.cmdUname.bind(this),
            neofetch: this.cmdNeofetch.bind(this),
            // Commandes fun/jeux
            snake: this.cmdSnake.bind(this),
            matrix: this.cmdMatrix.bind(this),
            hack: this.cmdHack.bind(this),
            coffee: this.cmdCoffee.bind(this),
            // Exemple de commande qui ne fait "rien" mais lance un jeu
            rien: this.cmdRien.bind(this)
        };

        this.init();
    }

    init() {
        this.buildTerminal();
        this.attachEventListeners();
        this.printWelcome();
        this.focusInput();
    }

    getDefaultWelcome() {
        return `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     ██████╗ ███████╗████████╗██████╗  ██████╗               ║
║     ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗              ║
║     ██████╔╝█████╗     ██║   ██████╔╝██║   ██║              ║
║     ██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║              ║
║     ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝              ║
║     ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝               ║
║                                                              ║
║            NUIT DE L'INFO 2025 - TERMINAL v1.0              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Bienvenue sur le terminal rétro gaming!
Tapez 'help' pour voir les commandes disponibles.
`;
    }

    buildTerminal() {
        this.container.innerHTML = `
            <div class="linux-terminal">
                <div class="terminal-header">
                    <span class="terminal-button close"></span>
                    <span class="terminal-button minimize"></span>
                    <span class="terminal-button maximize"></span>
                    <span class="terminal-title">${this.options.username}@${this.options.hostname}:${this.currentPath}</span>
                </div>
                <div class="terminal-body">
                    <div class="terminal-output" id="terminal-output"></div>
                    <div class="terminal-input-line">
                        <span class="terminal-prompt">${this.getPrompt()}</span>
                        <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>
            </div>
        `;

        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.titleBar = this.container.querySelector('.terminal-title');
    }

    getPrompt() {
        return `${this.options.username}@${this.options.hostname}:${this.currentPath}${this.options.prompt}`;
    }

    updatePrompt() {
        const promptElement = this.container.querySelector('.terminal-prompt');
        if (promptElement) {
            promptElement.textContent = this.getPrompt();
        }
        if (this.titleBar) {
            this.titleBar.textContent = `${this.options.username}@${this.options.hostname}:${this.currentPath}`;
        }
    }

    attachEventListeners() {
        // Gestion de l'entrée
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            } else if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.cmdClear();
            } else if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                this.print('^C', 'error');
                this.input.value = '';
            }
        });

        // Focus sur le terminal quand on clique dessus
        this.container.addEventListener('click', () => {
            this.focusInput();
        });

        // Boutons de la fenêtre
        const closeBtn = this.container.querySelector('.terminal-button.close');
        const minimizeBtn = this.container.querySelector('.terminal-button.minimize');
        const maximizeBtn = this.container.querySelector('.terminal-button.maximize');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.print('Fermeture du terminal...', 'warning');
                setTimeout(() => {
                    this.container.style.display = 'none';
                }, 500);
            });
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.container.querySelector('.terminal-body').style.display =
                    this.container.querySelector('.terminal-body').style.display === 'none' ? 'flex' : 'none';
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                const terminal = this.container.querySelector('.linux-terminal');
                if (terminal.style.height === '100vh') {
                    terminal.style.height = '500px';
                    terminal.style.width = '100%';
                } else {
                    terminal.style.height = '100vh';
                    terminal.style.width = '100vw';
                    terminal.style.margin = '0';
                }
            });
        }
    }

    focusInput() {
        if (this.input) {
            this.input.focus();
        }
    }

    printWelcome() {
        this.print(this.options.welcomeMessage, 'output');
    }

    print(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    printHTML(html, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = html;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    processCommand(commandLine) {
        if (!commandLine) return;

        // Afficher la commande
        this.print(`${this.getPrompt()}${commandLine}`, 'command');

        // Ajouter à l'historique
        this.commandHistory.push(commandLine);
        this.historyIndex = this.commandHistory.length;

        // Parser la commande
        const parts = commandLine.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Exécuter la commande
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.print(`bash: ${command}: command not found`, 'error');
            this.print(`Tapez 'help' pour voir les commandes disponibles`, 'warning');
        }
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down') {
            this.historyIndex++;
            if (this.historyIndex >= this.commandHistory.length) {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            } else {
                this.input.value = this.commandHistory[this.historyIndex];
            }
        }
    }

    autocomplete() {
        const input = this.input.value.toLowerCase();
        if (!input) return;

        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.print(`${this.getPrompt()}${input}`, 'command');
            this.print(matches.join('  '), 'output');
        }
    }

    // ============== COMMANDES SYSTÈME ==============

    cmdHelp(args) {
        const helpText = `
Commandes disponibles:

SYSTÈME:
  help              Affiche cette aide
  clear             Efface l'écran
  echo [texte]      Affiche du texte
  print [texte]     Affiche du texte stylisé
  ls                Liste les fichiers
  pwd               Affiche le répertoire courant
  whoami            Affiche l'utilisateur actuel
  date              Affiche la date et l'heure
  uname             Affiche les infos système
  neofetch          Affiche les infos système stylisées

FUN / JEUX:
  snake             Lance le jeu Snake
  matrix            Effet Matrix
  hack              Mode hacker
  coffee            Prépare un café ☕
  rien              Lance une surprise...

Utilisez TAB pour l'autocomplétion
Utilisez ↑↓ pour naviguer dans l'historique
Ctrl+L pour effacer l'écran
Ctrl+C pour annuler la commande
`;
        this.print(helpText, 'output');
    }

    cmdClear(args) {
        this.output.innerHTML = '';
    }

    cmdEcho(args) {
        this.print(args.join(' '), 'output');
    }

    cmdPrint(args) {
        const text = args.join(' ');
        this.print(`✨ ${text} ✨`, 'success');
    }

    cmdLs(args) {
        const files = [
            'documents/',
            'downloads/',
            'images/',
            'music/',
            'videos/',
            'readme.txt',
            'secret.dat',
            'game.exe'
        ];
        this.print(files.join('  '), 'output');
    }

    cmdPwd(args) {
        this.print(`/home/${this.options.username}/${this.currentPath.replace('~', '')}`, 'output');
    }

    cmdWhoami(args) {
        this.print(this.options.username, 'output');
    }

    cmdDate(args) {
        const now = new Date();
        this.print(now.toString(), 'output');
    }

    cmdUname(args) {
        this.print('RetroOS 8.0.0 (Linux kernel 5.15.0-retro) x86_64', 'output');
    }

    cmdNeofetch(args) {
        const neofetch = `
       _,met$$$$$gg.          ${this.options.username}@${this.options.hostname}
    ,g$$$$$$$$$$$$$$$P.       -------------------------
  ,g$$P"     """Y$$.".        OS: RetroOS 8.0.0
 ,$$P'              $$$.      Host: Nuit de l'Info 2025
',$$P       ,ggs.     $$b:    Kernel: 5.15.0-retro
 d$$'     ,$P"'   .    $$$    Uptime: ${Math.floor(performance.now() / 1000)} secs
 $$P      d$'     ,    $$P    Shell: bash 5.1.16
 $$:      $$.   -    ,d$$'    Resolution: ${window.innerWidth}x${window.innerHeight}
 $$;      Y$b._   _,d$P'      Terminal: LinuxTerminal v1.0
 Y$$.    "Y$$$$P"'            CPU: JavaScript Engine
  $$b      "-.__              GPU: Canvas2D/WebGL
   Y$$                        Memory: ${navigator.deviceMemory || '?'} GB
    Y$$.                      Theme: Retro Gaming
      $$b.
        Y$$b.
           "Y$b._
               """
`;
        this.print(neofetch, 'success');
    }

    // ============== COMMANDES FUN/JEUX ==============

    cmdSnake(args) {
        // Cacher le terminal et afficher le jeu Snake
        this.hideTerminal();

        // Créer un container temporaire pour le jeu
        const gameContainer = document.createElement('div');
        gameContainer.id = 'snake-game-temp-container';
        gameContainer.style.width = '100%';
        gameContainer.style.display = 'block';
        this.container.appendChild(gameContainer);

        // Lancer le jeu Snake
        const snakeGame = new SnakeGame('snake-game-temp-container');

        // Écouter l'événement de sortie du jeu
        const exitHandler = () => {
            // Détruire le jeu
            if (snakeGame) {
                snakeGame.destroy();
            }

            // Retirer le container du jeu
            if (gameContainer && gameContainer.parentNode) {
                gameContainer.parentNode.removeChild(gameContainer);
            }

            // Réafficher le terminal
            this.showTerminal();

            // Attendre un peu avant d'afficher le message pour éviter les problèmes de rendu
            setTimeout(() => {
                this.print('🐍 Jeu Snake terminé. Merci d\'avoir joué!', 'success');
            }, 100);

            // Retirer l'event listener
            document.removeEventListener('snakeGameExit', exitHandler);
        };

        document.addEventListener('snakeGameExit', exitHandler);
    }

    cmdMatrix(args) {
        this.print('Initializing Matrix mode...', 'success');
        const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';
        for (let i = 0; i < 10; i++) {
            let line = '';
            for (let j = 0; j < 60; j++) {
                line += chars[Math.floor(Math.random() * chars.length)];
            }
            setTimeout(() => {
                this.print(line, 'success');
            }, i * 100);
        }
        setTimeout(() => {
            this.print('Welcome to the Matrix, Neo...', 'warning');
        }, 1200);
    }

    cmdHack(args) {
        this.print('[HACKING MODE ACTIVATED]', 'error');
        const steps = [
            'Scanning network... 192.168.0.1',
            'Found 42 open ports',
            'Injecting payload...',
            'Bypassing firewall...',
            'Accessing mainframe...',
            'Downloading database...',
            '████████████████████ 100%',
            'SUCCESS: You are now a l33t h4x0r!'
        ];
        steps.forEach((step, i) => {
            setTimeout(() => {
                this.print(step, i === steps.length - 1 ? 'success' : 'warning');
            }, i * 500);
        });
    }

    cmdCoffee(args) {
        const coffee = `
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \\
        |               | | |
        |               |_| |
     ___|             |\\___/
    /    \\___________/    \\
    \\_____________________/
`;
        this.print(coffee, 'output');
        this.print('☕ Votre café est prêt! Profitez-en bien!', 'success');
    }

    cmdRien(args) {
        this.print('Vous avez trouvé la commande secrète!', 'warning');
        this.print('🎮 Lancement du mini-jeu caché...', 'success');
        this.print('', 'output');

        const game = `
╔════════════════════════════════════════╗
║                                        ║
║         🎯 JEU DU DEVINEUR 🎯         ║
║                                        ║
║  Un nombre a été choisi entre 1-100   ║
║  Vous avez trouvé : 42                 ║
║                                        ║
║  🎊 FÉLICITATIONS! C'ÉTAIT 42! 🎊     ║
║                                        ║
║  Vous gagnez 1000 points!              ║
║  Achievement Unlocked: Lucky Guess     ║
║                                        ║
╚════════════════════════════════════════╝
`;
        setTimeout(() => {
            this.print(game, 'success');
            setTimeout(() => {
                this.print('Tapez "rien" à nouveau pour rejouer!', 'output');
            }, 1000);
        }, 500);
    }

    // ============== API PUBLIQUE ==============

    /**
     * Cache le terminal (pour afficher un jeu par exemple)
     */
    hideTerminal() {
        this.container.classList.add('game-active');
    }

    /**
     * Réaffiche le terminal
     */
    showTerminal() {
        this.container.classList.remove('game-active');
        this.focusInput();
    }

    /**
     * Ajoute une commande personnalisée
     * @param {string} name - Nom de la commande
     * @param {function} handler - Fonction qui gère la commande (args) => void
     */
    addCommand(name, handler) {
        this.commands[name.toLowerCase()] = handler.bind(this);
    }

    /**
     * Supprime une commande
     * @param {string} name - Nom de la commande à supprimer
     */
    removeCommand(name) {
        delete this.commands[name.toLowerCase()];
    }

    /**
     * Exécute une commande par programmation
     * @param {string} commandLine - La commande à exécuter
     */
    execute(commandLine) {
        this.processCommand(commandLine);
    }

    /**
     * Change le répertoire courant (cosmétique)
     * @param {string} path - Le nouveau chemin
     */
    setPath(path) {
        this.currentPath = path;
        this.updatePrompt();
    }
}

// Exporter pour utilisation globale
window.LinuxTerminal = LinuxTerminal;

// NE PAS initialiser automatiquement - laissez le template gérer l'initialisation
// pour éviter les doubles initialisations
