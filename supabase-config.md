# 🔑 Configuration Supabase - CSP Pneu

## 📋 Vos Clés Supabase

### Clé Anon (Publique)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZWlhZ2hwZ3VzYmZpcnVhZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NDQzNTYsImV4cCI6MjA3MzEyMDM1Nn0.MM55ljM7vS90rzEz7Qchlz8gBJq3gFyHm9Evhh2dUm8
```

### URL du Projet
```
https://wdeiaghpgusbfiruadea.supabase.co
```

## 🚀 Configuration Vercel

### Variables d'Environnement à Ajouter

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Sélectionnez votre projet CSP Pneu**
3. **Allez dans "Settings" → "Environment Variables"**
4. **Ajoutez ces variables :**

```
SUPABASE_URL = https://wdeiaghpgusbfiruadea.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZWlhZ2hwZ3VzYmZpcnVhZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NDQzNTYsImV4cCI6MjA3MzEyMDM1Nn0.MM55ljM7vS90rzEz7Qchlz8gBJq3gFyHm9Evhh2dUm8
SUPABASE_SERVICE_ROLE_KEY = [À récupérer dans Supabase]
```

## 🔧 Configuration Locale

### Fichier .env (pour le développement local)
```env
SUPABASE_URL=https://wdeiaghpgusbfiruadea.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZWlhZ2hwZ3VzYmZpcnVhZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NDQzNTYsImV4cCI6MjA3MzEyMDM1Nn0.MM55ljM7vS90rzEz7Qchlz8gBJq3gFyHm9Evhh2dUm8
SUPABASE_SERVICE_ROLE_KEY=[À récupérer dans Supabase]
NODE_ENV=development
```

## 📋 Prochaines Étapes

### 1. Récupérer la Clé Service Role
1. **Allez sur [supabase.com](https://supabase.com)**
2. **Sélectionnez votre projet**
3. **Allez dans "Settings" → "API"**
4. **Copiez la "service_role" key**

### 2. Exécuter le Script SQL
1. **Allez dans l'onglet "SQL Editor"**
2. **Copiez le contenu de `config/supabase_setup.sql`**
3. **Exécutez le script**

### 3. Redéployer sur Vercel
1. **Ajoutez les variables d'environnement**
2. **Redéployez le site**
3. **Testez la connexion**

## ✅ Test de Connexion

Une fois configuré, testez avec :
- **Email** : `admin@csppneu.fr`
- **Mot de passe** : `admin123`

## 🔍 Vérification

Pour vérifier que tout fonctionne :
1. **Allez sur** `votre-site.vercel.app/test-auth.html`
2. **Cliquez sur "Tester l'API"**
3. **Vérifiez que les tests passent**

---

**Note** : Gardez ces clés secrètes et ne les partagez jamais publiquement !
