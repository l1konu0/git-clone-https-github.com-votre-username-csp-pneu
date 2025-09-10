// ========================================
// IMPORTATEUR DE DONNÉES EXCEL CSP
// ========================================

class ExcelImporter {
    constructor() {
        this.inventoryManager = window.inventoryManager;
    }

    // Simuler l'importation depuis un fichier Excel
    importFromExcel() {
        // Données simulées basées sur une structure Excel typique
        const excelData = [
            {
                brand: 'Michelin',
                model: 'Pilot Sport 4',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'V',
                season: 'Été',
                price: 89.90,
                stock: 12,
                category: 'Sport',
                description: 'Pneu haute performance pour voitures sportives'
            },
            {
                brand: 'Continental',
                model: 'PremiumContact 6',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: 'Été',
                price: 79.90,
                stock: 8,
                category: 'Confort',
                description: 'Pneu confort et silence pour usage quotidien'
            },
            {
                brand: 'Bridgestone',
                model: 'Turanza T005',
                size: '225/45R17',
                loadIndex: '91',
                speedRating: 'W',
                season: 'Été',
                price: 95.50,
                stock: 15,
                category: 'Premium',
                description: 'Pneu premium pour berlines et coupés'
            },
            {
                brand: 'Michelin',
                model: 'CrossClimate+',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'H',
                season: '4 Saisons',
                price: 109.90,
                stock: 6,
                category: '4 Saisons',
                description: 'Pneu 4 saisons haute performance'
            },
            {
                brand: 'Goodyear',
                model: 'Vector 4Seasons Gen-3',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: '4 Saisons',
                price: 84.90,
                stock: 10,
                category: '4 Saisons',
                description: 'Pneu 4 saisons nouvelle génération'
            },
            {
                brand: 'Nokian',
                model: 'Hakkapeliitta R5',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'H',
                season: 'Hiver',
                price: 119.90,
                stock: 4,
                category: 'Hiver',
                description: 'Pneu hiver premium pour conditions extrêmes'
            },
            {
                brand: 'Continental',
                model: 'WinterContact TS 860',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: 'Hiver',
                price: 89.90,
                stock: 7,
                category: 'Hiver',
                description: 'Pneu hiver pour usage urbain et autoroute'
            },
            {
                brand: 'Michelin',
                model: 'Agilis 3',
                size: '195/70R15C',
                loadIndex: '104/102',
                speedRating: 'R',
                season: 'Toutes saisons',
                price: 125.90,
                stock: 3,
                category: 'Utilitaire',
                description: 'Pneu utilitaire renforcé pour véhicules commerciaux'
            },
            {
                brand: 'Continental',
                model: 'VanContact 4Season',
                size: '205/65R16C',
                loadIndex: '107/105',
                speedRating: 'R',
                season: '4 Saisons',
                price: 135.90,
                stock: 5,
                category: 'Utilitaire',
                description: 'Pneu utilitaire 4 saisons pour fourgons'
            },
            {
                brand: 'BF Goodrich',
                model: 'All-Terrain T/A KO2',
                size: '265/70R16',
                loadIndex: '112',
                speedRating: 'S',
                season: 'Toutes saisons',
                price: 189.90,
                stock: 2,
                category: '4x4',
                description: 'Pneu tout-terrain pour 4x4 et pick-ups'
            },
            // Ajout de plus de pneus pour enrichir l'inventaire
            {
                brand: 'Pirelli',
                model: 'P Zero',
                size: '245/40R18',
                loadIndex: '93',
                speedRating: 'Y',
                season: 'Été',
                price: 145.90,
                stock: 8,
                category: 'Sport',
                description: 'Pneu ultra haute performance pour supercars'
            },
            {
                brand: 'Hankook',
                model: 'Ventus Prime 3',
                size: '225/50R17',
                loadIndex: '98',
                speedRating: 'W',
                season: 'Été',
                price: 75.90,
                stock: 12,
                category: 'Confort',
                description: 'Pneu confort et économie pour usage quotidien'
            },
            {
                brand: 'Dunlop',
                model: 'Sport Maxx RT2',
                size: '235/45R17',
                loadIndex: '94',
                speedRating: 'Y',
                season: 'Été',
                price: 98.90,
                stock: 6,
                category: 'Sport',
                description: 'Pneu sport pour voitures de sport'
            },
            {
                brand: 'Yokohama',
                model: 'Advan Sport V105',
                size: '255/35R19',
                loadIndex: '96',
                speedRating: 'Y',
                season: 'Été',
                price: 165.90,
                stock: 4,
                category: 'Sport',
                description: 'Pneu ultra haute performance pour voitures de luxe'
            },
            {
                brand: 'Falken',
                model: 'Eurowinter HS01',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'H',
                season: 'Hiver',
                price: 69.90,
                stock: 9,
                category: 'Hiver',
                description: 'Pneu hiver économique pour usage urbain'
            },
            {
                brand: 'Kumho',
                model: 'Ecsta PS31',
                size: '215/45R17',
                loadIndex: '91',
                speedRating: 'W',
                season: 'Été',
                price: 82.90,
                stock: 7,
                category: 'Sport',
                description: 'Pneu sport haute performance'
            },
            {
                brand: 'Toyo',
                model: 'Proxes Sport',
                size: '225/40R18',
                loadIndex: '92',
                speedRating: 'Y',
                season: 'Été',
                price: 95.90,
                stock: 5,
                category: 'Sport',
                description: 'Pneu sport pour voitures de sport'
            },
            {
                brand: 'Nexen',
                model: 'N\'Fera SU1',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: 'Été',
                price: 58.90,
                stock: 14,
                category: 'Confort',
                description: 'Pneu confort et silence économique'
            },
            {
                brand: 'Maxxis',
                model: 'Premitra HP5',
                size: '205/55R16',
                loadIndex: '91',
                speedRating: 'V',
                season: 'Été',
                price: 65.90,
                stock: 11,
                category: 'Confort',
                description: 'Pneu confort et économie'
            },
            {
                brand: 'Vredestein',
                model: 'Quatrac 5',
                size: '215/60R16',
                loadIndex: '95',
                speedRating: 'H',
                season: '4 Saisons',
                price: 89.90,
                stock: 8,
                category: '4 Saisons',
                description: 'Pneu 4 saisons premium'
            }
        ];

        // Importer chaque pneu
        let importedCount = 0;
        excelData.forEach(tireData => {
            try {
                this.inventoryManager.addTire(tireData);
                importedCount++;
            } catch (error) {
                console.error('Erreur lors de l\'importation:', error);
            }
        });

        return {
            success: true,
            imported: importedCount,
            total: excelData.length
        };
    }

