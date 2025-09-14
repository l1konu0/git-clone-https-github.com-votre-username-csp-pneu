// ========================================
// SYSTÈME D'AUTHENTIFICATION SUPABASE
// ========================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    async init() {
        // Vérifier si l'utilisateur est déjà connecté
        await this.checkAuthState();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Écouter les changements d'état d'authentification
        window.addEventListener('authStateChanged', (event) => {
            this.updateUI(event.detail.user);
        });
    }

    async checkAuthState() {
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                const response = await fetch('/api/auth/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ token })
                });

                if (response.ok) {
                    const data = await response.json();
                    this.currentUser = data.user;
                    this.updateUI(this.currentUser);
                } else {
                    localStorage.removeItem('auth_token');
                }
            }
        } catch (error) {
            console.error('Erreur vérification auth:', error);
            localStorage.removeItem('auth_token');
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('auth_token', data.token);
                this.currentUser = data.user;
                this.updateUI(this.currentUser);
                this.showNotification('Connexion réussie !', 'success');
                return true;
            } else {
                this.showNotification(data.error || 'Erreur de connexion', 'error');
                return false;
            }
        } catch (error) {
            console.error('Erreur login:', error);
            this.showNotification('Erreur de connexion', 'error');
            return false;
        }
    }

    async logout() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            localStorage.removeItem('auth_token');
            this.currentUser = null;
            this.updateUI(null);
            this.showNotification('Déconnexion réussie', 'info');
        } catch (error) {
            console.error('Erreur logout:', error);
            this.showNotification('Erreur de déconnexion', 'error');
        }
    }

    updateUI(user) {
        const loginBtn = document.querySelector('.btn-login');
        const userMenu = document.getElementById('user-menu');

        if (user) {
            // Utilisateur connecté
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-user"></i>
                    ${user.name}
                `;
                loginBtn.onclick = () => this.showUserMenu();
            }

            // Créer le menu utilisateur s'il n'existe pas
            this.createUserMenu();
        } else {
            // Utilisateur non connecté
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-sign-in-alt"></i>
                    Connexion
                `;
                loginBtn.onclick = () => this.showLoginModal();
            }

            // Supprimer le menu utilisateur
            if (userMenu) {
                userMenu.remove();
            }
        }
    }

    createUserMenu() {
        // Supprimer l'ancien menu s'il existe
        const existingMenu = document.getElementById('user-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const userMenu = document.createElement('div');
        userMenu.id = 'user-menu';
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-menu-header">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <h4>${this.currentUser.name}</h4>
                    <p>${this.currentUser.email}</p>
                </div>
            </div>
            <div class="user-menu-actions">
                <button onclick="authSystem.showMyOrders()" class="menu-action">
                    <i class="fas fa-shopping-bag"></i>
                    Mes commandes
                </button>
                <button onclick="authSystem.showProfile()" class="menu-action">
                    <i class="fas fa-user-edit"></i>
                    Mon profil
                </button>
                <button onclick="authSystem.logout()" class="menu-action logout">
                    <i class="fas fa-sign-out-alt"></i>
                    Déconnexion
                </button>
            </div>
        `;

        // Positionner le menu
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) {
            loginBtn.style.position = 'relative';
            loginBtn.appendChild(userMenu);
        }
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'loginModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Connexion</h2>
                    <button class="close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Mot de passe</label>
                            <input type="password" id="loginPassword" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-sign-in-alt"></i>
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Gérer la soumission du formulaire
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');

            const success = await this.login(email, password);
            if (success) {
                modal.remove();
            }
        });
    }

    showUserMenu() {
        const userMenu = document.getElementById('user-menu');
        if (userMenu) {
            userMenu.classList.toggle('active');
        }
    }

    async showMyOrders() {
        try {
            const response = await fetch('/api/commandes', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.ok) {
                const orders = await response.json();
                this.displayOrdersModal(orders);
            } else {
                this.showNotification('Erreur lors du chargement des commandes', 'error');
            }
        } catch (error) {
            console.error('Erreur chargement commandes:', error);
            this.showNotification('Erreur de connexion', 'error');
        }
    }

    displayOrdersModal(orders) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'ordersModal';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h2>Mes commandes</h2>
                    <button class="close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    ${orders.length === 0 ? 
                        '<div class="no-orders"><i class="fas fa-shopping-bag"></i><p>Aucune commande trouvée</p></div>' :
                        orders.map(order => `
                            <div class="order-card">
                                <div class="order-header">
                                    <h3>Commande #${order.id}</h3>
                                    <span class="order-status status-${order.statut}">${order.statut}</span>
                                </div>
                                <div class="order-details">
                                    <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Total:</strong> ${order.total.toFixed(2)}€</p>
                                    <p><strong>Adresse:</strong> ${order.adresse || 'Non renseignée'}</p>
                                </div>
                                <div class="order-items">
                                    <h4>Articles:</h4>
                                    ${order.commande_details ? order.commande_details.map(detail => `
                                        <div class="order-item">
                                            <span>${detail.pneus ? detail.pneus.marque + ' ' + detail.pneus.modele : 'Pneu ID: ' + detail.pneu_id}</span>
                                            <span>${detail.dimensions || ''}</span>
                                            <span>Qty: ${detail.quantite}</span>
                                            <span>${detail.prix_unitaire.toFixed(2)}€</span>
                                        </div>
                                    `).join('') : '<p>Détails non disponibles</p>'}
                                </div>
                                <button onclick="authSystem.showOrderDetails(${order.id})" class="btn btn-secondary">
                                    Voir les détails
                                </button>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    async showOrderDetails(orderId) {
        try {
            const response = await fetch(`/api/commandes/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            if (response.ok) {
                const order = await response.json();
                this.displayOrderDetailsModal(order);
            } else {
                this.showNotification('Erreur lors du chargement des détails', 'error');
            }
        } catch (error) {
            console.error('Erreur chargement détails:', error);
            this.showNotification('Erreur de connexion', 'error');
        }
    }

    displayOrderDetailsModal(order) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'orderDetailsModal';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h2>Détails de la commande #${order.id}</h2>
                    <button class="close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-info">
                        <div class="info-section">
                            <h3>Informations client</h3>
                            <p><strong>Nom:</strong> ${order.nom}</p>
                            <p><strong>Email:</strong> ${order.email}</p>
                            <p><strong>Téléphone:</strong> ${order.telephone || 'Non renseigné'}</p>
                            <p><strong>Adresse:</strong> ${order.adresse || 'Non renseignée'}</p>
                        </div>
                        <div class="info-section">
                            <h3>Informations commande</h3>
                            <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString('fr-FR')}</p>
                            <p><strong>Statut:</strong> <span class="status-${order.statut}">${order.statut}</span></p>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}€</p>
                        </div>
                    </div>
                    <div class="order-items-details">
                        <h3>Articles commandés</h3>
                        ${order.commande_details ? order.commande_details.map(detail => `
                            <div class="order-item-detail">
                                <div class="item-info">
                                    <h4>${detail.pneus ? detail.pneus.marque + ' ' + detail.pneus.modele : 'Pneu ID: ' + detail.pneu_id}</h4>
                                    <p>${detail.pneus ? detail.pneus.dimensions : ''}</p>
                                </div>
                                <div class="item-quantity">
                                    <span>Quantité: ${detail.quantite}</span>
                                </div>
                                <div class="item-price">
                                    <span>Prix unitaire: ${detail.prix_unitaire.toFixed(2)}€</span>
                                    <span class="total">Total: ${(detail.quantite * detail.prix_unitaire).toFixed(2)}€</span>
                                </div>
                            </div>
                        `).join('') : '<p>Détails non disponibles</p>'}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    showProfile() {
        this.showNotification('Fonctionnalité en développement', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Instance globale
window.authSystem = new AuthSystem();

// Fonction globale pour ouvrir la connexion (compatible avec l'ancien code)
function openLogin() {
    window.authSystem.showLoginModal();
}
