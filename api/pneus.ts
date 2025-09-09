// API des pneus pour Vercel (TypeScript)

interface Pneu {
  id: number;
  marque: string;
  modele: string;
  dimensions: string;
  type: 'été' | 'hiver' | '4saisons';
  prix: number;
  stock: number;
  description: string;
}

interface VercelRequest {
  method: string;
  body: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

// Données de démonstration
const demoProducts: Pneu[] = [
  {
    id: 1,
    marque: 'Michelin',
    modele: 'Pilot Sport 4',
    dimensions: '225/45 R17',
    type: 'été',
    prix: 89.99,
    stock: 15,
    description: 'Pneu haute performance pour voitures sportives'
  },
  {
    id: 2,
    marque: 'Bridgestone',
    modele: 'Turanza T005',
    dimensions: '205/55 R16',
    type: 'été',
    prix: 75.50,
    stock: 8,
    description: 'Confort et sécurité pour tous les trajets'
  },
  {
    id: 3,
    marque: 'Continental',
    modele: 'WinterContact TS 860',
    dimensions: '215/60 R16',
    type: 'hiver',
    prix: 95.00,
    stock: 12,
    description: 'Pneu hiver pour une sécurité optimale'
  },
  {
    id: 4,
    marque: 'Pirelli',
    modele: 'Cinturato P7',
    dimensions: '235/45 R18',
    type: '4saisons',
    prix: 110.00,
    stock: 6,
    description: 'Pneu 4 saisons haute technologie'
  },
  {
    id: 5,
    marque: 'Goodyear',
    modele: 'Eagle F1 Asymmetric 5',
    dimensions: '245/40 R19',
    type: 'été',
    prix: 125.00,
    stock: 4,
    description: 'Performance et précision au volant'
  },
  {
    id: 6,
    marque: 'Dunlop',
    modele: 'Sport Maxx RT2',
    dimensions: '225/40 R18',
    type: 'été',
    prix: 98.50,
    stock: 10,
    description: 'Sportivité et durabilité'
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Retourner les données de démonstration
      res.status(200).json(demoProducts);
    } else if (req.method === 'POST') {
      // Ajouter un nouveau pneu (simulation)
      const { marque, modele, dimensions, type, prix, stock, description } = req.body;

      if (!marque || !modele || !dimensions || !type || !prix || !stock) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
      }

      // Simuler l'ajout d'un pneu
      const newPneu: Pneu = {
        id: demoProducts.length + 1,
        marque,
        modele,
        dimensions,
        type: type as 'été' | 'hiver' | '4saisons',
        prix: parseFloat(prix),
        stock: parseInt(stock),
        description: description || ''
      };

      // En mode démonstration, on ne sauvegarde pas vraiment
      res.status(201).json({ 
        id: newPneu.id, 
        message: 'Pneu ajouté avec succès (mode démonstration)',
        pneu: newPneu
      });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
