// API des messages de contact pour Vercel avec Supabase (TypeScript)
import { supabase, Message } from '../lib/supabase';

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
      // Récupérer les messages depuis Supabase
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
      }

      res.status(200).json(messages || []);
    } else if (req.method === 'POST') {
      // Créer un nouveau message
      const { nom, email, telephone, sujet, message } = req.body;

      if (!nom || !email || !message) {
        return res.status(400).json({ error: 'Nom, email et message sont obligatoires' });
      }

      const { data: newMessage, error } = await supabase
        .from('messages')
        .insert([{
          nom,
          email,
          telephone: telephone || null,
          sujet: sujet || null,
          message,
          lu: false
        }])
        .select()
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
      }

      res.status(201).json({ 
        id: newMessage.id, 
        message: 'Message envoyé avec succès',
        data: newMessage
      });
    } else if (req.method === 'PUT') {
      // Marquer un message comme lu
      const { id, lu } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID du message requis' });
      }

      const { data: updatedMessage, error } = await supabase
        .from('messages')
        .update({ lu: lu !== undefined ? lu : true })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
      }

      res.status(200).json({ 
        message: 'Message mis à jour avec succès',
        data: updatedMessage
      });
    } else if (req.method === 'DELETE') {
      // Supprimer un message
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID du message requis' });
      }

      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Erreur lors de la suppression du message' });
      }

      res.status(200).json({ message: 'Message supprimé avec succès' });
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
