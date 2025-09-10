// ========================================
// GESTIONNAIRE D'IMAGES PNEUS CSP
// ========================================

class ImageManager {
    constructor() {
        this.basePath = 'assets/images/pneus/';
        this.defaultImage = 'assets/images/pneus/default.svg';
        this.supportedFormats = ['svg', 'jpg', 'jpeg', 'png', 'webp'];
    }

    // Générer le chemin d'image basé sur la marque et le modèle
    generateImagePath(brand, model, format = 'svg') {
        const cleanBrand = this.sanitizeName(brand);
        const cleanModel = this.sanitizeName(model);
        return `${this.basePath}${cleanBrand}-${cleanModel}.${format}`;
    }

    // Nettoyer le nom pour le fichier
    sanitizeName(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    // Vérifier si une image existe
    async checkImageExists(imagePath) {
        try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Obtenir l'image d'un pneu (avec fallback)
    async getTireImage(tire) {
        // Essayer d'abord l'image spécifiée
        if (tire.image && tire.image !== this.defaultImage) {
            const exists = await this.checkImageExists(tire.image);
            if (exists) {
                return tire.image;
            }
        }

        // Générer le chemin basé sur la marque et le modèle
        for (const format of this.supportedFormats) {
            const generatedPath = this.generateImagePath(tire.brand, tire.model, format);
            const exists = await this.checkImageExists(generatedPath);
            if (exists) {
                return generatedPath;
            }
        }

        // Retourner l'image par défaut
        return this.defaultImage;
    }

    // Mettre à jour l'image d'un pneu
    async updateTireImage(tireId, imagePath) {
        const tire = window.inventoryManager.getTireById(tireId);
        if (tire) {
            tire.image = imagePath;
            window.inventoryManager.updateTire(tireId, { image: imagePath });
            return true;
        }
        return false;
    }

    // Créer une image SVG personnalisée
    createCustomSVG(brand, model, size, color = '#dc2626') {
        const cleanBrand = this.sanitizeName(brand);
        const cleanModel = this.sanitizeName(model);
        const fileName = `${cleanBrand}-${cleanModel}.svg`;
        
        const svgContent = this.generateSVGTemplate(brand, model, size, color);
        
        // Créer un blob et le télécharger
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        
        URL.revokeObjectURL(url);
        
        return fileName;
    }

    // Template SVG personnalisable
    generateSVGTemplate(brand, model, size, color) {
        const brandInitial = brand.charAt(0).toUpperCase();
        
        return `<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d3748;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a202c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="treadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4a5568;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#718096;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4a5568;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fond du pneu -->
  <ellipse cx="150" cy="100" rx="140" ry="60" fill="url(#tireGradient)" stroke="#1a202c" stroke-width="2"/>
  
  <!-- Profil du pneu -->
  <ellipse cx="150" cy="100" rx="135" ry="55" fill="none" stroke="#4a5568" stroke-width="1"/>
  
  <!-- Sculpture de la bande de roulement -->
  <g fill="url(#treadGradient)">
    <rect x="20" y="85" width="260" height="3" rx="1.5"/>
    <rect x="20" y="95" width="260" height="3" rx="1.5"/>
    <rect x="20" y="105" width="260" height="3" rx="1.5"/>
    
    <!-- Motifs personnalisés -->
    <path d="M 50 80 L 70 100 L 50 120 L 30 100 Z" opacity="0.7"/>
    <path d="M 90 80 L 110 100 L 90 120 L 70 100 Z" opacity="0.7"/>
    <path d="M 130 80 L 150 100 L 130 120 L 110 100 Z" opacity="0.7"/>
    <path d="M 170 80 L 190 100 L 170 120 L 150 100 Z" opacity="0.7"/>
    <path d="M 210 80 L 230 100 L 210 120 L 190 100 Z" opacity="0.7"/>
    <path d="M 250 80 L 270 100 L 250 120 L 230 100 Z" opacity="0.7"/>
  </g>
  
  <!-- Logo de la marque -->
  <g transform="translate(120, 70)">
    <circle cx="15" cy="15" r="12" fill="${color}" stroke="white" stroke-width="2"/>
    <text x="15" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">${brandInitial}</text>
  </g>
  
  <!-- Texte du modèle -->
  <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">${model.toUpperCase()}</text>
  <text x="150" y="155" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="8">${size}</text>
  
  <!-- Effet de brillance -->
  <ellipse cx="120" cy="80" rx="30" ry="15" fill="white" opacity="0.1"/>
</svg>`;
    }

    // Obtenir toutes les images disponibles
    async getAvailableImages() {
        const inventory = window.inventoryManager.getAllTires();
        const images = [];
        
        for (const tire of inventory) {
            const imagePath = await this.getTireImage(tire);
            images.push({
                tireId: tire.id,
                brand: tire.brand,
                model: tire.model,
                imagePath: imagePath,
                isCustom: imagePath !== this.defaultImage
            });
        }
        
        return images;
    }

    // Optimiser les images pour le web
    optimizeImageForWeb(file, maxWidth = 300, maxHeight = 200, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculer les nouvelles dimensions
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Dessiner l'image redimensionnée
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convertir en blob
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    // Upload d'image avec prévisualisation
    async uploadImage(file, tireId) {
        try {
            // Optimiser l'image
            const optimizedBlob = await this.optimizeImageForWeb(file);
            
            // Créer le nom de fichier
            const tire = window.inventoryManager.getTireById(tireId);
            const fileName = this.generateImagePath(tire.brand, tire.model, 'jpg');
            
            // Simuler l'upload (dans un vrai projet, vous feriez un appel API)
            console.log('Image optimisée:', {
                originalSize: file.size,
                optimizedSize: optimizedBlob.size,
                fileName: fileName
            });
            
            // Mettre à jour l'inventaire
            await this.updateTireImage(tireId, fileName);
            
            return {
                success: true,
                fileName: fileName,
                size: optimizedBlob.size
            };
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Instance globale
window.imageManager = new ImageManager();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageManager;
}
