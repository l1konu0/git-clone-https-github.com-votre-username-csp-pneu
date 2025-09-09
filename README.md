# CSP Pneu - Site Web

Site web moderne pour CSP Pneu, spécialiste des pneus depuis 1995.

## 🚀 Fonctionnalités

- **Catalogue de pneus** avec filtres avancés
- **Design épuré** avec couleurs diffuses et animations fluides
- **Interface responsive** pour tous les appareils
- **API moderne** avec Vercel Functions
- **Base de données** intégrée (PlanetScale MySQL)
- **Formulaire de contact** fonctionnel
- **Interface d'administration** pour gérer les pneus

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Backend** : Vercel Functions (Node.js)
- **Base de données** : PlanetScale (MySQL)
- **Déploiement** : Vercel
- **Design** : CSS moderne avec animations

## 📦 Installation

### Prérequis
- Node.js 18+
- Compte Vercel
- Compte PlanetScale

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/csp-pneu.git
cd csp-pneu

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🗄️ Base de données

### Structure de la table `pneus`

```sql
CREATE TABLE pneus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    modele VARCHAR(100) NOT NULL,
    dimensions VARCHAR(20) NOT NULL,
    type ENUM('été', 'hiver', '4saisons') NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Configuration PlanetScale

1. Créer un compte sur [PlanetScale](https://planetscale.com)
2. Créer une nouvelle base de données
3. Obtenir l'URL de connexion
4. Configurer les variables d'environnement dans Vercel

## 🚀 Déploiement sur Vercel

### 1. Préparer le repository

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit"

# Créer le repository sur GitHub
# Pousser le code
git remote add origin https://github.com/votre-username/csp-pneu.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. Aller sur [Vercel](https://vercel.com)
2. Importer le repository GitHub
3. Configurer les variables d'environnement :
   - `DB_HOST` : Host de votre base PlanetScale
   - `DB_USER` : Nom d'utilisateur
   - `DB_PASSWORD` : Mot de passe
   - `DB_NAME` : Nom de la base de données
4. Déployer !

### 3. Configuration des variables d'environnement

Dans Vercel Dashboard > Settings > Environment Variables :

```
DB_HOST=your-planetscale-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

## 📁 Structure du projet

```
csp-pneu/
├── api/                    # Vercel Functions
│   ├── pneus.js           # API des pneus
│   └── contact.js         # API de contact
├── assets/                # Ressources statiques
│   ├── css/
│   │   └── style.css      # Styles principaux
│   └── js/
│       ├── script.js      # Scripts généraux
│       ├── catalog.js     # Gestion du catalogue
│       └── contact.js     # Gestion du contact
├── pages/                 # Pages HTML
│   ├── catalog.html       # Page catalogue
│   ├── services.html      # Page services
│   └── contact.html       # Page contact
├── admin/                 # Interface d'administration
├── index.html             # Page d'accueil
├── package.json           # Configuration npm
├── vercel.json           # Configuration Vercel
└── README.md             # Documentation
```

## 🎨 Design

Le site utilise un design moderne avec :
- **Palette de couleurs** : Dégradés bleu-violet-rose
- **Typographie** : Inter + Roboto
- **Animations** : Transitions fluides et effets de survol
- **Responsive** : Mobile-first design
- **Glassmorphism** : Effets de transparence et flou

## 🔧 API Endpoints

### GET /api/pneus
Récupère la liste des pneus

### POST /api/pneus
Ajoute un nouveau pneu (admin)

### POST /api/contact
Envoie un message de contact

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🚀 Fonctionnalités avancées

- **Filtres en temps réel** sur le catalogue
- **Animations d'apparition** au scroll
- **Validation de formulaires** côté client
- **Gestion d'erreurs** robuste
- **Loading states** pour une meilleure UX

## 📞 Support

Pour toute question ou problème :
- Email : contact@csppneu.fr
- Téléphone : 01 23 45 67 89

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.