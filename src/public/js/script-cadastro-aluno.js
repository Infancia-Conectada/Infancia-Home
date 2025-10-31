
        // Função para alternar visibilidade da senha
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

        // Verificador de força da senha
        function checkPasswordStrength(password) {
            let strength = 0;
            let text = 'Muito fraca';
            
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            const strengthFill = document.getElementById('strengthFill');
            const strengthText = document.getElementById('strengthText');
            
            strengthFill.className = 'strength-fill';
            
            switch(strength) {
                case 0:
                case 1:
                    strengthFill.classList.add('weak');
                    text = 'Muito fraca';
                    break;
                case 2:
                    strengthFill.classList.add('weak');
                    text = 'Fraca';
                    break;
                case 3:
                    strengthFill.classList.add('medium');
                    text = 'Média';
                    break;
                case 4:
                    strengthFill.classList.add('good');
                    text = 'Boa';
                    break;
                case 5:
                    strengthFill.classList.add('strong');
                    text = 'Muito forte';
                    break;
            }
            
            strengthText.textContent = text;
        }

        // Event listener para verificação da senha em tempo real
        document.getElementById('password').addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });

        // Validação de idade (menor de idade)
        document.getElementById('birthDate').addEventListener('change', function() {
            const birthDate = new Date(this.value);
            const today = new Date();
            const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            
            if (age > 18) {
                alert('Este cadastro é destinado apenas para menores de idade (crianças e adolescentes).');
                this.value = '';
            }
        });

        // Formatação automática do nickname (sem espaços)
        document.getElementById('nickname').addEventListener('input', function() {
            // Remove espaços e caracteres especiais, mantém apenas letras e números
            this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        });

        // Submit do formulário
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            
            // Validações básicas
            const name = document.getElementById('studentName').value;
            const birthDate = document.getElementById('birthDate').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const nickname = document.getElementById('nickname').value;
            const password = document.getElementById('password').value;
            
            if (!name || !birthDate || !gender || !nickname || !password) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (password.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            
            if (nickname.length < 3) {
                alert('O nickname deve ter pelo menos 3 caracteres.');
                return;
            }
            
            // Animação de loading
            submitBtn.textContent = 'Criando conta...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Simular criação de conta (remover em produção)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                
                alert(`Conta criada com sucesso! (Demo)\n\nBem-vindo(a), ${nickname}!\nAgora você pode acessar a plataforma de inclusão digital.`);
                
                // Em produção, redirecionar para página de login ou dashboard
                // window.location.href = '/login';
            }, 2500);
        });

        // Inicializar verificação de força da senha
        document.addEventListener('DOMContentLoaded', function() {
            checkPasswordStrength('');
        });
