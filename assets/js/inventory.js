// ========================================
// SYSTÈME DE GESTION DES STOCKS CSP
// ========================================

class InventoryManager {
    constructor() {
        this.storageKey = 'csp_inventory';
        this.ordersKey = 'csp_orders';
        this.initInventory();
    }

    // Initialiser l'inventaire avec des données de base
    initInventory() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultInventory = this.getDefaultInventory();
            localStorage.setItem(this.storageKey, JSON.stringify(defaultInventory));
        }
    }

    // Base de données par défaut des pneus CSP
    getDefaultInventory() {
        return [
            // Pneus d'été
            {
                id: 'P001',
                brand: 'Michelin',
                model: 'Pilot Sport 4',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'V',
                season: 'Été',
                price: 89.90,
                stock: 12,
                category: 'Sport',
                description: 'Pneu haute performance pour voitures sportives',
                image: 'assets/images/pneus/michelin-pilot-sport-4.jpg',
                specifications: {
                    width: '205',
                    profile: '55',
                    diameter: '16',
                    load: '91',
                    speed: 'V'
                }
            },
            {
                id: 'P002',
                brand: 'Continental',
                model: 'PremiumContact 6',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: 'Été',
                price: 79.90,
                stock: 8,
                category: 'Confort',
                description: 'Pneu confort et silence pour usage quotidien',
                image: 'assets/images/pneus/continental-premium-contact-6.jpg',
                specifications: {
                    width: '215',
                    profile: '60',
                    diameter: '16',
                    load: '95',
                    speed: 'H'
                }
            },
            {
                id: 'P003',
                brand: 'Bridgestone',
                model: 'Turanza T005',
                size: '225/45R17',
                loadIndex: '91',
                speedRating: 'W',
                season: 'Été',
                price: 95.50,
                stock: 15,
                category: 'Premium',
                description: 'Pneu premium pour berlines et coupés',
                image: 'assets/images/pneus/bridgestone-turanza-t005.jpg',
                specifications: {
                    width: '225',
                    profile: '45',
                    diameter: '17',
                    load: '91',
                    speed: 'W'
                }
            },
            // Pneus 4 saisons
            {
                id: 'P004',
                brand: 'Michelin',
                model: 'CrossClimate+',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'H',
                season: '4 Saisons',
                price: 109.90,
                stock: 6,
                category: '4 Saisons',
                description: 'Pneu 4 saisons haute performance',
                image: 'assets/images/pneus/michelin-crossclimate-plus.jpg',
                specifications: {
                    width: '205',
                    profile: '55',
                    diameter: '16',
                    load: '91',
                    speed: 'H'
                }
            },
            {
                id: 'P005',
                brand: 'Goodyear',
                model: 'Vector 4Seasons Gen-3',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: '4 Saisons',
                price: 84.90,
                stock: 10,
                category: '4 Saisons',
                description: 'Pneu 4 saisons nouvelle génération',
                image: 'assets/images/pneus/goodyear-vector-4seasons.jpg',
                specifications: {
                    width: '215',
                    profile: '60',
                    diameter: '16',
                    load: '95',
                    speed: 'H'
                }
            },
            // Pneus hiver
            {
                id: 'P006',
                brand: 'Nokian',
                model: 'Hakkapeliitta R5',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'H',
                season: 'Hiver',
                price: 119.90,
                stock: 4,
                category: 'Hiver',
                description: 'Pneu hiver premium pour conditions extrêmes',
                image: 'assets/images/pneus/nokian-hakkapeliitta-r5.jpg',
                specifications: {
                    width: '205',
                    profile: '55',
                    diameter: '16',
                    load: '91',
                    speed: 'H'
                }
            },
            {
                id: 'P007',
                brand: 'Continental',
                model: 'WinterContact TS 860',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: 'Hiver',
                price: 89.90,
                stock: 7,
                category: 'Hiver',
                description: 'Pneu hiver pour usage urbain et autoroute',
                image: 'assets/images/pneus/continental-wintercontact-ts860.jpg',
                specifications: {
                    width: '215',
                    profile: '60',
                    diameter: '16',
                    load: '95',
                    speed: 'H'
                }
            },
            // Pneus utilitaires
            {
                id: 'P008',
                brand: 'Michelin',
                model: 'Agilis 3',
                size: '195/70R15C',
                loadIndex: '104/102',
                speedRating: 'R',
                season: 'Toutes saisons',
                price: 125.90,
                stock: 3,
                category: 'Utilitaire',
                description: 'Pneu utilitaire renforcé pour véhicules commerciaux',
                image: 'assets/images/pneus/michelin-agilis-3.jpg',
                specifications: {
                    width: '195',
                    profile: '70',
                    diameter: '15',
                    load: '104/102',
                    speed: 'R'
                }
            },
            {
                id: 'P009',
                brand: 'Continental',
                model: 'VanContact 4Season',
                size: '205/65R16C',
                loadIndex: '107/105',
                speedRating: 'R',
                season: '4 Saisons',
                price: 135.90,
                stock: 5,
                category: 'Utilitaire',
                description: 'Pneu utilitaire 4 saisons pour fourgons',
                image: 'assets/images/pneus/continental-vancontact-4season.jpg',
                specifications: {
                    width: '205',
                    profile: '65',
                    diameter: '16',
                    load: '107/105',
                    speed: 'R'
                }
            },
            // Pneus 4x4
            {
                id: 'P010',
                brand: 'BF Goodrich',
                model: 'All-Terrain T/A KO2',
                size: '265/70R16',
                loadIndex: '112',
                speedRating: 'S',
                season: 'Toutes saisons',
                price: 189.90,
                stock: 2,
                category: '4x4',
                description: 'Pneu tout-terrain pour 4x4 et pick-ups',
                image: 'assets/images/pneus/bf-goodrich-all-terrain-ko2.jpg',
                specifications: {
                    width: '265',
                    profile: '70',
                    diameter: '16',
                    load: '112',
                    speed: 'S'
                }
            }
        ];
    }

    // Obtenir tous les pneus en stock
    getAllTires() {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return inventory.filter(tire => tire.stock > 0);
    }

    // Obtenir un pneu par ID
    getTireById(id) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return inventory.find(tire => tire.id === id);
    }

    // Rechercher des pneus par critères
    searchTires(criteria) {
        let inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        
        // Filtrer par stock disponible
        inventory = inventory.filter(tire => tire.stock > 0);
        
        if (criteria.brand) {
            inventory = inventory.filter(tire => 
                tire.brand.toLowerCase().includes(criteria.brand.toLowerCase())
            );
        }
        
        if (criteria.size) {
            inventory = inventory.filter(tire => 
                tire.size.toLowerCase().includes(criteria.size.toLowerCase())
            );
        }
        
        if (criteria.season) {
            inventory = inventory.filter(tire => 
                tire.season.toLowerCase().includes(criteria.season.toLowerCase())
            );
        }
        
        if (criteria.category) {
            inventory = inventory.filter(tire => 
                tire.category.toLowerCase().includes(criteria.category.toLowerCase())
            );
        }
        
        if (criteria.minPrice) {
            inventory = inventory.filter(tire => tire.price >= criteria.minPrice);
        }
        
        if (criteria.maxPrice) {
            inventory = inventory.filter(tire => tire.price <= criteria.maxPrice);
        }
        
        return inventory;
    }

    // Réserver un pneu (diminuer le stock)
    reserveTire(id, quantity = 1) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const tireIndex = inventory.findIndex(tire => tire.id === id);
        
        if (tireIndex === -1) {
            throw new Error('Pneu non trouvé');
        }
        
        if (inventory[tireIndex].stock < quantity) {
            throw new Error('Stock insuffisant');
        }
        
        inventory[tireIndex].stock -= quantity;
        localStorage.setItem(this.storageKey, JSON.stringify(inventory));
        
        // Déclencher l'événement de mise à jour
        this.triggerInventoryUpdate();
        
        return inventory[tireIndex];
    }

    // Restituer un pneu (augmenter le stock)
    restoreTire(id, quantity = 1) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const tireIndex = inventory.findIndex(tire => tire.id === id);
        
        if (tireIndex === -1) {
            throw new Error('Pneu non trouvé');
        }
        
        inventory[tireIndex].stock += quantity;
        localStorage.setItem(this.storageKey, JSON.stringify(inventory));
        
        // Déclencher l'événement de mise à jour
        this.triggerInventoryUpdate();
        
        return inventory[tireIndex];
    }

    // Ajouter un nouveau pneu
    addTire(tireData) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const newTire = {
            id: this.generateId(),
            ...tireData,
            stock: tireData.stock || 0
        };
        
        inventory.push(newTire);
        localStorage.setItem(this.storageKey, JSON.stringify(inventory));
        
        this.triggerInventoryUpdate();
        return newTire;
    }

    // Mettre à jour un pneu
    updateTire(id, updates) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const tireIndex = inventory.findIndex(tire => tire.id === id);
        
        if (tireIndex === -1) {
            throw new Error('Pneu non trouvé');
        }
        
        inventory[tireIndex] = { ...inventory[tireIndex], ...updates };
        localStorage.setItem(this.storageKey, JSON.stringify(inventory));
        
        this.triggerInventoryUpdate();
        return inventory[tireIndex];
    }

    // Supprimer un pneu
    deleteTire(id) {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const filteredInventory = inventory.filter(tire => tire.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredInventory));
        
        this.triggerInventoryUpdate();
    }

    // Générer un ID unique
    generateId() {
        return 'P' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Déclencher la mise à jour de l'inventaire
    triggerInventoryUpdate() {
        const event = new CustomEvent('inventoryUpdated', {
            detail: { inventory: this.getAllTires() }
        });
        window.dispatchEvent(event);
    }

    // Obtenir les statistiques de l'inventaire
    getInventoryStats() {
        const inventory = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const totalTires = inventory.length;
        const totalStock = inventory.reduce((sum, tire) => sum + tire.stock, 0);
        const outOfStock = inventory.filter(tire => tire.stock === 0).length;
        const lowStock = inventory.filter(tire => tire.stock > 0 && tire.stock <= 3).length;
        
        return {
            totalTires,
            totalStock,
            outOfStock,
            lowStock,
            inStock: totalTires - outOfStock
        };
    }

    // Obtenir l'historique des commandes
    getOrders() {
        return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
    }

    // Ajouter une commande
    addOrder(orderData) {
        const orders = this.getOrders();
        const newOrder = {
            id: 'O' + Date.now().toString(36),
            ...orderData,
            date: new Date().toISOString(),
            status: 'En attente'
        };
        
        orders.push(newOrder);
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
        
        return newOrder;
    }

    // Mettre à jour le statut d'une commande
    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const orderIndex = orders.findIndex(order => order.id === orderId);
        
        if (orderIndex === -1) {
            throw new Error('Commande non trouvée');
        }
        
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
        
        return orders[orderIndex];
    }
}

// Instance globale
window.inventoryManager = new InventoryManager();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InventoryManager;
}
