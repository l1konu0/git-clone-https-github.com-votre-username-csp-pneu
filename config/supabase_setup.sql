-- Configuration Supabase pour CSP Pneu
-- Ce script crée les tables nécessaires dans Supabase

-- Table des pneus
CREATE TABLE pneus (
    id SERIAL PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    modele VARCHAR(100) NOT NULL,
    dimensions VARCHAR(20) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('été', 'hiver', '4saisons')) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE commandes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    total DECIMAL(10,2) NOT NULL,
    statut VARCHAR(20) CHECK (statut IN ('en_attente', 'confirmee', 'en_cours', 'livree', 'annulee')) DEFAULT 'en_attente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des détails de commande
CREATE TABLE commande_details (
    id SERIAL PRIMARY KEY,
    commande_id INTEGER NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
    pneu_id INTEGER NOT NULL REFERENCES pneus(id) ON DELETE CASCADE,
    quantite INTEGER NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL
);

-- Table des messages de contact
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    sujet VARCHAR(100),
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des administrateurs
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_pneus_updated_at BEFORE UPDATE ON pneus
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commandes_updated_at BEFORE UPDATE ON commandes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertion de données de test
INSERT INTO pneus (marque, modele, dimensions, type, prix, stock, description, image_url) VALUES
('Michelin', 'Energy Saver+', '205/55 R16', 'été', 89.90, 15, 'Pneu été haute performance avec faible résistance au roulement', 'michelin-energy-saver.svg'),
('Bridgestone', 'Turanza T005', '215/60 R17', 'été', 95.50, 12, 'Confort et sécurité optimaux pour tous types de véhicules', 'bridgestone-turanza-t005.svg'),
('Continental', 'WinterContact TS 860', '205/55 R16', 'hiver', 78.90, 8, 'Pneu hiver premium pour une sécurité maximale', 'continental-wintercontact.svg'),
('Pirelli', 'P Zero', '225/45 R18', 'été', 125.00, 6, 'Pneu sport haute performance pour véhicules sportifs', 'pirelli-p-zero.svg'),
('Goodyear', 'EfficientGrip Performance', '215/60 R17', '4saisons', 92.00, 20, 'Pneu 4 saisons pour un usage toute l''année', 'goodyear-efficientgrip.svg'),
('Dunlop', 'Sport Maxx RT2', '235/40 R19', 'été', 135.50, 4, 'Pneu sport ultra haute performance', 'dunlop-sport-maxx.svg'),
('Hankook', 'Ventus Prime3 K125', '205/55 R16', 'été', 65.90, 18, 'Excellent rapport qualité-prix', 'hankook-ventus.svg'),
('Toyo', 'Proxes Sport', '225/45 R17', 'été', 88.00, 10, 'Pneu sport pour conduite dynamique', 'toyo-proxes.svg'),
('Yokohama', 'Advan Sport V105', '235/40 R18', 'été', 110.00, 7, 'Pneu sport premium pour véhicules de luxe', 'yokohama-advan.svg'),
('Michelin', 'CrossClimate+', '215/60 R17', '4saisons', 105.90, 14, 'Pneu 4 saisons certifié neige', 'michelin-crossclimate.svg');

-- Insertion d'un administrateur par défaut (mot de passe: admin123)
INSERT INTO admins (username, email, password_hash) VALUES
('admin', 'admin@csppneu.fr', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insertion de quelques messages de test
INSERT INTO messages (nom, email, telephone, sujet, message) VALUES
('Jean Dupont', 'jean.dupont@email.com', '0123456789', 'devis', 'Bonjour, je souhaiterais un devis pour 4 pneus 205/55 R16.'),
('Marie Martin', 'marie.martin@email.com', '0987654321', 'info', 'Quelle est la différence entre un pneu été et 4 saisons ?'),
('Pierre Durand', 'pierre.durand@email.com', '0555666777', 'service', 'J''ai un problème avec mes pneus achetés la semaine dernière.');

-- Politique RLS (Row Level Security) - Lecture publique pour les pneus
ALTER TABLE pneus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique des pneus" ON pneus FOR SELECT USING (true);

-- Politique pour les commandes (lecture/écriture pour les utilisateurs authentifiés)
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Utilisateurs peuvent créer des commandes" ON commandes FOR INSERT WITH CHECK (true);
CREATE POLICY "Utilisateurs peuvent voir leurs commandes" ON commandes FOR SELECT USING (true);

-- Politique pour les détails de commande
ALTER TABLE commande_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique des détails de commande" ON commande_details FOR SELECT USING (true);
CREATE POLICY "Création des détails de commande" ON commande_details FOR INSERT WITH CHECK (true);

-- Politique pour les messages de contact
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique des messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Création des messages" ON messages FOR INSERT WITH CHECK (true);
