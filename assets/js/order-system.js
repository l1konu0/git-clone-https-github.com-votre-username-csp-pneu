// ========================================
// SYSTÈME DE COMMANDE CSP
// ========================================

class OrderSystem {
    constructor() {
        this.cartKey = 'csp_cart';
        this.initOrderSystem();
    }

    initOrderSystem() {
        // Écouter les mises à jour de l'inventaire
        window.addEventListener('inventoryUpdated', () => {
            this.updateCatalogDisplay();
        });
    }

    // Ajouter un pneu au panier
    addToCart(tireId, quantity = 1) {
        try {
            // Vérifier la disponibilité
            const tire = window.inventoryManager.getTireById(tireId);
            if (!tire) {
                throw new Error('Pneu non trouvé');
            }

            if (tire.stock < quantity) {
                throw new Error(`Stock insuffisant. Disponible: ${tire.stock}`);
            }

            // Ajouter au panier
            const cart = this.getCart();
            const existingItem = cart.find(item => item.tireId === tireId);

            if (existingItem) {
                if (existingItem.quantity + quantity > tire.stock) {
                    throw new Error(`Quantité demandée supérieure au stock disponible`);
                }
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    tireId: tireId,
                    quantity: quantity,
                    addedAt: new Date().toISOString()
                });
            }

