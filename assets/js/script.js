// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Animation des cartes au scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .product-card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < windowHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialiser les cartes comme invisibles
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animer au scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Animer les cartes visibles au chargement
});

// Filtres du catalogue
function initCatalogFilters() {
    const marqueFilter = document.getElementById('marque');
    const typeFilter = document.getElementById('type');
    const prixFilter = document.getElementById('prix');
    const prixValue = document.getElementById('prix-value');
    const products = document.querySelectorAll('.product-card');
    
    if (!marqueFilter || !typeFilter || !prixFilter || !prixValue || !products.length) return;
    
    function filterProducts() {
        const marqueValue = marqueFilter.value.toLowerCase();
        const typeValue = typeFilter.value.toLowerCase();
        const prixValue = parseInt(prixFilter.value);
        
        products.forEach(product => {
            const productMarque = product.dataset.marque.toLowerCase();
            const productType = product.dataset.type.toLowerCase();
            const productPrix = parseInt(product.dataset.prix);
            
            const marqueMatch = !marqueValue || productMarque.includes(marqueValue);
            const typeMatch = !typeValue || productType.includes(typeValue);
            const prixMatch = productPrix <= prixValue;
            
            if (marqueMatch && typeMatch && prixMatch) {
                product.style.display = 'block';
                product.style.animation = 'fadeIn 0.3s ease';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    marqueFilter.addEventListener('change', filterProducts);
    typeFilter.addEventListener('change', filterProducts);
    prixFilter.addEventListener('input', function() {
        prixValue.textContent = this.value + '€';
        filterProducts();
    });
}

// Initialiser les filtres si on est sur la page catalogue
if (window.location.pathname.includes('catalog.php')) {
    document.addEventListener('DOMContentLoaded', initCatalogFilters);
}

// Fonction pour contacter pour un pneu
function contactPneu(pneuId) {
    if (confirm('Voulez-vous demander un devis pour ce pneu ?\n\nVous serez redirigé vers la page de contact.')) {
        window.location.href = 'contact.php?pneu=' + pneuId;
    }
}

// Animation de chargement pour les formulaires
function initFormAnimations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;
            }
        });
    });
}

// Initialiser les animations de formulaire
document.addEventListener('DOMContentLoaded', initFormAnimations);

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Validation des formulaires
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Validation email
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (field.value && !emailRegex.test(field.value)) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        }
    });
    
    return isValid;
}

// Ajouter la validation aux formulaires
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Veuillez remplir correctement tous les champs obligatoires.');
            }
        });
    });
});

// Animation CSS pour les cartes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);
