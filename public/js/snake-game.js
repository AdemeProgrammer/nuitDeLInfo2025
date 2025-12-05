/**
 * SNAKE GAME
 * Jeu Snake rétro intégré au terminal
 * Nuit de l'Info 2025
 */

class SnakeGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Configuration du jeu
        this.gridSize = 20;
        this.tileSize = 20;
        this.canvasWidth = this.gridSize * this.tileSize;
        this.canvasHeight = this.gridSize * this.tileSize;

        // État du jeu
        this.snake = [];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.food = { x: 0, y: 0 };
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        this.gameRunning = false;
        this.gameOver = false;
        this.gameLoop = null;
        this.speed = 150; // ms entre chaque mouvement

        this.init();
    }

    init() {
        this.buildUI();
        this.setupCanvas();
        this.attachEventListeners();
        this.resetGame();
    }

    buildUI() {
        this.container.innerHTML = `
            <div class="snake-game-container">
                <div class="snake-game-header">
                    <div class="snake-game-title">🐍 SNAKE GAME</div>
                    <div class="snake-game-score">
                        SCORE: <span id="current-score">0</span> |
                        HIGH: <span id="high-score">${this.highScore}</span>
                    </div>
                </div>

                <div class="snake-game-canvas-wrapper">
                    <canvas id="snakeCanvas" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>
                    <div id="game-overlay" class="snake-game-overlay" style="display: none;">
                        <h2>GAME OVER</h2>
                        <p class="final-score">SCORE: <span id="final-score">0</span></p>
                        <p>Appuyez sur ESPACE pour rejouer</p>
                    </div>
                </div>

                <div class="snake-game-controls">
                    <button class="snake-button" id="start-button">START</button>
                    <button class="snake-button" id="pause-button" disabled>PAUSE</button>
                    <button class="snake-button" id="reset-button">RESET</button>
                    <button class="snake-button danger" id="exit-button">QUITTER</button>
                </div>

                <div class="snake-game-info">
                    🎮 Utilisez les flèches <span class="key">←</span> <span class="key">↑</span> <span class="key">→</span> <span class="key">↓</span> pour jouer
                    <br>
                    Appuyez sur <span class="key">ESPACE</span> pour commencer/mettre en pause
                </div>
            </div>
        `;
    }

    setupCanvas() {
        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Références aux éléments UI
        this.currentScoreEl = document.getElementById('current-score');
        this.highScoreEl = document.getElementById('high-score');
        this.finalScoreEl = document.getElementById('final-score');
        this.overlay = document.getElementById('game-overlay');
        this.startButton = document.getElementById('start-button');
        this.pauseButton = document.getElementById('pause-button');
        this.resetButton = document.getElementById('reset-button');
        this.exitButton = document.getElementById('exit-button');
    }

    attachEventListeners() {
        // Contrôles clavier
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Boutons
        this.startButton.addEventListener('click', () => this.startGame());
        this.pauseButton.addEventListener('click', () => this.togglePause());
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.exitButton.addEventListener('click', () => this.exitGame());
    }

    handleKeyPress(e) {
        // Empêcher le scroll avec les flèches
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }

        // Start/Pause avec espace
        if (e.code === 'Space') {
            if (!this.gameRunning && !this.gameOver) {
                this.startGame();
            } else if (this.gameRunning) {
                this.togglePause();
            } else if (this.gameOver) {
                this.resetGame();
                this.startGame();
            }
            return;
        }

        // Direction du snake (ne peut pas faire demi-tour)
        if (!this.gameRunning || this.gameOver) return;

        switch (e.code) {
            case 'ArrowUp':
                if (this.direction.y === 0) {
                    this.nextDirection = { x: 0, y: -1 };
                }
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) {
                    this.nextDirection = { x: 0, y: 1 };
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) {
                    this.nextDirection = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) {
                    this.nextDirection = { x: 1, y: 0 };
                }
                break;
        }
    }

    resetGame() {
        // Arrêter le jeu en cours si nécessaire
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        // Réinitialiser le snake au centre
        const center = Math.floor(this.gridSize / 2);
        this.snake = [
            { x: center, y: center },
            { x: center - 1, y: center },
            { x: center - 2, y: center }
        ];

        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.score = 0;
        this.speed = 150; // Réinitialiser la vitesse
        this.gameOver = false;
        this.gameRunning = false;

        this.updateScore();
        this.spawnFood();
        this.draw();
        this.overlay.style.display = 'none';

        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
        this.pauseButton.textContent = 'PAUSE';
    }

    startGame() {
        if (this.gameRunning) return;

        this.gameRunning = true;
        this.startButton.disabled = true;
        this.pauseButton.disabled = false;

        this.gameLoop = setInterval(() => {
            this.update();
            this.draw();
        }, this.speed);
    }

    togglePause() {
        if (!this.gameRunning) return;

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
            this.pauseButton.textContent = 'REPRENDRE';
        } else {
            this.gameLoop = setInterval(() => {
                this.update();
                this.draw();
            }, this.speed);
            this.pauseButton.textContent = 'PAUSE';
        }
    }

    update() {
        if (this.gameOver) return;

        // Appliquer la nouvelle direction
        this.direction = { ...this.nextDirection };

        // Calculer la nouvelle position de la tête
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Vérifier les collisions avec les murs
        if (head.x < 0 || head.x >= this.gridSize ||
            head.y < 0 || head.y >= this.gridSize) {
            this.endGame();
            return;
        }

        // Vérifier les collisions avec soi-même
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.endGame();
            return;
        }

        // Ajouter la nouvelle tête
        this.snake.unshift(head);

        // Vérifier si on mange la nourriture
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.spawnFood();

            // Augmenter légèrement la vitesse
            if (this.speed > 50) {
                this.speed -= 2;
                if (this.gameLoop) {
                    clearInterval(this.gameLoop);
                    this.gameLoop = setInterval(() => {
                        this.update();
                        this.draw();
                    }, this.speed);
                }
            }
        } else {
            // Retirer la queue si on n'a pas mangé
            this.snake.pop();
        }
    }

    draw() {
        // Effacer le canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Dessiner la grille (optionnel, effet rétro)
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.gridSize; i++) {
            // Lignes verticales
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.tileSize, 0);
            this.ctx.lineTo(i * this.tileSize, this.canvasHeight);
            this.ctx.stroke();

            // Lignes horizontales
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.tileSize);
            this.ctx.lineTo(this.canvasWidth, i * this.tileSize);
            this.ctx.stroke();
        }

        // Dessiner la nourriture
        this.ctx.fillStyle = '#ff0055';
        this.ctx.shadowColor = '#ff0055';
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(
            this.food.x * this.tileSize + 2,
            this.food.y * this.tileSize + 2,
            this.tileSize - 4,
            this.tileSize - 4
        );
        this.ctx.shadowBlur = 0;

        // Dessiner le snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Tête du snake
                this.ctx.fillStyle = '#00ff41';
                this.ctx.shadowColor = '#00ff41';
                this.ctx.shadowBlur = 20;
            } else {
                // Corps du snake
                this.ctx.fillStyle = '#00cc33';
                this.ctx.shadowBlur = 10;
            }

            this.ctx.fillRect(
                segment.x * this.tileSize + 1,
                segment.y * this.tileSize + 1,
                this.tileSize - 2,
                this.tileSize - 2
            );
        });
        this.ctx.shadowBlur = 0;
    }

    spawnFood() {
        let validPosition = false;

        while (!validPosition) {
            this.food = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };

            // Vérifier que la nourriture n'apparaît pas sur le snake
            validPosition = !this.snake.some(
                segment => segment.x === this.food.x && segment.y === this.food.y
            );
        }
    }

    updateScore() {
        this.currentScoreEl.textContent = this.score;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreEl.textContent = this.highScore;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
    }

    endGame() {
        this.gameOver = true;
        this.gameRunning = false;

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        this.finalScoreEl.textContent = this.score;
        this.overlay.style.display = 'block';

        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
        this.pauseButton.textContent = 'PAUSE';
    }

    exitGame() {
        // Arrêter le jeu
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        // Déclencher un événement personnalisé pour que le terminal puisse réagir
        const event = new CustomEvent('snakeGameExit');
        document.dispatchEvent(event);
    }

    destroy() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
        // Retirer les event listeners si nécessaire
        // (Pour une vraie app, il faudrait stocker les références et les nettoyer)
    }
}

// Exporter pour utilisation globale
window.SnakeGame = SnakeGame;
