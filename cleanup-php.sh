#!/bin/bash

echo "🧹 Nettoyage des fichiers PHP pour Vercel..."

# Supprimer tous les fichiers PHP
echo "📁 Suppression des fichiers PHP..."
rm -f *.php
rm -f admin/*.php
rm -f pages/*.php
rm -f includes/*.php
rm -f config/*.php

# Supprimer les dossiers PHP
echo "📁 Suppression des dossiers PHP..."
rm -rf includes/
rm -rf config/

# Supprimer les fichiers de test
echo "📁 Suppression des fichiers de test..."
rm -f test*.php
rm -f demo.php
rm -f code.php
rm -f site_*.php

echo "✅ Nettoyage terminé !"
echo "🚀 Le projet est maintenant compatible Vercel"
