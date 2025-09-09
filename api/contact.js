export default async function handler(req, res) {
    // Configuration CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    try {
        const { nom, email, telephone, message, pneuId } = req.body;

        // Validation des champs obligatoires
        if (!nom || !email || !message) {
            return res.status(400).json({ 
                error: 'Les champs nom, email et message sont obligatoires' 
            });
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Format d\'email invalide' 
            });
        }

        // Ici vous pourriez intégrer un service d'email comme SendGrid, Resend, etc.
        // Pour l'instant, on simule l'envoi
        
        const contactData = {
            nom,
            email,
            telephone: telephone || '',
            message,
            pneuId: pneuId || null,
            date: new Date().toISOString(),
            status: 'nouveau'
        };

        // Log pour le développement
        console.log('Nouveau contact reçu:', contactData);

        // Simulation d'envoi d'email
        // Dans un vrai projet, vous utiliseriez un service comme SendGrid
        const emailContent = `
            Nouveau message de contact CSP Pneu
            
            Nom: ${nom}
            Email: ${email}
            Téléphone: ${telephone || 'Non renseigné'}
            ${pneuId ? `Pneu concerné: ID ${pneuId}` : ''}
            
            Message:
            ${message}
            
            Date: ${new Date().toLocaleString('fr-FR')}
        `;

        console.log('Email à envoyer:', emailContent);

        res.status(200).json({ 
            message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
            contactId: Date.now() // ID temporaire
        });

    } catch (error) {
        console.error('Erreur contact:', error);
        res.status(500).json({ 
            error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' 
        });
    }
}
