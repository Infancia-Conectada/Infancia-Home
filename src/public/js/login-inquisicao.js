
       function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleBtn = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        function showForgotPassword() {
            alert('Função de recuperação de senha será implementada em breve.\n\nPor favor, entre em contato com o suporte: suporte@inclusaodigital.org.br');
        }

        // Animação de loading no botão
        document.querySelector('.login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.querySelector('.login-btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Entrando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            // Simular login (remover em produção)
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                alert('Login realizado com sucesso! (Demo)');
            }, 2000);
        });