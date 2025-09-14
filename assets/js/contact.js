// Gestion du formulaire de contact
class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupForm();
            this.handleUrlParams();
        }
    }

    setupForm() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    handleUrlParams() {
        // Récupérer l'ID du pneu depuis l'URL si présent
        const urlParams = new URLSearchParams(window.location.search);
        const pneuId = urlParams.get('pneu');
        
        if (pneuId) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Bonjour,\n\nJe suis intéressé par le pneu ID ${pneuId}.\n\nPouvez-vous me faire un devis personnalisé ?\n\nMerci.`;
            }
        }
    }

    async handleSubmit() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            // Désactiver le bouton et afficher le loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            // Récupérer les données du formulaire
            const formData = new FormData(this.form);
            const data = {
                nom: formData.get('nom'),
                email: formData.get('email'),
                telephone: formData.get('telephone'),
                sujet: formData.get('sujet'),
                message: formData.get('message'),
                pneuId: new URLSearchParams(window.location.search).get('pneu')
            };

            // Envoyer les données à l'API Supabase
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showSuccess(result.message);
                this.form.reset();
            } else {
                this.showError(result.error || 'Erreur lors de l\'envoi du message');
            }

        } catch (error) {
            console.error('Erreur:', error);
            this.showError('Erreur de connexion. Veuillez réessayer.');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showSuccess(message) {
        this.showAlert(message, 'success');
    }

    showError(message) {
        this.showAlert(message, 'error');
    }

    showAlert(message, type) {
        // Supprimer les alertes existantes
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Créer la nouvelle alerte
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        // Insérer l'alerte avant le formulaire
        this.form.parentNode.insertBefore(alert, this.form);

        // Supprimer l'alerte après 5 secondes
        setTimeout(() => {
            alert.remove();
        }, 5000);

        // Scroll vers l'alerte
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialiser le gestionnaire de contact
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('contact.html')) {
        new ContactManager();
    }
});
