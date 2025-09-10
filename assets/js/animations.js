// ========================================
// ANIMATIONS ET EFFETS VISUELS
// ========================================

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Système de particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Taille aléatoire
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Effets de hover améliorés
function initHoverEffects() {
    // Effet de shake sur les boutons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('animate-bounce');
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('animate-bounce');
        });
    });

    // Effet de glow sur les cartes
    document.querySelectorAll('.brand-card, .card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate-glow');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate-glow');
        });
    });
}

// Animation de typing pour le titre
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title .highlight');
    if (!titleElement) return;

    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Démarrer l'animation après un délai
    setTimeout(typeWriter, 1000);
}

// Effet de parallaxe sur le background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Animation des statistiques (compteur)
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + counter.textContent.replace(/\d/g, '').replace(/[^\D]/g, '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + counter.textContent.replace(/\d/g, '').replace(/[^\D]/g, '');
            }
        };
        
        // Démarrer l'animation quand l'élément est visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Effet de loading
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Chargement...</p>
    `;
    document.body.appendChild(loading);
    
    // Supprimer après 2 secondes
    setTimeout(() => {
        loading.remove();
    }, 2000);
}

// Animation de notification améliorée
function showAnimatedNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slideInDown`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.add('animate-slideOut');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialisation de toutes les animations
function initAllAnimations() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            createParticles();
            initHoverEffects();
            initTypingAnimation();
            initParallaxEffect();
            animateCounters();
        });
    } else {
        initScrollAnimations();
        createParticles();
        initHoverEffects();
        initTypingAnimation();
        initParallaxEffect();
        animateCounters();
    }
}

// Démarrer les animations
initAllAnimations();

// Gestion du modal des marques
function openBrandModal(brandName) {
    const modal = document.getElementById('brandModal');
    const title = document.getElementById('brandModalTitle');
    const body = document.getElementById('brandModalBody');
    
    if (!modal) return;
    
    // Données des marques
    const brandData = {
        'Bridgestone': {
            description: 'Leader mondial des pneus avec une innovation constante et un engagement environnemental fort.',
            highlights: [
                { number: '90+', label: 'Pays' },
                { number: '140K+', label: 'Employés' },
                { number: '1931', label: 'Fondation' },
                { number: '100%', label: 'Qualité' }
            ],
            features: ['Performance', 'Durabilité', 'Écologie', 'Innovation'],
            icon: 'fas fa-circle'
        },
        'Continental': {
            description: 'Précision allemande et technologie de pointe pour des pneus de haute performance.',
            highlights: [
                { number: '150+', label: 'Années' },
                { number: '240K+', label: 'Employés' },
                { number: '1871', label: 'Fondation' },
                { number: '100%', label: 'Précision' }
            ],
            features: ['Précision', 'Technologie', 'Innovation', 'Performance'],
            icon: 'fas fa-cog'
        },
        'Michelin': {
            description: 'Excellence française reconnue mondialement pour la qualité et l\'innovation.',
            highlights: [
                { number: '130+', label: 'Années' },
                { number: '180K+', label: 'Employés' },
                { number: '1889', label: 'Fondation' },
                { number: '100%', label: 'Excellence' }
            ],
            features: ['Qualité', 'Innovation', 'Durabilité', 'Confort'],
            icon: 'fas fa-star'
        },
        'Pirelli': {
            description: 'Sport italien et luxe pour des pneus haute performance et esthétique.',
            highlights: [
                { number: '150+', label: 'Années' },
                { number: '30K+', label: 'Employés' },
                { number: '1872', label: 'Fondation' },
                { number: '100%', label: 'Sport' }
            ],
            features: ['Sport', 'Performance', 'Luxe', 'Esthétique'],
            icon: 'fas fa-bolt'
        },
        'Goodyear': {
            description: 'Tradition américaine et fiabilité pour tous types de véhicules.',
            highlights: [
                { number: '120+', label: 'Années' },
                { number: '64K+', label: 'Employés' },
                { number: '1898', label: 'Fondation' },
                { number: '100%', label: 'Fiabilité' }
            ],
            features: ['Fiabilité', 'Confort', 'Innovation', 'Durabilité'],
            icon: 'fas fa-shield-alt'
        },
        'Hankook': {
            description: 'Qualité coréenne avec un excellent rapport qualité-prix et innovation.',
            highlights: [
                { number: '80+', label: 'Années' },
                { number: '22K+', label: 'Employés' },
                { number: '1941', label: 'Fondation' },
                { number: '100%', label: 'Valeur' }
            ],
            features: ['Rapport qualité/prix', 'Innovation', 'Performance', 'Fiabilité'],
            icon: 'fas fa-gem'
        }
    };
    
    const brand = brandData[brandName];
    if (!brand) return;
    
    // Mettre à jour le titre
    title.textContent = brandName;
    
    // Générer le contenu du modal
    body.innerHTML = `
        <div class="brand-details">
            <div class="brand-details-logo">
                <div class="brand-logo">
                    <i class="${brand.icon}"></i>
                </div>
            </div>
            <div class="brand-details-info">
                <h4>${brandName}</h4>
                <p>${brand.description}</p>
                <div class="brand-features">
                    ${brand.features.map(feature => `<span>${feature}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="brand-highlights">
            ${brand.highlights.map(highlight => `
                <div class="brand-highlight">
                    <span class="brand-highlight-number">${highlight.number}</span>
                    <span class="brand-highlight-label">${highlight.label}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBrandModal() {
    const modal = document.getElementById('brandModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function viewBrandProducts() {
    showAnimatedNotification('Redirection vers le catalogue des produits...', 'info');
    setTimeout(() => {
        window.location.href = 'pages/catalog.html';
    }, 1500);
}

// Fermer le modal en cliquant sur le fond
document.addEventListener('click', (e) => {
    const modal = document.getElementById('brandModal');
    if (e.target === modal) {
        closeBrandModal();
    }
});

// Fermer le modal avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBrandModal();
    }
});

// Exporter les fonctions pour utilisation globale
window.showAnimatedNotification = showAnimatedNotification;
window.showLoading = showLoading;
window.openBrandModal = openBrandModal;
window.closeBrandModal = closeBrandModal;
window.viewBrandProducts = viewBrandProducts;
