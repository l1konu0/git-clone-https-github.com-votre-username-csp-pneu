// Gestionnaire d'authentification côté client
class AuthManager {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = null;
    this.init();
  }

  init() {
    // Vérifier si l'utilisateur est déjà connecté
    if (this.token) {
      this.verifyToken();
    }
  }

  // Fonction de connexion
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('user_data', JSON.stringify(this.user));
        
        // Mettre à jour l'interface
        this.updateUI();
        
        return { success: true, user: this.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  }

  // Fonction de déconnexion
  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      // Nettoyer les données locales
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Mettre à jour l'interface
      this.updateUI();
    }
  }

  // Vérifier le token
  async verifyToken() {
    if (!this.token) return false;

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }
      });

      const data = await response.json();

      if (data.success) {
        this.user = data.user;
        localStorage.setItem('user_data', JSON.stringify(this.user));
        this.updateUI();
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
      this.logout();
      return false;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn() {
    return this.token && this.user;
  }

  // Obtenir les données de l'utilisateur
  getUser() {
    return this.user;
  }

  // Obtenir le token
  getToken() {
    return this.token;
  }

  // Mettre à jour l'interface utilisateur
  updateUI() {
    const loginButton = document.querySelector('.btn-login');
    const userInfo = document.querySelector('.user-info');
    
    if (this.isLoggedIn()) {
      // Utilisateur connecté
      if (loginButton) {
        loginButton.innerHTML = `
          <i class="fas fa-user"></i>
          ${this.user.name}
        `;
        loginButton.onclick = () => this.showUserMenu();
      }
      
      // Afficher les informations utilisateur
      if (userInfo) {
        userInfo.innerHTML = `
          <div class="user-menu">
            <div class="user-details">
              <strong>${this.user.name}</strong>
              <small>${this.user.email}</small>
            </div>
            <button onclick="authManager.logout()" class="btn-logout">
              <i class="fas fa-sign-out-alt"></i>
              Déconnexion
            </button>
          </div>
        `;
      }
    } else {
      // Utilisateur non connecté
      if (loginButton) {
        loginButton.innerHTML = `
          <i class="fas fa-sign-in-alt"></i>
          Connexion
        `;
        loginButton.onclick = () => this.showLoginModal();
      }
      
      if (userInfo) {
        userInfo.innerHTML = '';
      }
    }
  }

  // Afficher la modal de connexion
  showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Connexion</h2>
          <button class="close-btn" onclick="this.closest('.login-modal').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form id="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i>
            Se connecter
          </button>
        </form>
        <div class="demo-credentials">
          <h4>Comptes de démonstration :</h4>
          <p><strong>Admin:</strong> admin@csppneu.fr / motdepasse123</p>
          <p><strong>Client:</strong> client@example.com / motdepasse123</p>
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
      
      const result = await this.login(email, password);
      
      if (result.success) {
        modal.remove();
        alert('Connexion réussie !');
      } else {
        alert('Erreur: ' + result.error);
      }
    });
  }

  // Afficher le menu utilisateur
  showUserMenu() {
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
      userInfo.style.display = userInfo.style.display === 'block' ? 'none' : 'block';
    }
  }
}

// Initialiser le gestionnaire d'authentification
const authManager = new AuthManager();

// Fonctions globales pour compatibilité
function openLogin() {
  authManager.showLoginModal();
}

function openAI() {
  alert('Assistant IA en cours de développement. Intégration OpenAI prévue.');
}

function openCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cartItems.length === 0) {
    alert('Votre panier est vide. Parcourez notre catalogue pour ajouter des pneus !');
  } else {
    alert(`Votre panier contient ${cartItems.length} article(s).\n\nFonctionnalité de commande en cours de développement.`);
  }
}
