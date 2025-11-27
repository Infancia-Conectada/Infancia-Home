// ========================================
// INFÂNCIA CONECTADA - GALERIA JAVASCRIPT
// Sistema de Filtros e Animações
// ========================================

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== INICIALIZAÇÃO ==================== //
    initializeFilters();
    initializeScrollAnimations();
    initializeAlbumCards();
    
    // ==================== SISTEMA DE FILTROS ==================== //
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const albumCards = document.querySelectorAll('.album-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona active ao botão clicado
                this.classList.add('active');
                
                // Filtra os cards com animação
                filterAlbums(filter, albumCards);
            });
        });
    }
    
    function filterAlbums(filter, albumCards) {
        albumCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            // Aplica fade out
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    
                    // Anima entrada com delay escalonado
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.classList.add('hidden');
                }
            }, 300);
        });
        
        // Atualiza layout do grid
        updateGridLayout();
    }
    
    function updateGridLayout() {
        const grid = document.querySelector('.albums-grid');
        if (grid) {
            // Force reflow para animações suaves
            void grid.offsetWidth;
        }
    }
    
    // ==================== ANIMAÇÕES DE SCROLL ==================== //
    function initializeScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observa elementos que devem animar no scroll
        const animatedElements = document.querySelectorAll('.stat-card, .filter-btn, .album-card');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ==================== INTERAÇÕES COM CARDS ==================== //
    function initializeAlbumCards() {
        const albumCards = document.querySelectorAll('.album-card');
        
        albumCards.forEach(card => {
            // Adiciona efeito de parallax suave no hover
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    const image = this.querySelector('.album-image svg');
                    if (image) {
                        image.style.transform = `
                            scale(1.1) 
                            rotateX(${rotateX}deg) 
                            rotateY(${rotateY}deg)
                        `;
                    }
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('.album-image svg');
                if (image) {
                    image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
                }
            });
            
            // Efeito de ripple no click
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.album-link')) {
                    createRipple(e, this);
                }
            });
        });
    }
    
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // ==================== SMOOTH SCROLL PARA LINKS ==================== //
    const albumLinks = document.querySelectorAll('.album-link');
    albumLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==================== LAZY LOADING PARA IMAGENS ==================== //
    function lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('.album-image');
        images.forEach(img => imageObserver.observe(img));
    }
    
    lazyLoadImages();
    
    // ==================== CONTADOR ANIMADO PARA ESTATÍSTICAS ==================== //
    function animateCounter(element, target, duration = 1500) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Anima contadores quando visíveis
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                if (number && !number.classList.contains('animated')) {
                    const targetValue = parseInt(number.textContent);
                    number.classList.add('animated');
                    animateCounter(number, targetValue);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => statObserver.observe(card));
    
    // ==================== TECLADO NAVEGAÇÃO ==================== //
    document.addEventListener('keydown', function(e) {
        // ESC para voltar ao topo
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Navegação por arrows nos filtros
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
                const currentIndex = filterButtons.indexOf(activeFilter);
                
                let nextIndex;
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : filterButtons.length - 1;
                } else {
                    nextIndex = currentIndex < filterButtons.length - 1 ? currentIndex + 1 : 0;
                }
                
                filterButtons[nextIndex].click();
                filterButtons[nextIndex].focus();
            }
        }
    });
    
    // ==================== PERFORMANCE - DEBOUNCE ==================== //
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Otimiza resize
    window.addEventListener('resize', debounce(function() {
        updateGridLayout();
    }, 250));
    
    // ==================== ACESSIBILIDADE ==================== //
    // Adiciona feedback visual para navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // ==================== SCROLL PROGRESS INDICATOR ==================== //
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        // Pode ser usado para adicionar um indicador visual
        document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
    }
    
    window.addEventListener('scroll', debounce(updateScrollProgress, 10));
    
    // ==================== CONSOLE MESSAGE ==================== //
    console.log('%c🎨 Galeria Infância Conectada', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
    console.log('%cDesenvolvido com ❤️ para transformar vidas através da tecnologia', 'color: #22D3EE; font-size: 12px;');
    
    // ==================== ANALYTICS (OPCIONAL) ==================== //
    function trackAlbumView(albumId) {
        // Implementar tracking de visualizações
        console.log(`Álbum visualizado: ${albumId}`);
    }
    
    albumLinks.forEach(link => {
        link.addEventListener('click', function() {
            const card = this.closest('.album-card');
            const albumId = card.getAttribute('data-album');
            trackAlbumView(albumId);
        });
    });
});

// ==================== ESTILO CSS ADICIONAL PARA RIPPLE ==================== //
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
    
    .album-image svg {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
    }
`;
document.head.appendChild(style);