            localStorage.setItem(this.cartKey, JSON.stringify(cart));
            this.updateCartDisplay();
            this.showNotification('Pneu ajouté au panier', 'success');

        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    // Retirer un pneu du panier
    removeFromCart(tireId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.tireId !== tireId);
        localStorage.setItem(this.cartKey, JSON.stringify(filteredCart));
        this.updateCartDisplay();
        this.showNotification('Pneu retiré du panier', 'info');
    }

    // Mettre à jour la quantité d'un pneu dans le panier
    updateCartQuantity(tireId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(tireId);
            return;
        }

        const tire = window.inventoryManager.getTireById(tireId);
        if (!tire) {
            this.showNotification('Pneu non trouvé', 'error');
            return;
        }

        if (quantity > tire.stock) {
            this.showNotification(`Stock insuffisant. Disponible: ${tire.stock}`, 'error');
            return;
        }

        const cart = this.getCart();
        const item = cart.find(item => item.tireId === tireId);
        if (item) {
            item.quantity = quantity;
            localStorage.setItem(this.cartKey, JSON.stringify(cart));
            this.updateCartDisplay();
        }
    }

    // Obtenir le contenu du panier
    getCart() {
        return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    }

    // Vider le panier
    clearCart() {
        localStorage.removeItem(this.cartKey);
        this.updateCartDisplay();
    }

    // Obtenir les détails complets du panier
    getCartDetails() {
        const cart = this.getCart();
        return cart.map(item => {
            const tire = window.inventoryManager.getTireById(item.tireId);
            return {
                ...item,
                tire: tire,
                totalPrice: tire ? tire.price * item.quantity : 0
            };
        }).filter(item => item.tire); // Filtrer les pneus supprimés
    }

    // Calculer le total du panier
    getCartTotal() {
        const cartDetails = this.getCartDetails();
        return cartDetails.reduce((total, item) => total + item.totalPrice, 0);
    }

    // Passer la commande
    async processOrder(customerInfo) {
        try {
            const cartDetails = this.getCartDetails();
            
            if (cartDetails.length === 0) {
                throw new Error('Panier vide');
            }

            // Préparer les détails de commande pour l'API
            const orderDetails = cartDetails.map(item => ({
                pneu_id: item.tireId,
                quantite: item.quantity,
                prix_unitaire: item.tire.price || item.tire.prix
            }));

            // Envoyer la commande à l'API Supabase
            const response = await fetch('/api/commandes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: customerInfo.name,
                    email: customerInfo.email,
                    telephone: customerInfo.phone,
                    adresse: customerInfo.address,
                    total: this.getCartTotal(),
                    details: orderDetails
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la création de la commande');
            }

            const orderData = await response.json();
            const order = {
                id: orderData.id,
                customer: customerInfo,
                items: cartDetails,
                total: this.getCartTotal(),
                status: 'en_attente'
            };

            // Vider le panier
            this.clearCart();

            // Afficher la confirmation
            this.showOrderConfirmation(order);

            return order;

        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const cartCount = this.getCart().length;
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
        }

        // Mettre à jour le modal du panier
        this.updateCartModal();
    }

    // Mettre à jour le modal du panier
    updateCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (!cartModal) return;

        const cartDetails = this.getCartDetails();
        const cartContent = document.querySelector('.cart-content');
        
        if (!cartContent) return;

        if (cartDetails.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Votre panier est vide</h3>
                    <p>Ajoutez des pneus à votre panier pour commencer</p>
                    <a href="pages/catalog.html" class="btn btn-primary">Voir le catalogue</a>
                </div>
            `;
            return;
        }

        cartContent.innerHTML = `
            <div class="cart-items">
                ${cartDetails.map(item => `
                    <div class="cart-item" data-tire-id="${item.tireId}">
                        <div class="item-image">
                            <img src="${item.tire.image || 'assets/images/pneus/default.jpg'}" alt="${item.tire.brand} ${item.tire.model}">
                        </div>
                        <div class="item-details">
                            <h4>${item.tire.brand} ${item.tire.model}</h4>
                            <p class="item-size">${item.tire.size}</p>
                            <p class="item-season">${item.tire.season}</p>
                            <div class="item-controls">
                                <button class="btn-quantity" onclick="orderSystem.updateCartQuantity('${item.tireId}', ${item.quantity - 1})">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="btn-quantity" onclick="orderSystem.updateCartQuantity('${item.tireId}', ${item.quantity + 1})">+</button>
                                <button class="btn-remove" onclick="orderSystem.removeFromCart('${item.tireId}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="item-price">
                            <span class="price">${item.totalPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <div class="total">
                    <span>Total: <strong>${this.getCartTotal().toFixed(2)}€</strong></span>
                </div>
                <button class="btn btn-primary btn-checkout" onclick="orderSystem.showCheckoutForm()">
                    <i class="fas fa-credit-card"></i>
                    Commander
                </button>
            </div>
        `;
    }

    // Afficher le formulaire de commande
    showCheckoutForm() {
        const cartDetails = this.getCartDetails();
        if (cartDetails.length === 0) {
            this.showNotification('Panier vide', 'error');
            return;
        }

        const checkoutModal = document.createElement('div');
        checkoutModal.className = 'modal';
        checkoutModal.id = 'checkoutModal';
        checkoutModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Finaliser la commande</h2>
                    <button class="close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="checkoutForm">
                        <div class="form-group">
                            <label for="customerName">Nom complet *</label>
                            <input type="text" id="customerName" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="customerEmail">Email *</label>
                            <input type="email" id="customerEmail" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Téléphone *</label>
                            <input type="tel" id="customerPhone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="customerAddress">Adresse *</label>
                            <textarea id="customerAddress" name="address" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="deliveryDate">Date de livraison souhaitée</label>
                            <input type="date" id="deliveryDate" name="deliveryDate">
                        </div>
                        <div class="form-group">
                            <label for="notes">Notes (optionnel)</label>
                            <textarea id="notes" name="notes" rows="2"></textarea>
                        </div>
                        <div class="order-summary">
                            <h3>Résumé de la commande</h3>
                            ${cartDetails.map(item => `
                                <div class="summary-item">
                                    <span>${item.tire.brand} ${item.tire.model} x${item.quantity}</span>
                                    <span>${item.totalPrice.toFixed(2)}€</span>
                                </div>
                            `).join('')}
                            <div class="summary-total">
                                <strong>Total: ${this.getCartTotal().toFixed(2)}€</strong>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Annuler</button>
                    <button type="button" class="btn btn-primary" onclick="orderSystem.submitOrder()">Confirmer la commande</button>
                </div>
            </div>
        `;

        document.body.appendChild(checkoutModal);
    }

    // Soumettre la commande
    async submitOrder() {
        const form = document.getElementById('checkoutForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const customerInfo = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            deliveryDate: formData.get('deliveryDate'),
            notes: formData.get('notes')
        };

        try {
            const order = await this.processOrder(customerInfo);
            document.getElementById('checkoutModal').remove();
            this.showOrderConfirmation(order);
        } catch (error) {
            console.error('Erreur lors de la commande:', error);
        }
    }

    // Afficher la confirmation de commande
    showOrderConfirmation(order) {
        const confirmationModal = document.createElement('div');
        confirmationModal.className = 'modal';
        confirmationModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Commande confirmée !</h2>
                    <button class="close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Merci pour votre commande !</h3>
                    <p>Votre commande <strong>#${order.id}</strong> a été enregistrée avec succès.</p>
                    <div class="order-details">
                        <h4>Détails de la commande :</h4>
                        <p><strong>Client :</strong> ${order.customer.name}</p>
                        <p><strong>Email :</strong> ${order.customer.email}</p>
                        <p><strong>Téléphone :</strong> ${order.customer.phone}</p>
                        <p><strong>Total :</strong> ${order.total.toFixed(2)}€</p>
                        <p><strong>Statut :</strong> ${order.status}</p>
                    </div>
                    <p>Nous vous contacterons bientôt pour confirmer la livraison.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Fermer</button>
                </div>
            </div>
        `;

        document.body.appendChild(confirmationModal);
    }

    // Mettre à jour l'affichage du catalogue
    updateCatalogDisplay() {
        // Mettre à jour les boutons d'ajout au panier
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            const tireId = btn.dataset.tireId;
            const tire = window.inventoryManager.getTireById(tireId);
            
            if (tire) {
                if (tire.stock > 0) {
                    btn.disabled = false;
                    btn.textContent = `Ajouter au panier (${tire.stock} en stock)`;
                } else {
                    btn.disabled = true;
                    btn.textContent = 'Rupture de stock';
                }
            }
        });
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => notification.classList.add('show'), 100);

        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Instance globale
window.orderSystem = new OrderSystem();

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrderSystem;
}
