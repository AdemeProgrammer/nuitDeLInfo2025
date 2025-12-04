/**
 * RETRO GAMING PIXEL ART EFFECTS
 * Nuit de l'Info 2025 - Défi IUTLCO
 */

class RetroGaming {
    constructor() {
        this.isRetroMode = false;
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        this.initKonamiCode();
        this.initStarfield();
        this.initSoundEffects();
    }

    /**
     * Active ou désactive le mode rétro
     */
    toggleRetroMode() {
        this.isRetroMode = !this.isRetroMode;
        document.body.classList.toggle('retro-mode', this.isRetroMode);

        if (this.isRetroMode) {
            this.playSound('powerup');
            this.showNotification('MODE RETRO ACTIVÉ!', 'success');
        } else {
            this.playSound('powerdown');
            this.showNotification('Mode normal restauré', 'info');
        }
    }

    /**
     * Initialise le code Konami pour activer le mode rétro
     */
    initKonamiCode() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activateSecretMode();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    /**
     * Mode secret activé par le code Konami
     */
    activateSecretMode() {
        this.toggleRetroMode();
        this.createPixelExplosion();
        this.showNotification('🎮 CODE KONAMI ACTIVÉ! 🎮', 'success');
    }

    /**
     * Crée un champ d'étoiles animé
     */
    initStarfield() {
        const starfield = document.createElement('div');
        starfield.className = 'retro-stars';
        starfield.id = 'retro-starfield';

        // Créer 100 étoiles aléatoires
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'retro-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starfield.appendChild(star);
        }

        document.body.appendChild(starfield);
    }

    /**
     * Crée une explosion de pixels
     */
    createPixelExplosion() {
        const colors = ['#00ff41', '#ff00ff', '#00ffff', '#ffff00'];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 50; i++) {
            const pixel = document.createElement('div');
            pixel.style.position = 'fixed';
            pixel.style.width = '10px';
            pixel.style.height = '10px';
            pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            pixel.style.left = centerX + 'px';
            pixel.style.top = centerY + 'px';
            pixel.style.zIndex = '9999';
            pixel.style.pointerEvents = 'none';

            document.body.appendChild(pixel);

            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            this.animatePixel(pixel, centerX, centerY, vx, vy);
        }
    }

    /**
     * Anime un pixel d'explosion
     */
    animatePixel(pixel, x, y, vx, vy) {
        let frame = 0;
        const maxFrames = 60;

        const animate = () => {
            frame++;
            x += vx;
            y += vy;
            vy += 0.3; // Gravité

            pixel.style.left = x + 'px';
            pixel.style.top = y + 'px';
            pixel.style.opacity = 1 - (frame / maxFrames);

            if (frame < maxFrames && y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                pixel.remove();
            }
        };

        animate();
    }

    /**
     * Affiche une notification style rétro
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'retro-notification';
        notification.textContent = message;

        const colors = {
            success: '#00ff41',
            error: '#ff0040',
            warning: '#ffff00',
            info: '#00ffff'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 20px;
            background: #0f0f1e;
            border: 4px solid ${colors[type] || colors.info};
            color: ${colors[type] || colors.info};
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8rem;
            z-index: 10000;
            box-shadow: 0 0 20px ${colors[type] || colors.info};
            animation: slideIn 0.5s, slideOut 0.5s 2.5s;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Initialise les effets sonores (8-bit style)
     */
    initSoundEffects() {
        this.sounds = {};
        // Les sons peuvent être ajoutés via Web Audio API si nécessaire
    }

    /**
     * Joue un son
     */
    playSound(soundName) {
        // Implémentation basique avec Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (soundName === 'powerup') {
                oscillator.frequency.value = 440;
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } else if (soundName === 'powerdown') {
                oscillator.frequency.value = 220;
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }
        } catch (e) {
            console.log('Audio context not available');
        }
    }

    /**
     * Effet de typing pour le texte
     */
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }

    /**
     * Crée un effet de glitch sur un élément
     */
    glitchEffect(element, duration = 1000) {
        const originalText = element.textContent;
        element.setAttribute('data-text', originalText);
        element.classList.add('retro-glitch');

        setTimeout(() => {
            element.classList.remove('retro-glitch');
        }, duration);
    }

    /**
     * Anime une barre de progression
     */
    animateProgressBar(selector, targetPercent, duration = 1000) {
        const bar = document.querySelector(selector);
        if (!bar) return;

        let currentPercent = 0;
        const increment = targetPercent / (duration / 16);

        const animate = () => {
            currentPercent += increment;
            if (currentPercent >= targetPercent) {
                currentPercent = targetPercent;
            }

            bar.style.width = currentPercent + '%';

            if (currentPercent < targetPercent) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    /**
     * Crée des particules pixel art
     */
    createParticles(x, y, count = 10) {
        const colors = ['#00ff41', '#ff00ff', '#00ffff'];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
            `;

            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            this.animatePixel(particle, x, y, vx, vy);
        }
    }

    /**
     * Ajoute un effet hover sur les éléments
     */
    addHoverEffects(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createParticles(e.clientX, e.clientY, 5);
            });
        });
    }

    /**
     * Crée un écran "Game Over"
     */
    showGameOver(message = 'GAME OVER') {
        const gameOver = document.createElement('div');
        gameOver.className = 'retro-game-over';
        gameOver.innerHTML = `
            <h1 class="retro-blink">${message}</h1>
            <button class="retro-button" onclick="location.reload()">CONTINUE?</button>
        `;

        document.body.appendChild(gameOver);
        this.playSound('powerdown');

        setTimeout(() => {
            gameOver.remove();
        }, 5000);
    }

    /**
     * Crée un effet de console qui s'écrit ligne par ligne
     */
    createConsoleEffect(consoleElement, lines, speed = 1000) {
        let currentLine = 0;

        const addLine = () => {
            if (currentLine < lines.length) {
                const lineElement = document.createElement('div');
                lineElement.className = 'retro-console-line';
                lineElement.textContent = lines[currentLine];
                consoleElement.appendChild(lineElement);
                consoleElement.scrollTop = consoleElement.scrollHeight;
                currentLine++;
                setTimeout(addLine, speed);
            }
        };

        addLine();
    }
}

// Ajouter les animations CSS dynamiquement
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialiser automatiquement
let retroGaming;
document.addEventListener('DOMContentLoaded', () => {
    retroGaming = new RetroGaming();

    // Ajouter un bouton de toggle si il n'existe pas
    if (!document.getElementById('retro-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'retro-toggle';
        toggleButton.className = 'retro-button';
        toggleButton.textContent = '8-BIT MODE';
        toggleButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9998;
        `;
        toggleButton.addEventListener('click', () => {
            retroGaming.toggleRetroMode();
        });
        document.body.appendChild(toggleButton);
    }
});

// Exporter pour utilisation globale
window.RetroGaming = RetroGaming;
window.retroGaming = retroGaming;
