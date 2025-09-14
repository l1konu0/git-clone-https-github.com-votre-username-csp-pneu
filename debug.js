// Script de débogage pour CSP Pneu
console.log('🔍 Script de débogage CSP Pneu chargé');

// Vérifier les scripts chargés
console.log('📜 Scripts chargés:');
const scripts = document.querySelectorAll('script[src]');
scripts.forEach((script, index) => {
    console.log(`${index + 1}. ${script.src}`);
});

// Vérifier les classes disponibles
console.log('🏗️ Classes disponibles:');
console.log('- AuthSystem:', typeof AuthSystem);
console.log('- OrderSystem:', typeof OrderSystem);
console.log('- InventoryManager:', typeof InventoryManager);

// Vérifier les instances globales
console.log('🌐 Instances globales:');
console.log('- window.authSystem:', window.authSystem);
console.log('- window.orderSystem:', window.orderSystem);
console.log('- window.inventoryManager:', window.inventoryManager);

// Vérifier les éléments DOM
console.log('🎯 Éléments DOM:');
console.log('- Bouton connexion:', document.querySelector('.btn-login'));
console.log('- Logo CSP:', document.querySelector('.logo-text'));

// Vérifier le localStorage
console.log('💾 LocalStorage:');
console.log('- auth_token:', localStorage.getItem('auth_token'));
console.log('- csp_cart:', localStorage.getItem('csp_cart'));

// Vérifier les erreurs JavaScript
window.addEventListener('error', (event) => {
    console.error('❌ Erreur JavaScript:', event.error);
    console.error('📍 Fichier:', event.filename);
    console.error('📍 Ligne:', event.lineno);
});

// Vérifier les erreurs de ressources
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Promise rejetée:', event.reason);
});

console.log('✅ Débogage terminé');
