# Guide d'installation Supabase pour CSP Pneu

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation
5. Donnez un nom au projet : `csp-pneu`
6. Créez un mot de passe fort pour la base de données
7. Choisissez une région proche de vos utilisateurs
8. Cliquez sur "Create new project"

## 2. Configurer la base de données

1. Une fois le projet créé, allez dans l'onglet "SQL Editor"
2. Copiez le contenu du fichier `config/supabase_setup.sql`
3. Collez-le dans l'éditeur SQL
4. Exécutez le script pour créer les tables et insérer les données de test

## 3. Récupérer les clés API

1. Allez dans l'onglet "Settings" > "API"
2. Copiez les valeurs suivantes :
   - **Project URL** (ex: `https://your-project.supabase.co`)
   - **anon public** key (clé publique)
   - **service_role** key (clé de service - gardez-la secrète)

## 4. Configurer les variables d'environnement

### Pour le développement local :
1. Créez un fichier `.env` à la racine du projet
2. Ajoutez les variables suivantes :

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development
```

### Pour Vercel (production) :
1. Allez dans votre dashboard Vercel
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez les mêmes variables que ci-dessus

## 5. Tester la connexion

1. Démarrez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez votre navigateur sur `http://localhost:3000`
3. Allez sur la page catalogue
4. Vérifiez que les pneus s'affichent depuis Supabase
5. Testez l'ajout au panier et la commande

## 6. Gestion des données

### Ajouter des pneus :
- Via l'interface admin (à créer)
- Via l'API directement
- Via l'éditeur SQL de Supabase

### Modifier le stock :
- Les commandes mettront automatiquement à jour le stock
- Vous pouvez aussi modifier manuellement via l'interface Supabase

### Voir les commandes :
- Allez dans l'onglet "Table Editor" de Supabase
- Sélectionnez la table "commandes"

## 7. Sécurité

- Les politiques RLS (Row Level Security) sont configurées
- Les pneus sont en lecture publique
- Les commandes et messages nécessitent une authentification (à implémenter)

## 8. Sauvegarde

- Supabase fait des sauvegardes automatiques
- Vous pouvez aussi exporter vos données via l'interface

## 9. Monitoring

- Utilisez l'onglet "Logs" pour surveiller les erreurs
- L'onglet "Database" pour voir les performances

## 10. Déploiement

Une fois configuré, poussez votre code sur Git et déployez sur Vercel :

```bash
git add .
git commit -m "Ajout de Supabase pour la gestion des données"
git push origin main
```

Vercel déploiera automatiquement avec les variables d'environnement configurées.
