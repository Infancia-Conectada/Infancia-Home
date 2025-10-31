// ========================================
// POLÍTICA DE PRIVACIDADE - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    const sections = document.querySelectorAll('.privacy-section[id]');
    const progressBar = document.getElementById('progressBar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Estado da aplicação
    let isMobileMenuOpen = false;
    let ticking = false;
    
    // ========================================
    // INICIALIZAÇÃO
    // ========================================
    init();
    
    function init() {
        setupMobileMenu();
        setupScrollTracking();
        setupProgressBar();
        setupScrollTopButton();
        setupSmoothScroll();
        setupAccessibility();
        setupAnimations();
        logPageView();
    }
    
    // ========================================
    // MENU MOBILE
    // ========================================
    function setupMobileMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Fechar menu ao clicar em um link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', handleOutsideClick);
        
        // Fechar menu com ESC
        document.addEventListener('keydown', handleEscapeKey);
        
        // Redimensionamento
        window.addEventListener('resize', handleResize);
    }
    
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        mobileMenuToggle.classList.toggle('active', isMobileMenuOpen);
        mobileNav.classList.toggle('active', isMobileMenuOpen);
        
        mobileMenuToggle.setAttribute('aria-expanded', isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        
        if (isMobileMenuOpen) {
            animateMenuItems();
        }
    }
    
    function closeMobileMenu() {
        if (isMobileMenuOpen) {
            isMobileMenuOpen = false;
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    function handleOutsideClick(e) {
        if (isMobileMenuOpen && !mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    function handleResize() {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    }
    
    function animateMenuItems() {
        const menuItems = mobileNav.querySelectorAll('.mobile-nav-link');
        
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    // ========================================
    // RASTREAMENTO DE SCROLL
    // ========================================
    function setupScrollTracking() {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    function handleScroll() {
        updateProgressBar();
        updateScrollTopButton();
        updateHeaderBackground();
    }
    
    function updateHeaderBackground() {
        if (!header) return;
        
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
        }
    }
    
     
    
    // ========================================
    // BARRA DE PROGRESSO
    // ========================================
    function setupProgressBar() {
        updateProgressBar();
    }
    
    function updateProgressBar() {
        if (!progressBar) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    // ========================================
    // BOTÃO VOLTAR AO TOPO
    // ========================================
    function setupScrollTopButton() {
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                trackEvent('Button', 'Click', 'Scroll to Top');
            });
        }
    }
    
    function updateScrollTopButton() {
        if (!scrollTopBtn) return;
        
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    }
    
    // ========================================
    // NAVEGAÇÃO SUAVE
    // ========================================
    function setupSmoothScroll() {
        const allLinks = [...mobileNavLinks];
        
        allLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offset = headerHeight + 60;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    closeMobileMenu();
                    trackEvent('Navigation', 'Click', targetId);
                }
            });
        });
    }
    
    // ========================================
    // ACESSIBILIDADE
    // ========================================
    function setupAccessibility() {
                
        // Focus visible para navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Focus trap no menu mobile
        if (mobileNav) {
            const focusableElements = mobileNav.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                mobileNav.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab' && isMobileMenuOpen) {
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusable) {
                                lastFocusable.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusable) {
                                firstFocusable.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            }
        }
    }
    
    // ========================================
    // ANIMAÇÕES DE ENTRADA
    // ========================================
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        const animateElements = document.querySelectorAll(
            '.purpose-card, .measure-item, .right-item, .cookie-card'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            el.style.transitionDelay = `${index * 0.05}s`;
            
            observer.observe(el);
        });
    }
    
    // ========================================
    // GESTÃO DE COOKIES (FUNÇÃO PÚBLICA)
    // ========================================
    window.openCookieSettings = function() {
        const modal = createCookieModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        trackEvent('Cookie Settings', 'Open', 'Modal');
    };
    
    function createCookieModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h3>Configurações de Cookies</h3>
                    <button class="cookie-modal-close" aria-label="Fechar">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label>
                                <input type="checkbox" checked disabled>
                                <span class="cookie-option-title">Cookies Essenciais</span>
                            </label>
                            <span class="cookie-badge required">Obrigatório</span>
                        </div>
                        <p class="cookie-option-desc">Necessários para o funcionamento básico do site.</p>
                    </div>
                    
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label>
                                <input type="checkbox" id="functionalCookies" checked>
                                <span class="cookie-option-title">Cookies Funcionais</span>
                            </label>
                            <span class="cookie-badge optional">Opcional</span>
                        </div>
                        <p class="cookie-option-desc">Melhoram sua experiência lembrando suas preferências.</p>
                    </div>
                    
                    <div class="cookie-option">
                        <div class="cookie-option-header">
                            <label>
                                <input type="checkbox" id="analyticsCookies" checked>
                                <span class="cookie-option-title">Cookies Analíticos</span>
                            </label>
                            <span class="cookie-badge optional">Opcional</span>
                        </div>
                        <p class="cookie-option-desc">Ajudam a entender como você usa o site (dados anonimizados).</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn secondary" onclick="closeAllCookieModal()">Cancelar</button>
                    <button class="cookie-btn primary" onclick="saveCookiePreferences()">Salvar Preferências</button>
                </div>
            </div>
        `;
        
        modal.querySelector('.cookie-modal-close').addEventListener('click', () => {
            closeModal(modal);
        });
        
        modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
            closeModal(modal);
        });
        
        return modal;
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    window.closeAllCookieModal = function() {
        const modal = document.querySelector('.cookie-modal');
        if (modal) {
            closeModal(modal);
        }
    };
    
    window.saveCookiePreferences = function() {
        const functionalCookies = document.getElementById('functionalCookies')?.checked || false;
        const analyticsCookies = document.getElementById('analyticsCookies')?.checked || false;
        
        const preferences = {
            essential: true,
            functional: functionalCookies,
            analytics: analyticsCookies,
            timestamp: new Date().toISOString()
        };
        
        console.log('Preferências de cookies salvas:', preferences);
        
        window.closeAllCookieModal();
        showNotification('Preferências de cookies salvas com sucesso!', 'success');
        trackEvent('Cookie Settings', 'Save', JSON.stringify(preferences));
    };
    
    // ========================================
    // SISTEMA DE NOTIFICAÇÕES
    // ========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const iconMap = {
            success: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
            error: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
            info: '<svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>'
        };
        
        notification.innerHTML = `
            ${iconMap[type] || iconMap.info}
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '24px',
            padding: '16px 20px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'}`,
            borderRadius: '12px',
            color: '#F1F5F9',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '99999',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // ========================================
    // ANALYTICS E TRACKING
    // ========================================
    function trackEvent(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics Event:', { category, action, label });
        }
    }
    
    function logPageView() {
        trackEvent('Page View', 'Privacy Policy', window.location.pathname);
        console.log('Página de Política de Privacidade carregada');
    }
    
    // ========================================
    // LOGS DE DESENVOLVIMENTO
    // ========================================
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🔒 Política de Privacidade Carregada', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
        console.log('Seções encontradas:', sections.length);
    }
});

// ========================================
// ESTILOS ADICIONAIS PARA MODAL DE COOKIES
// ========================================
const cookieModalStyles = document.createElement('style');
cookieModalStyles.textContent = `
    .cookie-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .cookie-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .cookie-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .cookie-modal-content {
        position: relative;
        max-width: 600px;
        width: 90%;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(241, 245, 249, 0.1);
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .cookie-modal.active .cookie-modal-content {
        transform: scale(1);
    }
    
    .cookie-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        border-bottom: 1px solid rgba(241, 245, 249, 0.1);
    }
    
    .cookie-modal-header h3 {
        font-size: 20px;
        font-weight: 700;
        color: #F1F5F9;
        margin: 0;
    }
    
    .cookie-modal-close {
        background: none;
        border: none;
        color: #94A3B8;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.3s;
    }
    
    .cookie-modal-close:hover {
        background: rgba(59, 130, 246, 0.1);
        color: #3B82F6;
    }
    
    .cookie-modal-body {
        padding: 24px;
        max-height: 400px;
        overflow-y: auto;
    }
    
    .cookie-option {
        margin-bottom: 20px;
        padding: 16px;
        background: rgba(59, 130, 246, 0.05);
        border: 1px solid rgba(59, 130, 246, 0.2);
        border-radius: 12px;
    }
    
    .cookie-option-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }
    
    .cookie-option-header label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    }
    
    .cookie-option-header input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
    .cookie-option-title {
        font-size: 16px;
        font-weight: 600;
        color: #F1F5F9;
    }
    
    .cookie-option-desc {
        font-size: 14px;
        color: #94A3B8;
        margin: 0;
    }
    
    .cookie-modal-footer {
        display: flex;
        gap: 12px;
        padding: 24px;
        border-top: 1px solid rgba(241, 245, 249, 0.1);
    }
    
    .cookie-btn {
        flex: 1;
        padding: 12px 24px;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .cookie-btn.primary {
        background: linear-gradient(135deg, #3B82F6, #22D3EE);
        color: #0F172A;
    }
    
    .cookie-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    }
    
    .cookie-btn.secondary {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        color: #F1F5F9;
    }
    
    .cookie-btn.secondary:hover {
        background: rgba(59, 130, 246, 0.2);
    }
`;
document.head.appendChild(cookieModalStyles);