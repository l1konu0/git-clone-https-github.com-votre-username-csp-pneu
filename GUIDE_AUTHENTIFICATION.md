# 🔐 Guide d'Authentification et Gestion des Commandes

## 📋 Fonctionnalités

### 🔑 Système de Connexion
- **Connexion sécurisée** avec email et mot de passe
- **Gestion des sessions** avec tokens JWT
- **Interface utilisateur** moderne avec modales
- **Menu utilisateur** avec avatar et actions

### 📦 Gestion des Commandes
- **Vue d'ensemble** de toutes les commandes
- **Détails complets** de chaque commande
- **Statuts visuels** avec codes couleur
- **Historique** des commandes par utilisateur

## 🚀 Utilisation

### 1. Connexion
1. Cliquez sur le bouton **"Connexion"** en haut à droite
2. Entrez votre **email** et **mot de passe**
3. Cliquez sur **"Se connecter"**

### 2. Menu Utilisateur
Une fois connecté, le bouton affiche votre nom et propose :
- **Mes commandes** : Voir toutes vos commandes
- **Mon profil** : Gérer vos informations (en développement)
- **Déconnexion** : Se déconnecter

### 3. Consultation des Commandes
1. Cliquez sur **"Mes commandes"** dans le menu
2. Consultez la liste de vos commandes avec :
   - **Numéro de commande**
   - **Date de commande**
   - **Statut** (en attente, confirmée, en cours, livrée, annulée)
   - **Total** de la commande
3. Cliquez sur **"Voir les détails"** pour plus d'informations

### 4. Détails d'une Commande
Les détails incluent :
- **Informations client** (nom, email, téléphone, adresse)
- **Informations commande** (date, statut, total)
- **Articles commandés** avec quantités et prix

## 🎨 Interface

### Statuts des Commandes
- 🟡 **En attente** : Commande reçue, en cours de traitement
- 🟢 **Confirmée** : Commande validée par l'équipe
- 🔵 **En cours** : Commande en préparation
- 🟦 **Livrée** : Commande livrée au client
- 🔴 **Annulée** : Commande annulée

### Codes Couleur
- **Bouton de connexion** : Blanc avec bordure grise
- **Menu utilisateur** : Fond blanc avec ombre
- **Cartes de commandes** : Fond gris clair avec bordures
- **Statuts** : Codes couleur selon l'état

## 🔧 Configuration Technique

### Authentification
- **Tokens JWT** stockés dans localStorage
- **Vérification automatique** au chargement de la page
- **Déconnexion automatique** si token invalide

### API Endpoints
- `POST /api/auth/login` : Connexion
- `POST /api/auth/logout` : Déconnexion
- `POST /api/auth/verify` : Vérification du token
- `GET /api/commandes` : Liste des commandes (filtrée par utilisateur)
- `GET /api/commandes/[id]` : Détails d'une commande

### Sécurité
- **Filtrage par email** : Chaque utilisateur ne voit que ses commandes
- **Validation des tokens** : Vérification à chaque requête
- **CORS configuré** : Accès contrôlé aux API

## 📱 Responsive Design

### Mobile (< 768px)
- **Menu utilisateur** : Positionnement adapté
- **Modales** : Pleine largeur avec marges
- **Cartes de commandes** : Layout vertical

### Desktop (> 768px)
- **Menu utilisateur** : Positionnement absolu
- **Modales** : Largeur fixe centrée
- **Détails de commandes** : Layout en grille

## 🐛 Dépannage

### Problèmes de Connexion
1. **Vérifiez vos identifiants** : Email et mot de passe corrects
2. **Vérifiez la connexion** : Internet stable
3. **Rafraîchissez la page** : Rechargement complet

### Commandes Non Visibles
1. **Vérifiez la connexion** : Êtes-vous connecté ?
2. **Vérifiez l'email** : L'email correspond-il à celui de la commande ?
3. **Contactez le support** : Si le problème persiste

### Erreurs Techniques
1. **Ouvrez la console** : F12 pour voir les erreurs
2. **Vérifiez les logs** : Messages d'erreur détaillés
3. **Rapportez le bug** : Avec les détails de l'erreur

## 🔮 Fonctionnalités Futures

### En Développement
- **Gestion du profil** : Modification des informations
- **Notifications** : Alertes de changement de statut
- **Historique détaillé** : Suivi complet des commandes

### Prévues
- **Authentification sociale** : Google, Facebook
- **Mots de passe oubliés** : Réinitialisation par email
- **Double authentification** : Sécurité renforcée

## 📞 Support

Pour toute question ou problème :
- **Email** : support@csppneu.fr
- **Téléphone** : 01 23 45 67 89
- **Horaires** : Lun-Ven 9h-18h

---

*Guide mis à jour le : ${new Date().toLocaleDateString('fr-FR')}*
