// API des commandes pour Vercel avec Supabase (TypeScript)
import { supabase, Commande, CommandeDetail } from '../lib/supabase';

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
      // Récupérer l'email de l'utilisateur depuis le token d'authentification
      const authHeader = req.headers.authorization;
      let userEmail = null;

      if (authHeader) {
        try {
          const token = authHeader.replace('Bearer ', '');
          const verifyResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token })
          });

          if (verifyResponse.ok) {
            const userData = await verifyResponse.json();
            userEmail = userData.user?.email;
          }
        } catch (error) {
          console.log('Token invalide ou erreur de vérification');
        }
      }

      // Construire la requête avec ou sans filtre
      let query = supabase
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
        .order('created_at', { ascending: false });

      // Si un utilisateur est connecté, filtrer par son email
      if (userEmail) {
        query = query.eq('email', userEmail);
      }

      const { data: commandes, error } = await query;

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
      }

      res.status(200).json(commandes || []);
    } else if (req.method === 'POST') {
      // Créer une nouvelle commande
      const { nom, email, telephone, adresse, total, details } = req.body;

      if (!nom || !email || !total || !details || !Array.isArray(details)) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
      }

      // Créer la commande
      const { data: newCommande, error: commandeError } = await supabase
        .from('commandes')
        .insert([{
          nom,
          email,
          telephone: telephone || null,
          adresse: adresse || null,
          total: parseFloat(total),
          statut: 'en_attente'
        }])
        .select()
        .single();

      if (commandeError) {
        console.error('Erreur Supabase commande:', commandeError);
        return res.status(500).json({ error: 'Erreur lors de la création de la commande' });
      }

      // Créer les détails de commande
      const commandeDetails = details.map((detail: any) => ({
        commande_id: newCommande.id,
        pneu_id: detail.pneu_id,
        quantite: parseInt(detail.quantite),
        prix_unitaire: parseFloat(detail.prix_unitaire)
      }));

      const { error: detailsError } = await supabase
        .from('commande_details')
        .insert(commandeDetails);

      if (detailsError) {
        console.error('Erreur Supabase détails:', detailsError);
        // Supprimer la commande si les détails échouent
        await supabase.from('commandes').delete().eq('id', newCommande.id);
        return res.status(500).json({ error: 'Erreur lors de la création des détails de commande' });
      }

      res.status(201).json({ 
        id: newCommande.id, 
        message: 'Commande créée avec succès',
        commande: newCommande
      });
    } else if (req.method === 'PUT') {
      // Mettre à jour le statut d'une commande
      const { id, statut } = req.body;

      if (!id || !statut) {
        return res.status(400).json({ error: 'ID et statut requis' });
      }

      const { data: updatedCommande, error } = await supabase
        .from('commandes')
        .update({ statut })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
      }

      res.status(200).json({ 
        message: 'Commande mise à jour avec succès',
        commande: updatedCommande
      });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