    // Fonction pour traiter un fichier Excel réel (si disponible)
    async processExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    // Ici, vous pourriez utiliser une bibliothèque comme SheetJS
                    // pour traiter le fichier Excel réel
                    const data = e.target.result;
                    
                    // Simulation du traitement
                    const result = this.importFromExcel();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
            reader.readAsArrayBuffer(file);
        });
    }

    // Exporter les données vers Excel
    exportToExcel() {
        const inventory = this.inventoryManager.getAllTires();
        const csvContent = this.convertToCSV(inventory);
        this.downloadCSV(csvContent, 'inventaire-csp.csv');
    }

    // Convertir les données en CSV
    convertToCSV(data) {
        const headers = [
            'ID', 'Marque', 'Modèle', 'Taille', 'Indice de charge', 
            'Indice de vitesse', 'Saison', 'Prix', 'Stock', 'Catégorie', 'Description'
        ];
        
        const csvRows = [headers.join(',')];
        
        data.forEach(tire => {
            const row = [
                tire.id,
                tire.brand,
                tire.model,
                tire.size,
                tire.loadIndex,
                tire.speedRating,
                tire.season,
                tire.price,
                tire.stock,
                tire.category,
                `"${tire.description}"`
            ];
            csvRows.push(row.join(','));
        });
        
        return csvRows.join('\n');
    }

    // Télécharger le fichier CSV
    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Synchroniser avec un serveur (simulation)
    async syncWithServer() {
        try {
            // Simulation d'une synchronisation avec un serveur
            const inventory = this.inventoryManager.getAllTires();
            const orders = this.inventoryManager.getOrders();
            
            // Ici, vous feriez un appel API réel
            console.log('Synchronisation avec le serveur...', {
                inventory: inventory.length,
                orders: orders.length
            });
            
            return {
                success: true,
                message: 'Synchronisation réussie'
            };
        } catch (error) {
            console.error('Erreur de synchronisation:', error);
            return {
                success: false,
                message: 'Erreur de synchronisation'
            };
        }
    }
}

// Instance globale
window.excelImporter = new ExcelImporter();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExcelImporter;
}
