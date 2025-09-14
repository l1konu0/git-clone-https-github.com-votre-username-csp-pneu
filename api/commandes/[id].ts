// API pour récupérer une commande spécifique avec Supabase
import { supabase } from '../../lib/supabase';

interface VercelRequest {
  method: string;
  query: {
    id: string;
  };
  headers: {
    authorization?: string;
  };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID de commande requis' });
      }

      // Récupérer la commande avec ses détails
      const { data: commande, error } = await supabase
        .from('commandes')
        .select(`
          *,
          commande_details (
            *,
            pneus (
              marque,
              modele,
              dimensions
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
      }

      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }

      res.status(200).json(commande);
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
