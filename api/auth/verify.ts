import { VercelRequest, VercelResponse } from '@vercel/node';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  createdAt: string;
}

// Base de données simulée (même que dans login.ts)
const users: User[] = [
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

// Fonction pour vérifier un token
function verifyToken(token: string): User | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (payload.exp < Date.now()) {
      return null; // Token expiré
    }
    
    return users.find(user => user.id === payload.id) || null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.body?.token;

    if (!token) {
      return res.status(401).json({ 
        error: 'Token d\'authentification requis' 
      });
    }

    const user = verifyToken(token);
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Token invalide ou expiré' 
      });
    }

    // Retour des informations de l'utilisateur
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Erreur de vérification:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur' 
    });
  }
}
