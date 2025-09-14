// Gestion du catalogue de pneus
class CatalogManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupFilters();
        this.renderProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/pneus');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des produits');
            }
            this.products = await response.json();
            this.filteredProducts = [...this.products];
            console.log('Produits chargés depuis Supabase:', this.products.length);
        } catch (error) {
            console.error('Erreur API:', error);
            // Données de démonstration en cas d'erreur
            this.products = this.getDemoProducts();
            this.filteredProducts = [...this.products];
            console.log('Utilisation des données de démonstration');
        }
    }

    getDemoProducts() {
        return [
            {
                id: 1,
                marque: 'Michelin',
                modele: 'Pilot Sport 4',
                dimensions: '245/40 ZR18',
                type: 'été',
                prix: 145.00,
                stock: 10,
                description: 'Pneu sport ultra haute performance pour véhicules sportifs',
                image: 'https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4xe194hr9qcgqyy/4w-238_3528700093414_tire_michelin_pilot-sport-4_245-slash-40-zr18-97y-xl_a_main_1-30_nopad.webp?t=resize&height=500',
                specifications: {
                    loadIndex: '97',
                    speedRating: 'Y',
                    extraLoad: true,
                    utqg: {
                        traction: 'A',
                        temperature: 'A',
                        treadwear: 300
                    }
                }
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
    }

    setupFilters() {
        const marqueFilter = document.getElementById('marque');
        const typeFilter = document.getElementById('type');
        const prixFilter = document.getElementById('prix');
        const prixValue = document.getElementById('prix-value');

        if (marqueFilter) {
            marqueFilter.addEventListener('change', () => this.filterProducts());
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterProducts());
        }

        if (prixFilter && prixValue) {
            prixFilter.addEventListener('input', (e) => {
                prixValue.textContent = e.target.value + '€';
                this.filterProducts();
            });
        }
    }

    filterProducts() {
        const marqueValue = document.getElementById('marque')?.value.toLowerCase() || '';
        const typeValue = document.getElementById('type')?.value.toLowerCase() || '';
        const prixValue = parseInt(document.getElementById('prix')?.value) || 500;

        this.filteredProducts = this.products.filter(product => {
            const marqueMatch = !marqueValue || product.marque.toLowerCase().includes(marqueValue);
            const typeMatch = !typeValue || product.type.toLowerCase().includes(typeValue);
            const prixMatch = product.prix <= prixValue;

            return marqueMatch && typeMatch && prixMatch;
        });

        this.renderProducts();
    }

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        if (this.filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <p>Aucun pneu trouvé avec ces critères.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = this.filteredProducts.map(product => `
            <div class="product-card" data-marque="${product.marque}" data-type="${product.type}" data-prix="${product.prix}">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.marque} ${product.modele}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">` : 
                        `<i class="fas fa-tire"></i>`
                    }
                    ${product.specifications && product.specifications.extraLoad ? 
                        `<div class="product-badge xl-badge">XL</div>` : ''
                    }
                </div>
                <div class="product-info">
                    <h3>${product.marque} ${product.modele}</h3>
                    <p class="product-specs">
                        ${product.dimensions} - ${product.type}
                        ${product.specifications ? 
                            ` (${product.specifications.loadIndex}${product.specifications.speedRating})` : ''
                        }
                    </p>
                    <p class="product-description">
                        ${product.description}
                    </p>
                    ${product.specifications && product.specifications.utqg ? 
                        `<div class="product-ratings">
                            <span class="rating">Traction: ${product.specifications.utqg.traction}</span>
                            <span class="rating">Température: ${product.specifications.utqg.temperature}</span>
                            <span class="rating">Usure: ${product.specifications.utqg.treadwear}</span>
                        </div>` : ''
                    }
                    <div class="product-price">
                        <span class="price">${product.prix.toFixed(2)}€</span>
                        <span class="stock">Stock: ${product.stock}</span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.marque} ${product.modele}', ${product.prix})">
                        <i class="fas fa-shopping-cart"></i>
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `).join('');
    }
}


// Initialiser le catalogue quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('catalog.html')) {
        new CatalogManager();
    }
});
