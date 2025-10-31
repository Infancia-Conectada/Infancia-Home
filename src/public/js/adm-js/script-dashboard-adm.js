// ============================================
// DASHBOARD ADMINISTRATIVO - INCLUSÃO DIGITAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// ============================================
// INICIALIZAÇÃO DO DASHBOARD
// ============================================
function initializeDashboard() {
    setupNavigationHandlers();
    setupCardInteractions();
    setupNotifications();
    animateStatsOnLoad();
    
    console.log('Dashboard inicializado com sucesso!');
}

// ============================================
// NAVEGAÇÃO
// ============================================
function setupNavigationHandlers() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adiciona active ao item clicado
            this.classList.add('active');
            
            // Adiciona feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Aqui você pode adicionar lógica para navegar entre seções
            const sectionName = this.querySelector('span:not(.nav-icon)').textContent;
            console.log(`Navegando para: ${sectionName}`);
        });
    });
}

// ============================================
// INTERAÇÕES DOS CARDS
// ============================================
function setupCardInteractions() {
    const actionCards = document.querySelectorAll('.action-card');
    const cardButtons = document.querySelectorAll('.card-button');
    
    // Adiciona efeito de hover nos cards
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Adiciona funcionalidade aos botões dos cards
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const card = this.closest('.action-card');
            const cardTitle = card.querySelector('.card-title').textContent;
            
            // Efeito visual de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Lógica específica por tipo de card
            handleCardAction(cardTitle);
        });
    });
}

// ============================================
// AÇÕES DOS CARDS
// ============================================
function handleCardAction(cardTitle) {
    switch(cardTitle) {
        case 'Cadastro de Instituição':
            console.log('Abrindo formulário de cadastro de instituição...');
            // Aqui você pode adicionar navegação ou abrir modal
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        case 'Gerenciar Usuários':
            console.log('Acessando gerenciamento de usuários...');
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        case 'Biblioteca de Conteúdos':
            console.log('Abrindo biblioteca de conteúdos...');
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        case 'Relatórios e Métricas':
            console.log('Gerando relatórios...');
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        case 'Upload de Materiais':
            console.log('Abrindo interface de upload...');
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        case 'Agendamentos':
            console.log('Abrindo agenda...');
            showNotification('Funcionalidade em desenvolvimento', 'info');
            break;
            
        default:
            console.log(`Ação não definida para: ${cardTitle}`);
    }
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            console.log('Abrindo painel de notificações...');
            showNotification('3 novas notificações', 'info');
            
            // Aqui você pode adicionar um dropdown de notificações
        });
    }
}

// Função para mostrar notificação temporária
function showNotification(message, type = 'info') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.toast-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getNotificationIcon(type)}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Adiciona estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        padding: '16px 24px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        color: '#F1F5F9',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    return icons[type] || icons['info'];
}

// ============================================
// ANIMAÇÃO DAS ESTATÍSTICAS
// ============================================
function animateStatsOnLoad() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50);
        const delay = index * 100;
        
        setTimeout(() => {
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(interval);
                }
                stat.textContent = currentValue + (stat.textContent.includes('%') ? '%' : '');
            }, 20);
        }, delay);
    });
}

// ============================================
// UTILITÁRIOS
// ============================================

// Função para formatar números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Função para obter data formatada
function getFormattedDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date().toLocaleDateString('pt-BR', options);
}

// Adiciona animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .toast-icon {
        font-size: 20px;
    }
`;
document.head.appendChild(style);

// ============================================
// EXPORTAÇÕES (para uso modular)
// ============================================
window.DashboardAdmin = {
    showNotification,
    formatNumber,
    getFormattedDate,
    handleCardAction
};