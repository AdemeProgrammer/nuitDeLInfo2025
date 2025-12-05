/**
 * Projet Nuit de l'Info — 2025
 * Ce programme est publié sous licence GNU AGPLv3.
 * Vous pouvez obtenir une copie de la licence à :
 * https://www.gnu.org/licenses/agpl-3.0.html
 *
 * VIRUS POPUP - Expérience éducative sur la cybersécurité
 */

class VirusGame {
    constructor(options) {
        this.totalViruses = options.totalViruses || 6;
        this.container = options.container;
        this.preventionMessage = options.preventionMessage;
        this.autoStart = options.autoStart || false;

        this.activeViruses = [];
        this.closedViruses = 0;
        this.gameActive = false;

        this.virusMessages = [
            {
                title: "🎁 FÉLICITATIONS!",
                body: "Vous avez gagné un iPhone 15 Pro Max! Cliquez ici pour réclamer votre prix MAINTENANT!"
            },
            {
                title: "⚠️ ALERTE SÉCURITÉ",
                body: "Votre ordinateur est infecté par 127 virus! Téléchargez notre antivirus GRATUIT maintenant!"
            },
            {
                title: "💰 ARGENT FACILE",
                body: "Gagnez 5000€ par semaine en travaillant depuis chez vous! Aucune expérience requise!"
            },
            {
                title: "🔒 COMPTE BLOQUÉ",
                body: "Votre compte bancaire a été suspendu. Cliquez ici pour le réactiver immédiatement!"
            },
            {
                title: "📧 MESSAGE URGENT",
                body: "Vous avez reçu un message important de votre banque. Confirmez vos identifiants MAINTENANT!"
            },
            {
                title: "🎮 JEUX GRATUITS",
                body: "Téléchargez GTA 6 GRATUITEMENT! Version complète sans virus! Offre limitée!"
            },
            {
                title: "👑 OFFRE EXCLUSIVE",
                body: "Devenez riche rapidement avec cette méthode secrète! Seulement 3 places restantes!"
            },
            {
                title: "⏰ OFFRE LIMITÉE",
                body: "Il ne reste que 2 minutes pour profiter de cette offre incroyable! CLIQUEZ VITE!"
            },
            {
                title: "🏆 TIRAGE AU SORT",
                body: "Vous êtes le 1000ème visiteur! Vous avez gagné une Tesla Model S! Réclamez votre prix!"
            },
            {
                title: "📱 MISE À JOUR CRITIQUE",
                body: "Votre système nécessite une mise à jour urgente. Installez maintenant ou risquez de perdre vos données!"
            },
            {
                title: "💳 REMBOURSEMENT",
                body: "Vous avez droit à un remboursement de 450€. Cliquez pour le recevoir avant expiration!"
            },
            {
                title: "📦 COLIS EN ATTENTE",
                body: "Un colis est en attente. Payez 2€ de frais de douane pour le recevoir aujourd'hui!"
            }
        ];

        this.init();
    }

    init() {
        if (this.autoStart) {
            // Petit délai pour laisser la page se charger
            setTimeout(() => {
                this.startGame();
            }, 1000);
        }
    }

    startGame() {
        this.gameActive = true;
        this.closedViruses = 0;
        this.activeViruses = [];
        this.container.innerHTML = '';
        this.preventionMessage.style.display = 'none';

        // Créer tous les virus avec un délai progressif pour l'effet de surprise
        for (let i = 0; i < this.totalViruses; i++) {
            setTimeout(() => {
                this.createVirus();
            }, i * 400); // Apparition toutes les 0.4 secondes
        }
    }

    createVirus() {
        if (!this.gameActive) return;

        const virus = document.createElement('div');
        virus.className = 'virus-popup';

        // Position aléatoire sur l'écran
        const maxX = Math.max(100, window.innerWidth - 320);
        const maxY = Math.max(100, window.innerHeight - 250);
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        virus.style.left = x + 'px';
        virus.style.top = y + 'px';

        // Sélectionner un message aléatoire
        const message = this.virusMessages[Math.floor(Math.random() * this.virusMessages.length)];

        virus.innerHTML = `
            <div class="virus-popup-header">
                <span>${message.title}</span>
                <button class="virus-popup-close">X</button>
            </div>
            <div class="virus-popup-body">
                ${message.body}
            </div>
        `;

        this.container.appendChild(virus);
        this.activeViruses.push(virus);

        // Event listener pour fermer le virus
        const closeBtn = virus.querySelector('.virus-popup-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeVirus(virus);
        });

        // Optionnel: faire bouger le virus aléatoirement
        // this.moveVirus(virus);
    }

    moveVirus(virus) {
        if (!this.gameActive) return;

        const moveInterval = setInterval(() => {
            if (!virus.parentElement || !this.gameActive) {
                clearInterval(moveInterval);
                return;
            }

            const currentX = parseFloat(virus.style.left);
            const currentY = parseFloat(virus.style.top);

            // Mouvement aléatoire
            const deltaX = (Math.random() - 0.5) * 150;
            const deltaY = (Math.random() - 0.5) * 150;

            let newX = currentX + deltaX;
            let newY = currentY + deltaY;

            // Limites de l'écran
            const maxX = window.innerWidth - 320;
            const maxY = window.innerHeight - 250;

            newX = Math.max(0, Math.min(maxX, newX));
            newY = Math.max(0, Math.min(maxY, newY));

            virus.style.left = newX + 'px';
            virus.style.top = newY + 'px';

        }, 3000 + Math.random() * 2000); // Mouvement toutes les 3-5 secondes
    }

    closeVirus(virus) {
        virus.classList.add('closing');

        setTimeout(() => {
            virus.remove();
            this.closedViruses++;

            const index = this.activeViruses.indexOf(virus);
            if (index > -1) {
                this.activeViruses.splice(index, 1);
            }

            // Vérifier si tous les virus sont fermés
            if (this.closedViruses >= this.totalViruses) {
                this.showPreventionMessage();
            }
        }, 500);
    }

    showPreventionMessage() {
        this.gameActive = false;

        // Petit délai avant d'afficher le message
        setTimeout(() => {
            this.preventionMessage.style.display = 'block';

            // Scroll vers le message
            this.preventionMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            console.log('✅ Tous les pop-ups ont été fermés! Message de prévention affiché.');
        }, 500);
    }
}

// Rendre la classe disponible globalement
window.VirusGame = VirusGame;
