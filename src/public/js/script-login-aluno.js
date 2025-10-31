 // Adiciona interatividade ao formulário
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nickname = document.getElementById('nickname').value;
            const password = document.getElementById('password').value;
            
            if (nickname && password) {
                // Simula o processo de login
                const button = document.querySelector('.login-button');
                button.innerHTML = 'Entrando...';
                button.style.opacity = '0.7';
                
                setTimeout(() => {
                    alert(`Bem-vindo, ${nickname}! Login realizado com sucesso.`);
                    button.innerHTML = 'Entrar';
                    button.style.opacity = '1';
                    
                    // Aqui você adicionaria a lógica real de autenticação
                    // window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
        
        // Adiciona efeito de foco suave nos inputs
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });