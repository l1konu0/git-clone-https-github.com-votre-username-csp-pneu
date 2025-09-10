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
        } catch (error) {
            console.error('Erreur:', error);
            // Données de démonstration en cas d'erreur
            this.products = this.getDemoProducts();
            this.filteredProducts = [...this.products];
        }
    }

    getDemoProducts() {
        return [
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
                    <i class="fas fa-tire"></i>
                </div>
                <div class="product-info">
                    <h3>${product.marque} ${product.modele}</h3>
                    <p class="product-specs">
                        ${product.dimensions} - ${product.type}
                    </p>
                    <p class="product-description">
                        ${product.description}
                    </p>
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
