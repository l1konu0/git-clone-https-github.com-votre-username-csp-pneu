# 🖼️ Guide d'Ajout d'Images de Pneus - CSP

## 📁 Structure des Dossiers

```
assets/images/pneus/
├── michelin-pilot-sport-4.svg
├── continental-premium-contact-6.svg
├── bridgestone-turanza-t005.svg
├── default.svg
└── [autres images...]
```

## 🎨 Types d'Images Supportés

### 1. **SVG (Recommandé)**
- ✅ **Avantages** : Vectoriel, léger, redimensionnable
- ✅ **Qualité** : Parfaite à toutes les tailles
- ✅ **Taille** : Très petit (quelques KB)
- ✅ **Compatibilité** : Tous les navigateurs modernes

### 2. **JPG/JPEG**
- ✅ **Avantages** : Photos réalistes, compression
- ❌ **Inconvénients** : Pixelisé si redimensionné
- 📏 **Taille recommandée** : 300x200px minimum

### 3. **PNG**
- ✅ **Avantages** : Transparence, qualité
- ❌ **Inconvénients** : Plus lourd que JPG
- 📏 **Taille recommandée** : 300x200px minimum

### 4. **WebP**
- ✅ **Avantages** : Très léger, qualité élevée
- ❌ **Inconvénients** : Support navigateur limité

## 🚀 Méthodes d'Ajout d'Images

### **Méthode 1 : Images SVG Personnalisées (Recommandée)**

```bash
# Créer le dossier
mkdir -p assets/images/pneus

# Ajouter vos images SVG
cp votre-image.svg assets/images/pneus/nom-du-pneu.svg
```

### **Méthode 2 : Images Photos**

```bash
# Ajouter des photos de pneus
cp photo-pneu.jpg assets/images/pneus/michelin-pilot-sport-4.jpg
```

### **Méthode 3 : Téléchargement depuis Internet**

1. Trouvez des images de pneus libres de droits
2. Redimensionnez à 300x200px
3. Sauvegardez dans `assets/images/pneus/`
4. Nommez selon le format : `marque-modele.extension`

## 🔧 Intégration dans le Code

### **1. Mettre à jour l'inventaire**

Dans `assets/js/inventory.js`, modifiez la propriété `image` :

```javascript
{
    id: 'P001',
    brand: 'Michelin',
    model: 'Pilot Sport 4',
    // ... autres propriétés
    image: 'assets/images/pneus/michelin-pilot-sport-4.svg', // ← Chemin de l'image
}
```

### **2. Image par défaut**

Si une image n'existe pas, le système utilise :
```javascript
image: 'assets/images/pneus/default.svg'
```

### **3. Affichage dans le catalogue**

Les images s'affichent automatiquement dans :
- Page catalogue (`pages/catalog.html`)
- Cartes de produits
- Modal de commande
- Panier

## 📝 Convention de Nommage

### **Format recommandé :**
```
marque-modele.extension
```

### **Exemples :**
```
michelin-pilot-sport-4.svg
continental-premium-contact-6.jpg
bridgestone-turanza-t005.png
goodyear-vector-4seasons.webp
```

### **Caractères autorisés :**
- ✅ Lettres minuscules
- ✅ Tirets (-)
- ✅ Chiffres
- ❌ Espaces
- ❌ Caractères spéciaux

## 🎨 Création d'Images SVG Personnalisées

### **Template de base :**

```svg
<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d3748;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a202c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fond du pneu -->
  <ellipse cx="150" cy="100" rx="140" ry="60" fill="url(#tireGradient)" stroke="#1a202c" stroke-width="2"/>
  
  <!-- Sculpture de la bande de roulement -->
  <g fill="#4a5568">
    <rect x="20" y="85" width="260" height="3" rx="1.5"/>
    <rect x="20" y="95" width="260" height="3" rx="1.5"/>
    <rect x="20" y="105" width="260" height="3" rx="1.5"/>
  </g>
  
  <!-- Logo de la marque -->
  <g transform="translate(120, 70)">
    <circle cx="15" cy="15" r="12" fill="#dc2626" stroke="white" stroke-width="2"/>
    <text x="15" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">M</text>
  </g>
  
  <!-- Texte du modèle -->
  <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">MODÈLE</text>
  <text x="150" y="155" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="8">205/55R16 91V</text>
</svg>
```

## 🔄 Mise à Jour Automatique

### **Script de mise à jour des images :**

```javascript
// Dans assets/js/inventory.js
function updateTireImage(tireId, newImagePath) {
    const tire = window.inventoryManager.getTireById(tireId);
    if (tire) {
        tire.image = newImagePath;
        window.inventoryManager.updateTire(tireId, { image: newImagePath });
    }
}
```

## 📱 Optimisation Mobile

### **Images responsives :**

```css
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .product-image {
        height: 150px;
    }
}
```

## 🚀 Déploiement

### **1. Ajouter les images :**
```bash
git add assets/images/pneus/
git commit -m "feat: Ajout d'images de pneus"
git push origin main
```

### **2. Déployer sur Vercel :**
```bash
npx vercel --prod
```

## ✅ Checklist d'Ajout d'Images

- [ ] Créer le dossier `assets/images/pneus/`
- [ ] Ajouter l'image avec le bon nom
- [ ] Mettre à jour `inventory.js` avec le chemin
- [ ] Tester l'affichage dans le catalogue
- [ ] Vérifier la responsivité mobile
- [ ] Commiter et déployer

## 🎯 Résultat Final

Vos pneus auront maintenant des images personnalisées qui s'affichent :
- ✅ Dans le catalogue
- ✅ Dans le panier
- ✅ Dans les modals de commande
- ✅ Sur mobile et desktop
- ✅ Avec fallback si image manquante
