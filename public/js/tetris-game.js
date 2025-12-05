/**
 * TETRIS GAME
 * Jeu Tetris rétro intégré au terminal
 * Nuit de l'Info 2025
 */

class TetrisGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Configuration du jeu
        this.cols = 10;
        this.rows = 20;
        this.blockSize = 25;
        this.canvasWidth = this.cols * this.blockSize;
        this.canvasHeight = this.rows * this.blockSize;

        // Pièces Tetris (tetrominos)
        this.pieces = {
            'I': [[1, 1, 1, 1]],
            'O': [[1, 1], [1, 1]],
            'T': [[0, 1, 0], [1, 1, 1]],
            'S': [[0, 1, 1], [1, 1, 0]],
            'Z': [[1, 1, 0], [0, 1, 1]],
            'J': [[1, 0, 0], [1, 1, 1]],
            'L': [[0, 0, 1], [1, 1, 1]]
        };

        // Couleurs des pièces (palette terminal)
        this.colors = {
            'I': '#00ffff',  // cyan
            'O': '#ffff00',  // jaune
            'T': '#ff00ff',  // magenta
            'S': '#00ff41',  // vert terminal
            'Z': '#ff0055',  // rouge/rose
            'J': '#00ffff',  // cyan (variant)
            'L': '#ffff00'   // jaune (variant)
        };

        // État du jeu
        this.board = [];
        this.currentPiece = null;
        this.currentX = 0;
        this.currentY = 0;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameRunning = false;
        this.gameOver = false;
        this.gameLoop = null;
        this.dropSpeed = 800; // ms

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
            <div class="tetris-game-container">
                <div class="tetris-game-header">
                    <div class="tetris-game-title">◼ TETRIS ◼</div>
                    <div class="tetris-game-stats">
                        <div class="tetris-stat">
                            <span class="tetris-stat-label">SCORE</span>
                            <span class="tetris-stat-value" id="tetris-score">0</span>
                        </div>
                        <div class="tetris-stat">
                            <span class="tetris-stat-label">LIGNES</span>
                            <span class="tetris-stat-value" id="tetris-lines">0</span>
                        </div>
                        <div class="tetris-stat">
                            <span class="tetris-stat-label">NIVEAU</span>
                            <span class="tetris-stat-value" id="tetris-level">1</span>
                        </div>
                    </div>
                </div>

                <div class="tetris-game-content">
                    <div class="tetris-game-main">
                        <canvas id="tetrisCanvas" width="${this.canvasWidth}" height="${this.canvasHeight}"></canvas>
                        <div id="tetris-overlay" class="tetris-game-overlay" style="display: none;">
                            <h2>GAME OVER</h2>
                            <div class="final-stats">
                                <div class="stat-line">Score: <span id="final-score">0</span></div>
                                <div class="stat-line">Lignes: <span id="final-lines">0</span></div>
                                <div class="stat-line">Niveau: <span id="final-level">1</span></div>
                            </div>
                            <p>Appuyez sur ESPACE pour rejouer</p>
                        </div>
                    </div>

                    <div class="tetris-game-sidebar">
                        <div class="tetris-next-piece">
                            <h3>Suivant</h3>
                            <canvas id="nextPieceCanvas" width="100" height="100"></canvas>
                        </div>
                    </div>
                </div>

                <div class="tetris-game-controls">
                    <button class="tetris-button" id="tetris-start-button">START</button>
                    <button class="tetris-button" id="tetris-pause-button" disabled>PAUSE</button>
                    <button class="tetris-button" id="tetris-reset-button">RESET</button>
                    <button class="tetris-button danger" id="tetris-exit-button">QUITTER</button>
                </div>

                <div class="tetris-game-info">
                    🎮 Contrôles: <span class="key">←</span> <span class="key">→</span> Déplacer
                    | <span class="key">↓</span> Descendre rapide
                    | <span class="key">↑</span> ou <span class="key">ESPACE</span> Rotation
                    <br>
                    Appuyez sur <span class="key">ESPACE</span> pour commencer/pause
                </div>
            </div>
        `;
    }

    setupCanvas() {
        this.canvas = document.getElementById('tetrisCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextPieceCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');

        // Références aux éléments UI
        this.scoreEl = document.getElementById('tetris-score');
        this.linesEl = document.getElementById('tetris-lines');
        this.levelEl = document.getElementById('tetris-level');
        this.overlay = document.getElementById('tetris-overlay');
        this.finalScoreEl = document.getElementById('final-score');
        this.finalLinesEl = document.getElementById('final-lines');
        this.finalLevelEl = document.getElementById('final-level');
        this.startButton = document.getElementById('tetris-start-button');
        this.pauseButton = document.getElementById('tetris-pause-button');
        this.resetButton = document.getElementById('tetris-reset-button');
        this.exitButton = document.getElementById('tetris-exit-button');
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
        if (!this.gameRunning || this.gameOver) {
            if (e.code === 'Space' && this.gameOver) {
                e.preventDefault();
                this.resetGame();
                this.startGame();
            } else if (e.code === 'Space' && !this.gameRunning) {
                e.preventDefault();
                this.startGame();
            }
            return;
        }

        // Empêcher le scroll avec les flèches
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }

        switch (e.code) {
            case 'ArrowLeft':
                this.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                this.movePiece(1, 0);
                break;
            case 'ArrowDown':
                this.movePiece(0, 1);
                break;
            case 'ArrowUp':
            case 'Space':
                this.rotatePiece();
                break;
        }
    }

    resetGame() {
        // Arrêter le jeu en cours
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        // Réinitialiser le plateau
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));

        // Réinitialiser les stats
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropSpeed = 800;
        this.gameOver = false;
        this.gameRunning = false;

        // Générer les pièces
        this.nextPiece = this.getRandomPiece();
        this.spawnPiece();

        this.updateStats();
        this.draw();
        this.drawNextPiece();
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
        }, this.dropSpeed);
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
            }, this.dropSpeed);
            this.pauseButton.textContent = 'PAUSE';
        }
    }

    update() {
        if (this.gameOver) return;

        // Déplacer la pièce vers le bas
        if (!this.movePiece(0, 1)) {
            // La pièce ne peut plus descendre
            this.lockPiece();
            this.clearLines();
            this.spawnPiece();

            // Vérifier game over
            if (this.checkCollision(this.currentPiece, this.currentX, this.currentY)) {
                this.endGame();
            }
        }

        this.draw();
    }

    getRandomPiece() {
        const pieces = Object.keys(this.pieces);
        const randomIndex = Math.floor(Math.random() * pieces.length);
        return pieces[randomIndex];
    }

    spawnPiece() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.getRandomPiece();
        this.currentX = Math.floor(this.cols / 2) - 1;
        this.currentY = 0;

        this.drawNextPiece();
    }

    movePiece(dx, dy) {
        const newX = this.currentX + dx;
        const newY = this.currentY + dy;

        if (!this.checkCollision(this.currentPiece, newX, newY)) {
            this.currentX = newX;
            this.currentY = newY;
            this.draw();
            return true;
        }
        return false;
    }

    rotatePiece() {
        const rotated = this.rotate(this.pieces[this.currentPiece]);

        if (!this.checkCollision(this.currentPiece, this.currentX, this.currentY, rotated)) {
            this.pieces[this.currentPiece] = rotated;
            this.draw();
        }
    }

    rotate(matrix) {
        const N = matrix.length;
        const M = matrix[0].length;
        const rotated = Array(M).fill().map(() => Array(N).fill(0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                rotated[j][N - 1 - i] = matrix[i][j];
            }
        }

        return rotated;
    }

    checkCollision(pieceType, x, y, piece = null) {
        const matrix = piece || this.pieces[pieceType];

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]) {
                    const newX = x + col;
                    const newY = y + row;

                    // Vérifier les limites
                    if (newX < 0 || newX >= this.cols || newY >= this.rows) {
                        return true;
                    }

                    // Vérifier collision avec le plateau
                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    lockPiece() {
        const matrix = this.pieces[this.currentPiece];

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]) {
                    const y = this.currentY + row;
                    const x = this.currentX + col;

                    if (y >= 0) {
                        this.board[y][x] = this.currentPiece;
                    }
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;

        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                // Ligne complète
                this.board.splice(row, 1);
                this.board.unshift(Array(this.cols).fill(0));
                linesCleared++;
                row++; // Revérifier la même ligne
            }
        }

        if (linesCleared > 0) {
            this.lines += linesCleared;

            // Calcul du score
            const points = [0, 40, 100, 300, 1200];
            this.score += points[linesCleared] * this.level;

            // Augmenter le niveau tous les 10 lignes
            const newLevel = Math.floor(this.lines / 10) + 1;
            if (newLevel > this.level) {
                this.level = newLevel;
                this.dropSpeed = Math.max(100, 800 - (this.level - 1) * 50);

                // Redémarrer le gameLoop avec la nouvelle vitesse
                if (this.gameLoop) {
                    clearInterval(this.gameLoop);
                    this.gameLoop = setInterval(() => {
                        this.update();
                    }, this.dropSpeed);
                }
            }

            this.updateStats();
        }
    }

    updateStats() {
        this.scoreEl.textContent = this.score;
        this.linesEl.textContent = this.lines;
        this.levelEl.textContent = this.level;
    }

    draw() {
        // Effacer le canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Dessiner la grille
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.cols; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.blockSize, 0);
            this.ctx.lineTo(i * this.blockSize, this.canvasHeight);
            this.ctx.stroke();
        }
        for (let i = 0; i <= this.rows; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.blockSize);
            this.ctx.lineTo(this.canvasWidth, i * this.blockSize);
            this.ctx.stroke();
        }

        // Dessiner le plateau
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col]) {
                    this.drawBlock(col, row, this.colors[this.board[row][col]]);
                }
            }
        }

        // Dessiner la pièce actuelle
        if (this.currentPiece) {
            const matrix = this.pieces[this.currentPiece];
            for (let row = 0; row < matrix.length; row++) {
                for (let col = 0; col < matrix[row].length; col++) {
                    if (matrix[row][col]) {
                        this.drawBlock(
                            this.currentX + col,
                            this.currentY + row,
                            this.colors[this.currentPiece]
                        );
                    }
                }
            }
        }
    }

    drawBlock(x, y, color) {
        const px = x * this.blockSize;
        const py = y * this.blockSize;

        // Bloc principal
        this.ctx.fillStyle = color;
        this.ctx.fillRect(px + 1, py + 1, this.blockSize - 2, this.blockSize - 2);

        // Effet 3D
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(px + 1, py + 1, this.blockSize - 2, 3);
        this.ctx.fillRect(px + 1, py + 1, 3, this.blockSize - 2);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(px + 1, py + this.blockSize - 4, this.blockSize - 2, 3);
        this.ctx.fillRect(px + this.blockSize - 4, py + 1, 3, this.blockSize - 2);

        // Lueur
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 5;
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(px + 1, py + 1, this.blockSize - 2, this.blockSize - 2);
        this.ctx.shadowBlur = 0;
    }

    drawNextPiece() {
        // Effacer le canvas
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, 100, 100);

        if (!this.nextPiece) return;

        const matrix = this.pieces[this.nextPiece];
        const blockSize = 20;
        const offsetX = (100 - matrix[0].length * blockSize) / 2;
        const offsetY = (100 - matrix.length * blockSize) / 2;

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]) {
                    const x = offsetX + col * blockSize;
                    const y = offsetY + row * blockSize;

                    this.nextCtx.fillStyle = this.colors[this.nextPiece];
                    this.nextCtx.fillRect(x + 1, y + 1, blockSize - 2, blockSize - 2);

                    this.nextCtx.shadowColor = this.colors[this.nextPiece];
                    this.nextCtx.shadowBlur = 5;
                    this.nextCtx.strokeStyle = this.colors[this.nextPiece];
                    this.nextCtx.strokeRect(x + 1, y + 1, blockSize - 2, blockSize - 2);
                    this.nextCtx.shadowBlur = 0;
                }
            }
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
        this.finalLinesEl.textContent = this.lines;
        this.finalLevelEl.textContent = this.level;
        this.overlay.style.display = 'block';

        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
        this.pauseButton.textContent = 'PAUSE';
    }

    exitGame() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }

        const event = new CustomEvent('tetrisGameExit');
        document.dispatchEvent(event);
    }

    destroy() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
    }
}

window.TetrisGame = TetrisGame;
