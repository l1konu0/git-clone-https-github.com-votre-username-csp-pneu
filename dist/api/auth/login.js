"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// Base de données simulée (à remplacer par une vraie base de données)
const users = [
    {
        id: '1',
        email: 'admin@csppneu.fr',
        name: 'Administrateur CSP',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '2',
        email: 'client@example.com',
        name: 'Client Test',
        role: 'client',
        createdAt: '2024-01-01T00:00:00Z'
    }
];
// Fonction pour générer un token JWT simple (en production, utiliser une vraie librairie JWT)
function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}
// Fonction pour vérifier un token
function verifyToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token, 'base64').toString());
        if (payload.exp < Date.now()) {
            return null; // Token expiré
        }
        return users.find(user => user.id === payload.id) || null;
    }
    catch {
        return null;
    }
}
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
        const { email, password } = req.body;
        // Validation des données
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email et mot de passe requis'
            });
        }
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Format d\'email invalide'
            });
        }
        // Recherche de l'utilisateur
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                error: 'Email ou mot de passe incorrect'
            });
        }
        // Vérification du mot de passe (en production, utiliser bcrypt)
        // Pour la démo, on accepte n'importe quel mot de passe
        if (password.length < 6) {
            return res.status(401).json({
                error: 'Mot de passe trop court'
            });
        }
        // Génération du token
        const token = generateToken(user);
        // Retour de la réponse
        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token: token
        });
    }
    catch (error) {
        console.error('Erreur de connexion:', error);
        res.status(500).json({
            error: 'Erreur interne du serveur'
        });
    }
}
//# sourceMappingURL=login.js.map