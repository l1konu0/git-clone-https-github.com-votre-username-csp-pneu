// Script pour télécharger l'image officielle Michelin
const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrl = 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4xe194hr9qcgqyy/4w-238_3528700093414_tire_michelin_pilot-sport-4_245-slash-40-zr18-97y-xl_a_main_1-30_nopad.webp?t=resize&height=500';
const outputPath = 'assets/images/pneus/michelin-pilot-sport-4-official.webp';

// Créer le dossier s'il n'existe pas
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Télécharger l'image
const file = fs.createWriteStream(outputPath);
https.get(imageUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('✅ Image Michelin téléchargée avec succès !');
        console.log('📁 Fichier:', outputPath);
        console.log('📏 Taille:', fs.statSync(outputPath).size, 'bytes');
    });
}).on('error', (err) => {
    fs.unlink(outputPath, () => {}); // Supprimer le fichier partiel
    console.error('❌ Erreur lors du téléchargement:', err.message);
});

