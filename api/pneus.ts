// API des pneus pour Vercel avec Supabase (TypeScript)
import { supabase, Pneu } from '../lib/supabase';

interface VercelRequest {
  method: string;
  body: any;
  query: any;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Récupérer les pneus depuis Supabase
      const { data: pneus, error } = await supabase
        .from('pneus')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des pneus' });
      }

      res.status(200).json(pneus || []);
    } else if (req.method === 'POST') {
      // Ajouter un nouveau pneu
      const { marque, modele, dimensions, type, prix, stock, description, image_url } = req.body;

      if (!marque || !modele || !dimensions || !type || !prix || !stock) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
      }

      const { data: newPneu, error } = await supabase
        .from('pneus')
        .insert([{
          marque,
          modele,
          dimensions,
          type,
          prix: parseFloat(prix),
          stock: parseInt(stock),
          description: description || '',
          image_url: image_url || null
        }])
        .select()
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout du pneu' });
      }

      res.status(201).json({ 
        id: newPneu.id, 
        message: 'Pneu ajouté avec succès',
        pneu: newPneu
      });
    } else if (req.method === 'PUT') {
      // Mettre à jour un pneu
      const { id, marque, modele, dimensions, type, prix, stock, description, image_url } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID du pneu requis' });
      }

      const { data: updatedPneu, error } = await supabase
        .from('pneus')
        .update({
          marque,
          modele,
          dimensions,
          type,
          prix: parseFloat(prix),
          stock: parseInt(stock),
          description: description || '',
          image_url: image_url || null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du pneu' });
      }

      res.status(200).json({ 
        message: 'Pneu mis à jour avec succès',
        pneu: updatedPneu
      });
    } else if (req.method === 'DELETE') {
      // Supprimer un pneu
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID du pneu requis' });
      }

      const { error } = await supabase
        .from('pneus')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la suppression du pneu' });
      }

      res.status(200).json({ message: 'Pneu supprimé avec succès' });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
