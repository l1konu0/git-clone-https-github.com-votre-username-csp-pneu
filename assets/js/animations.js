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

// Exporter les fonctions pour utilisation globale
window.showAnimatedNotification = showAnimatedNotification;
window.showLoading = showLoading;
