// JavaScript Unificado - Infância Conectada
document.addEventListener('DOMContentLoaded', function() {
    /* =========================================================
       HEADER
    ========================================================= */
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const userMenu = document.getElementById('userMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let isMobileMenuOpen = false;
    let isUserMenuOpen = false;

    function initHeader() {
        setupEventListeners();
        setupScrollEffects();
        setupActiveNavigation();
        setupAccessibility();
    }

    function setupEventListeners() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
        if (userMenu) userMenu.addEventListener('click', toggleUserMenu);
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('resize', handleResize);
        setupSmoothScroll();
    }

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileMenuToggle.classList.toggle('active', isMobileMenuOpen);
        mobileNav.classList.toggle('active', isMobileMenuOpen);
        mobileMenuToggle.setAttribute('aria-expanded', isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        if (isMobileMenuOpen) animateMenuItems();
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

    function toggleUserMenu(e) {
        e.stopPropagation();
        isUserMenuOpen = !isUserMenuOpen;
        userMenu.classList.toggle('active', isUserMenuOpen);
    }

    function closeUserMenu() {
        if (isUserMenuOpen) {
            isUserMenuOpen = false;
            userMenu.classList.remove('active');
        }
    }

    function handleOutsideClick(e) {
        if (isMobileMenuOpen && !mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
        if (isUserMenuOpen && userMenu && !userMenu.contains(e.target)) {
            closeUserMenu();
        }
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeUserMenu();
        }
    }

    function handleResize() {
        if (window.innerWidth > 1024) closeMobileMenu();
    }

    function setupScrollEffects() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function setupActiveNavigation() {
        const currentPath = window.location.hash || '#home';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPath);
            link.addEventListener('click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function setupSmoothScroll() {
        [...navLinks, ...mobileNavLinks].forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        window.scrollTo({
                            top: target.offsetTop - headerHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                    closeMobileMenu();
                }
            });
        });
    }

    function animateMenuItems() {
        const items = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-login-btn');
        items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, i * 50);
        });
    }

    function setupAccessibility() {
        navLinks.forEach(link => {
            link.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    // Simulação de login/logout
    window.simulateLogin = function(type) {
        document.querySelector('.login-buttons')?.classList.add('hidden');
        userMenu?.classList.remove('hidden');
        showNotification(`Login realizado como ${type}`, 'success');
    };

    window.logout = function() {
        document.querySelector('.login-buttons')?.classList.remove('hidden');
        userMenu?.classList.add('hidden');
        closeUserMenu();
        showNotification('Logout realizado com sucesso', 'info');
    };

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'}`,
            borderRadius: '12px',
            color: '#F1F5F9',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        document.body.appendChild(notification);
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initHeader();

    /* =========================================================
       BANNER CAROUSEL
    ========================================================= */
    const bannerCarousel = document.querySelector('.banner-carousel');
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0, isTransitioning = false, autoPlayInterval;
    const autoPlayDelay = 5000, transitionDuration = 1000;

    function initCarousel() {
        if (!slides.length || !indicators.length) return;
        setupCarouselEvents();
        startAutoPlay();
        updateAriaLabels();
    }

    function setupCarouselEvents() {
        indicators.forEach((ind, i) => ind.addEventListener('click', () => goToSlide(i)));
        if (bannerCarousel) {
            bannerCarousel.addEventListener('mouseenter', pauseAutoPlay);
            bannerCarousel.addEventListener('mouseleave', startAutoPlay);
        }
        document.addEventListener('keydown', handleKeyNavigation);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('resize', handleResize);
        setupTouchSupport();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        updateAriaLabels();
        isTransitioning = true;
        setTimeout(() => { isTransitioning = false; }, transitionDuration);
        resetAutoPlay();
    }

    function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
    function prevSlide() { goToSlide((currentSlide - 1 + slides.length) % slides.length); }

    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (!isTransitioning && document.visibilityState === 'visible') nextSlide();
        }, autoPlayDelay);
    }

    function pauseAutoPlay() { clearInterval(autoPlayInterval); autoPlayInterval = null; }
    function resetAutoPlay() { pauseAutoPlay(); startAutoPlay(); }

    function handleKeyNavigation(e) {
        if (!isBannerInView()) return;
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === ' ') { autoPlayInterval ? pauseAutoPlay() : startAutoPlay(); }
    }

    function isBannerInView() {
        if (!bannerCarousel) return false;
        const rect = bannerCarousel.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function handleVisibilityChange() { document.hidden ? pauseAutoPlay() : startAutoPlay(); }

    function handleResize() {
        pauseAutoPlay();
        clearTimeout(window.bannerResizeTimeout);
        window.bannerResizeTimeout = setTimeout(() => { if (document.visibilityState === 'visible') startAutoPlay(); }, 500);
    }

    function updateAriaLabels() {
        indicators.forEach((ind, i) => {
            const active = i === currentSlide;
            ind.setAttribute('aria-pressed', active);
            ind.setAttribute('aria-label', `${active ? 'Slide atual' : 'Ir para slide'} ${i + 1} de ${slides.length}`);
        });
    }

    function setupTouchSupport() {
        if (!bannerCarousel) return;
        let startX = 0, startY = 0, scrolling = false;
        bannerCarousel.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            scrolling = false;
            pauseAutoPlay();
        }, { passive: true });
        bannerCarousel.addEventListener('touchmove', e => {
            if (!startX || !startY) return;
            const dx = startX - e.touches[0].clientX;
            const dy = startY - e.touches[0].clientY;
            if (!scrolling) scrolling = Math.abs(dy) > Math.abs(dx);
            if (!scrolling && Math.abs(dx) > 10) e.preventDefault();
        }, { passive: false });
        bannerCarousel.addEventListener('touchend', e => {
            if (!startX || !startY || scrolling) { startAutoPlay(); return; }
            const diffX = startX - e.changedTouches[0].clientX;
            if (Math.abs(diffX) > 50) diffX > 0 ? nextSlide() : prevSlide();
            else startAutoPlay();
            startX = startY = 0; scrolling = false;
        }, { passive: true });
    }

    initCarousel();
});
