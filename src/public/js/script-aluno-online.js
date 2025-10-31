// Funções de navegação
        function navigateToGame() {
            console.log('Navegando para Jogo Interativo...');
            // window.location.href = '/jogo-interativo';
            alert('Redirecionando para o Jogo Interativo!');
        }

        function navigateToConnected() {
            console.log('Navegando para Game Conectado...');
            // window.location.href = '/game-conectado';
            alert('Redirecionando para o Game Conectado!');
        }

        function navigateToGallery() {
            console.log('Navegando para Galeria...');
            // window.location.href = '/galeria';
            alert('Redirecionando para a Galeria!');
        }

        // Efeitos de teclado para acessibilidade
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('dashboard-card')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });

        // Animação suave na entrada
        window.addEventListener('load', function() {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        });