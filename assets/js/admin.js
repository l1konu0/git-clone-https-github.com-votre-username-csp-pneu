// Gestion de l'interface d'administration
class AdminManager {
    constructor() {
        this.pneus = [];
        this.init();
    }

    async init() {
        await this.loadPneus();
        this.setupEventListeners();
        this.updateStats();
    }

    async loadPneus() {
        try {
            const response = await fetch('/api/pneus');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des pneus');
            }
            this.pneus = await response.json();
            this.renderPneusTable();
        } catch (error) {
            console.error('Erreur:', error);
            this.showError('Erreur lors du chargement des pneus');
        }
    }

    setupEventListeners() {
        // Formulaire d'ajout de pneu
        const addForm = document.getElementById('addPneuForm');
        if (addForm) {
            addForm.addEventListener('submit', (e) => this.handleAddPneu(e));
        }
    }

    async handleAddPneu(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            marque: formData.get('marque'),
            modele: formData.get('modele'),
            dimensions: formData.get('dimensions'),
            type: formData.get('type'),
            prix: parseFloat(formData.get('prix')),
            stock: parseInt(formData.get('stock')),
            description: formData.get('description')
        };

        try {
            const response = await fetch('/api/pneus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                this.showSuccess('Pneu ajouté avec succès');
                this.closeAddPneuModal();
                await this.loadPneus();
                this.updateStats();
            } else {
                this.showError(result.error || 'Erreur lors de l\'ajout du pneu');
            }
        } catch (error) {
            console.error('Erreur:', error);
            this.showError('Erreur de connexion');
        }
    }

    renderPneusTable() {
        const tbody = document.getElementById('pneusTableBody');
        if (!tbody) return;

        if (this.pneus.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="no-data">
                        <i class="fas fa-inbox"></i>
                        Aucun pneu trouvé
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.pneus.map(pneu => `
            <tr>
                <td>${pneu.id}</td>
                <td>${pneu.marque}</td>
                <td>${pneu.modele}</td>
                <td>${pneu.dimensions}</td>
                <td>
                    <span class="type-badge type-${pneu.type}">${pneu.type}</span>
                </td>
                <td>${pneu.prix.toFixed(2)}€</td>
                <td>
                    <span class="stock-badge ${pneu.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${pneu.stock}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm" onclick="editPneu(${pneu.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deletePneu(${pneu.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateStats() {
        const totalPneus = this.pneus.length;
        const prixMoyen = totalPneus > 0 ? 
            (this.pneus.reduce((sum, p) => sum + p.prix, 0) / totalPneus).toFixed(2) : 0;
        const stockTotal = this.pneus.reduce((sum, p) => sum + p.stock, 0);
        const marquesUniques = new Set(this.pneus.map(p => p.marque)).size;

        document.getElementById('totalPneus').textContent = totalPneus;
        document.getElementById('prixMoyen').textContent = prixMoyen + '€';
        document.getElementById('stockTotal').textContent = stockTotal;
        document.getElementById('marquesUniques').textContent = marquesUniques;
    }

    showSuccess(message) {
        this.showAlert(message, 'success');
    }

    showError(message) {
        this.showAlert(message, 'error');
    }

    showAlert(message, type) {
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        document.body.insertBefore(alert, document.body.firstChild);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Fonctions globales
function openAddPneuModal() {
    document.getElementById('addPneuModal').style.display = 'block';
}

function closeAddPneuModal() {
    document.getElementById('addPneuModal').style.display = 'none';
    document.getElementById('addPneuForm').reset();
}

function refreshPneus() {
    if (window.adminManager) {
        window.adminManager.loadPneus();
        window.adminManager.updateStats();
    }
}

function exportPneus() {
    if (window.adminManager && window.adminManager.pneus.length > 0) {
        const csv = convertToCSV(window.adminManager.pneus);
        downloadCSV(csv, 'catalogue-pneus.csv');
    }
}

function convertToCSV(data) {
    const headers = ['ID', 'Marque', 'Modèle', 'Dimensions', 'Type', 'Prix', 'Stock', 'Description'];
    const rows = data.map(pneu => [
        pneu.id,
        pneu.marque,
        pneu.modele,
        pneu.dimensions,
        pneu.type,
        pneu.prix,
        pneu.stock,
        pneu.description || ''
    ]);

    return [headers, ...rows].map(row => 
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function editPneu(id) {
    // Fonctionnalité d'édition à implémenter
    alert('Fonctionnalité d\'édition à venir pour le pneu ID: ' + id);
}

function deletePneu(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pneu ?')) {
        // Fonctionnalité de suppression à implémenter
        alert('Fonctionnalité de suppression à venir pour le pneu ID: ' + id);
    }
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('addPneuModal');
    if (event.target === modal) {
        closeAddPneuModal();
    }
}

// Initialiser l'administration
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin/')) {
        window.adminManager = new AdminManager();
    }
});
