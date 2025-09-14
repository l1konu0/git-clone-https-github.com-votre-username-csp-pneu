"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
async function handler(req, res) {
    // Configuration CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }
    try {
        // En production, on pourrait invalider le token côté serveur
        // Pour cette démo, on retourne simplement un succès
        res.status(200).json({
            success: true,
            message: 'Déconnexion réussie'
        });
    }
    catch (error) {
        console.error('Erreur de déconnexion:', error);
        res.status(500).json({
            error: 'Erreur interne du serveur'
        });
    }
}
//# sourceMappingURL=logout.js.map