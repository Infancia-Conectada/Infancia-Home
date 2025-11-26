// JavaScript Unificado - Infância Conectada
document.addEventListener('DOMContentLoaded', function() {

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

    /* =========================================================
       PARTNERS CAROUSEL - SCROLL AUTOMÁTICO
    ========================================================= */
    const partnersCarousel = document.querySelector('.partners-carousel');
    
    function initPartnersCarousel() {
        if (!partnersCarousel) return;
        
        // Duplicar os cards para criar efeito infinito
        const partnerCards = Array.from(partnersCarousel.children);
        partnerCards.forEach(card => {
            const clone = card.cloneNode(true);
            partnersCarousel.appendChild(clone);
        });

        // Pausar/retomar animação com hover
        partnersCarousel.addEventListener('mouseenter', () => {
            partnersCarousel.style.animationPlayState = 'paused';
        });

        partnersCarousel.addEventListener('mouseleave', () => {
            partnersCarousel.style.animationPlayState = 'running';
        });

        // Acessibilidade: pausar com foco nos links
        const allPartnerLinks = partnersCarousel.querySelectorAll('.partner-card');
        allPartnerLinks.forEach(link => {
            link.addEventListener('focus', () => {
                partnersCarousel.style.animationPlayState = 'paused';
            });
            
            link.addEventListener('blur', () => {
                setTimeout(() => {
                    if (!partnersCarousel.contains(document.activeElement)) {
                        partnersCarousel.style.animationPlayState = 'running';
                    }
                }, 100);
            });
        });

        // Pausar em dispositivos com preferência de movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            partnersCarousel.style.animation = 'none';
        }

        // Ajustar velocidade baseada no número de parceiros
        const partnerCount = partnerCards.length;
        const baseSpeed = 30; // segundos
        const adjustedSpeed = Math.max(20, baseSpeed * (partnerCount / 6));
        partnersCarousel.style.animationDuration = `${adjustedSpeed}s`;
    }

    initPartnersCarousel();



    /* =========================================================
       SCROLL REVEAL ANIMATIONS
    ========================================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que devem animar ao entrar na viewport
    const animatedElements = document.querySelectorAll('.project-card, .partner-card, .glass-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    /* =========================================================
       PERFORMANCE OPTIMIZATION
    ========================================================= */
    // Lazy loading para imagens dos parceiros
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('.partner-logo img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    // Reduzir animações em dispositivos com bateria fraca
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 && !battery.charging) {
                document.body.classList.add('reduced-motion');
                if (partnersCarousel) {
                    partnersCarousel.style.animation = 'none';
                }
            }
        });
    }
});