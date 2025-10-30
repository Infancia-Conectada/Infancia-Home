// Sorteio JavaScript - Infância Conectada
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const form = document.getElementById('formSorteio');
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');
    const nomeError = document.getElementById('nomeError');
    const telefoneError = document.getElementById('telefoneError');
    const successMessage = document.getElementById('successMessage');
    const btnParticipar = form.querySelector('.btn-participar');

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        setupPhoneMask();
        setupInputValidation();
    }

    // Event Listeners
    function setupEventListeners() {
        // Submit do formulário
        form.addEventListener('submit', handleSubmit);

        // Validação em tempo real
        nomeInput.addEventListener('blur', () => validateNome());
        telefoneInput.addEventListener('blur', () => validateTelefone());

        // Remover erro ao digitar
        nomeInput.addEventListener('input', () => clearError(nomeInput, nomeError));
        telefoneInput.addEventListener('input', () => clearError(telefoneInput, telefoneError));
    }

    // Máscara de telefone
    function setupPhoneMask() {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limitar a 11 dígitos
            value = value.substring(0, 11);
            
            // Aplicar máscara
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                }
            }
            
            e.target.value = value;
        });
    }

    // Validação em tempo real
    function setupInputValidation() {
        // Validar nome apenas com letras e espaços
        nomeInput.addEventListener('input', function(e) {
            let value = e.target.value;
            // Permitir apenas letras, espaços e caracteres acentuados
            value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            e.target.value = value;
        });
    }

    // Handle Submit
    function handleSubmit(e) {
        e.preventDefault();

        // Validar todos os campos
        const nomeValido = validateNome();
        const telefoneValido = validateTelefone();

        if (nomeValido && telefoneValido) {
            submitForm();
        }
    }

    // Validação do nome
    function validateNome() {
        const value = nomeInput.value.trim();

        if (value === '') {
            showError(nomeInput, nomeError, 'Por favor, preencha seu nome completo');
            return false;
        }

        if (value.length < 3) {
            showError(nomeInput, nomeError, 'Nome deve ter pelo menos 3 caracteres');
            return false;
        }

        // Verificar se tem pelo menos nome e sobrenome
        const palavras = value.split(' ').filter(p => p.length > 0);
        if (palavras.length < 2) {
            showError(nomeInput, nomeError, 'Por favor, informe nome e sobrenome');
            return false;
        }

        clearError(nomeInput, nomeError);
        return true;
    }

    // Validação do telefone
    function validateTelefone() {
        const value = telefoneInput.value.replace(/\D/g, '');

        if (value === '') {
            showError(telefoneInput, telefoneError, 'Por favor, preencha seu telefone');
            return false;
        }

        if (value.length < 10) {
            showError(telefoneInput, telefoneError, 'Telefone incompleto');
            return false;
        }

        if (value.length !== 10 && value.length !== 11) {
            showError(telefoneInput, telefoneError, 'Telefone inválido');
            return false;
        }

        clearError(telefoneInput, telefoneError);
        return true;
    }

    // Mostrar erro
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Limpar erro
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Submeter formulário
    function submitForm() {
        // Desabilitar botão
        btnParticipar.disabled = true;
        btnParticipar.textContent = 'Processando...';

        // Simular envio para servidor
        setTimeout(() => {
            // Obter dados do formulário
            const dados = {
                nome: nomeInput.value.trim(),
                telefone: telefoneInput.value
            };

            // Log dos dados (em produção, enviaria para o servidor)
            console.log('Dados do sorteio:', dados);

            // Mostrar mensagem de sucesso
            showSuccessMessage();

            // Resetar formulário
            form.reset();

            // Reabilitar botão
            btnParticipar.disabled = false;
            btnParticipar.innerHTML = `
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
                Participar
            `;
        }, 1500);
    }

    // Mostrar mensagem de sucesso
    function showSuccessMessage() {
        successMessage.classList.add('show');

        // Scroll suave até a mensagem
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });

        // Ocultar após 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }

    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const header = document.querySelector('.header');
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Efeito de scroll no header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScroll = currentScroll;
    });

    // Animação de entrada dos elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.form-sorteio, .title, .description');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    animateOnScroll();

    // Debug helper (remover em produção)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎉 Página de sorteio carregada com sucesso!');
        console.log('📝 Formulário:', form ? 'Encontrado' : 'Não encontrado');
    }
});