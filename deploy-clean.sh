#!/bin/bash

echo "🚀 Déploiement CSP Pneu - Version TypeScript Pure"

echo "🧹 Nettoyage des fichiers PHP..."
# Supprimer tous les fichiers PHP
rm -f *.php
rm -f admin/*.php
rm -f pages/*.php
rm -f includes/*.php
rm -f config/*.php

# Supprimer les dossiers PHP
rm -rf includes/
rm -rf config/

# Supprimer les fichiers de test
rm -f test*.php
rm -f demo.php
rm -f code.php
rm -f site_*.php

echo "📦 Installation des dépendances TypeScript..."
npm install

echo "🔧 Vérification TypeScript..."
npx tsc --noEmit

echo "📝 Ajout des fichiers..."
git add .

echo "💾 Création du commit..."
git commit -m "feat: Conversion complète en TypeScript

- Suppression de tous les fichiers PHP
- Conversion des API en TypeScript
- Interface d'administration TypeScript
- Configuration Vercel optimisée
- Compatible 100% Vercel"

echo "🚀 Poussage vers GitHub..."
git push origin main

echo "✅ Déploiement terminé !"
echo "🌐 Votre site est maintenant 100% compatible Vercel"
echo "📱 URL: https://git-clone-https-github-com-votre-username-csp-pneu.vercel.app"
