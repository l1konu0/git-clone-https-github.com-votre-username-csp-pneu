const mysql = require('mysql2/promise');

// Configuration de la base de données
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'csp_pneu',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Données de démonstration
const demoProducts = [
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

export default async function handler(req, res) {
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
            // Essayer de se connecter à la base de données
            let products = demoProducts;
            
            try {
                const connection = await mysql.createConnection(dbConfig);
                const [rows] = await connection.execute('SELECT * FROM pneus ORDER BY marque, modele');
                products = rows;
                await connection.end();
            } catch (dbError) {
                console.log('Utilisation des données de démonstration:', dbError.message);
                // Utiliser les données de démonstration si la DB n'est pas disponible
            }

            res.status(200).json(products);
        } else if (req.method === 'POST') {
            // Ajouter un nouveau pneu
            const { marque, modele, dimensions, type, prix, stock, description } = req.body;

            if (!marque || !modele || !dimensions || !type || !prix || !stock) {
                return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
            }

            try {
                const connection = await mysql.createConnection(dbConfig);
                const [result] = await connection.execute(
                    'INSERT INTO pneus (marque, modele, dimensions, type, prix, stock, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [marque, modele, dimensions, type, prix, stock, description]
                );
                await connection.end();

                res.status(201).json({ 
                    id: result.insertId, 
                    message: 'Pneu ajouté avec succès' 
                });
            } catch (dbError) {
                console.error('Erreur base de données:', dbError);
                res.status(500).json({ error: 'Erreur lors de l\'ajout du pneu' });
            }
        } else {
            res.status(405).json({ error: 'Méthode non autorisée' });
        }
    } catch (error) {
        console.error('Erreur API:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
