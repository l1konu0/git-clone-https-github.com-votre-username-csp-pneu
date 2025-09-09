#!/bin/bash

echo "🧹 Suppression des fichiers PHP restants..."

# Supprimer index.php
rm -f index.php

# Supprimer autres fichiers PHP
rm -f *.php
rm -f admin/*.php
rm -f pages/*.php

echo "✅ Fichiers PHP supprimés !"
echo "🚀 Le projet est maintenant 100% HTML/TypeScript"
