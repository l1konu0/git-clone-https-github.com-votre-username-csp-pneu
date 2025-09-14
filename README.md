# CSP Pneu - Site Web

Site web moderne pour CSP Pneu, spécialiste des pneus depuis 1995, avec gestion de stock en temps réel.

## 🚀 Fonctionnalités

- **Catalogue de pneus** avec filtres avancés et stock en temps réel
- **Système de commande** complet avec panier et validation
- **Formulaire de contact** avec sauvegarde en base de données
- **Interface d'administration** pour la gestion des pneus
- **Gestion d'inventaire** en temps réel avec Supabase
- **API REST** complète pour toutes les opérations
- **Design épuré** avec couleurs diffuses et animations fluides
- **Interface responsive** pour tous les appareils

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+, TypeScript
- **Backend** : Vercel Functions (Node.js + TypeScript)
- **Base de données** : Supabase (PostgreSQL)
- **Déploiement** : Vercel
- **Design** : CSS moderne avec animations

## 📦 Installation

### Prérequis
- Node.js 18+
- Compte Supabase
- Compte Vercel

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/csp-pneu.git
cd csp-pneu

# Installer les dépendances
npm install

# Configurer Supabase (voir SUPABASE_SETUP.md)
# Créer le fichier .env avec vos clés Supabase

# Démarrer le serveur de développement
npm run dev
```

## 🗄️ Base de données Supabase

### Configuration
1. Suivre le guide dans `SUPABASE_SETUP.md`
2. Créer un projet Supabase
3. Exécuter le script SQL dans `config/supabase_setup.sql`

### Variables d'environnement requises
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Structure des tables
- **pneus** : Catalogue des pneus avec stock
- **commandes** : Commandes clients
- **commande_details** : Détails des commandes
- **messages** : Messages de contact
- **admins** : Administrateurs

## 🔧 API Endpoints

### Pneus
- `GET /api/pneus` - Récupérer tous les pneus
- `POST /api/pneus` - Ajouter un pneu
- `PUT /api/pneus` - Modifier un pneu
- `DELETE /api/pneus?id={id}` - Supprimer un pneu

### Commandes
- `GET /api/commandes` - Récupérer toutes les commandes
- `POST /api/commandes` - Créer une commande

### Messages
- `GET /api/messages` - Récupérer tous les messages
- `POST /api/messages` - Envoyer un message
- `PUT /api/messages` - Marquer un message comme lu
- `DELETE /api/messages?id={id}` - Supprimer un message

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
3. Configurer les variables d'environnement Supabase
4. Déployer !

### 3. Configuration des variables d'environnement

Dans Vercel Dashboard > Settings > Environment Variables :

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📁 Structure du projet

```
csp-pneu/
├── api/                    # Vercel Functions (TypeScript)
│   ├── pneus.ts           # API des pneus
│   ├── commandes.ts       # API des commandes
│   ├── messages.ts        # API des messages
│   └── auth/              # API d'authentification
├── lib/                   # Bibliothèques partagées
│   └── supabase.ts        # Configuration Supabase
├── types/                 # Déclarations TypeScript
│   └── global.d.ts        # Types globaux
├── config/                # Configuration
│   ├── supabase_setup.sql # Script de création de la DB
│   └── database_setup.sql # Ancien script MySQL
├── assets/                # Ressources statiques
│   ├── css/
│   │   └── style.css      # Styles principaux
│   └── js/
│       ├── script.js      # Scripts généraux
│       ├── catalog.js     # Gestion du catalogue
│       ├── order-system.js # Système de commande
│       └── contact.js     # Gestion du contact
├── pages/                 # Pages HTML
│   ├── catalog.html       # Page catalogue
│   ├── services.html      # Page services
│   └── contact.html       # Page contact
├── admin/                 # Interface d'administration
├── index.html             # Page d'accueil
├── package.json           # Configuration npm
├── tsconfig.json          # Configuration TypeScript
├── vercel.json           # Configuration Vercel
├── SUPABASE_SETUP.md     # Guide Supabase
└── README.md             # Documentation
```

## 🎨 Design

Le site utilise un design moderne avec :
- **Palette de couleurs** : Jaune (#fbbf24), gris, rouge, blanc, noir
- **Typographie** : Inter + Roboto
- **Animations** : Transitions fluides et effets de survol
- **Responsive** : Mobile-first design
- **Glassmorphism** : Effets de transparence et flou

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## 🚀 Fonctionnalités avancées

- **Filtres en temps réel** sur le catalogue
- **Animations d'apparition** au scroll
- **Validation de formulaires** côté client et serveur
- **Gestion d'erreurs** robuste
- **Loading states** pour une meilleure UX
- **Stock en temps réel** avec Supabase
- **Système de commande** complet
- **Sécurité** avec Row Level Security

## 🔒 Sécurité

- **RLS (Row Level Security)** activé sur toutes les tables
- **Validation** des données côté serveur
- **CORS** configuré pour les requêtes cross-origin
- **Variables d'environnement** pour les clés sensibles

## 📊 Monitoring

- **Logs Vercel** : Surveillance des erreurs API
- **Dashboard Supabase** : Monitoring de la base de données
- **Analytics** : Suivi des performances

## 🛠️ Développement

### Scripts disponibles
- `npm run dev` - Serveur de développement
- `npm run build` - Compilation TypeScript
- `npm run type-check` - Vérification des types
- `npm run start` - Démarrer en production

### Workflow de développement
1. Créer une branche feature
2. Développer et tester localement
3. Pousser et créer une PR
4. Merge vers main pour déploiement

## 📞 Support

Pour toute question ou problème :
1. Vérifier la documentation Supabase
2. Consulter les logs Vercel
3. Vérifier les variables d'environnement
4. Tester localement avec `npm run dev`

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.