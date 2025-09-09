-- Base de données pour CSP Pneu
CREATE DATABASE IF NOT EXISTS csp_pneu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE csp_pneu;

-- Table des pneus
CREATE TABLE pneus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(100) NOT NULL,
    modele VARCHAR(100) NOT NULL,
    dimensions VARCHAR(20) NOT NULL,
    type ENUM('été', 'hiver', '4saisons') NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    total DECIMAL(10,2) NOT NULL,
    statut ENUM('en_attente', 'confirmee', 'en_cours', 'livree', 'annulee') DEFAULT 'en_attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des détails de commande
CREATE TABLE commande_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL,
    pneu_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (pneu_id) REFERENCES pneus(id) ON DELETE CASCADE
);

-- Table des messages de contact
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    sujet VARCHAR(100),
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des administrateurs
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de données de test
INSERT INTO pneus (marque, modele, dimensions, type, prix, stock, description) VALUES
('Michelin', 'Energy Saver+', '205/55 R16', 'été', 89.90, 15, 'Pneu été haute performance avec faible résistance au roulement'),
('Bridgestone', 'Turanza T005', '215/60 R17', 'été', 95.50, 12, 'Confort et sécurité optimaux pour tous types de véhicules'),
('Continental', 'WinterContact TS 860', '205/55 R16', 'hiver', 78.90, 8, 'Pneu hiver premium pour une sécurité maximale'),
('Pirelli', 'P Zero', '225/45 R18', 'été', 125.00, 6, 'Pneu sport haute performance pour véhicules sportifs'),
('Goodyear', 'EfficientGrip Performance', '215/60 R17', '4saisons', 92.00, 20, 'Pneu 4 saisons pour un usage toute l\'année'),
('Dunlop', 'Sport Maxx RT2', '235/40 R19', 'été', 135.50, 4, 'Pneu sport ultra haute performance'),
('Hankook', 'Ventus Prime3 K125', '205/55 R16', 'été', 65.90, 18, 'Excellent rapport qualité-prix'),
('Toyo', 'Proxes Sport', '225/45 R17', 'été', 88.00, 10, 'Pneu sport pour conduite dynamique'),
('Yokohama', 'Advan Sport V105', '235/40 R18', 'été', 110.00, 7, 'Pneu sport premium pour véhicules de luxe'),
('Michelin', 'CrossClimate+', '215/60 R17', '4saisons', 105.90, 14, 'Pneu 4 saisons certifié neige');

-- Insertion d'un administrateur par défaut
INSERT INTO admins (username, email, password_hash) VALUES
('admin', 'admin@csppneu.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insertion de quelques messages de test
INSERT INTO messages (nom, email, telephone, sujet, message) VALUES
('Jean Dupont', 'jean.dupont@email.com', '0123456789', 'devis', 'Bonjour, je souhaiterais un devis pour 4 pneus 205/55 R16.'),
('Marie Martin', 'marie.martin@email.com', '0987654321', 'info', 'Quelle est la différence entre un pneu été et 4 saisons ?'),
('Pierre Durand', 'pierre.durand@email.com', '0555666777', 'service', 'J\'ai un problème avec mes pneus achetés la semaine dernière.');
