// ===================================
// TOGGLE PASSWORD VISIBILITY
// ===================================
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    // Alterna o tipo do input entre password e text
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Alterna o ícone do botão
    const icon = this.querySelector('svg');
    if (type === 'text') {
        // Ícone de olho fechado
        icon.innerHTML = `
            <path d="M3.33333 3.33333L16.6667 16.6667" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.25 8.25C7.78587 8.71413 7.5 9.33696 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C10.663 12.5 11.2859 12.2141 11.75 11.75" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.58333 5.58333C3.71667 6.81667 2.33333 8.75 1.66667 10C2.33333 11.9167 4.16667 15.8333 10 15.8333C11.5667 15.8333 12.925 15.4083 14.0833 14.7583" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.6417 13.8083C17.0583 12.6 18.1083 11.0333 18.3333 10C17.6667 8.08333 15.8333 4.16667 10 4.16667C9.50833 4.16667 9.03333 4.2 8.575 4.25833" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    } else {
        // Ícone de olho aberto
        icon.innerHTML = `
            <path d="M1.66667 10C1.66667 10 4.16667 4.16667 10 4.16667C15.8333 4.16667 18.3333 10 18.3333 10C18.3333 10 15.8333 15.8333 10 15.8333C4.16667 15.8333 1.66667 10 1.66667 10Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
});

// ===================================
// VALIDAÇÃO E SUBMIT DO FORMULÁRIO
// ===================================
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const emailInput = document.getElementById('email');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Esconde mensagem de erro se estiver visível
    errorMessage.classList.remove('show');
    
    // Pega os valores dos inputs
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validação básica
    if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
    }
    
    // Validação de formato de e-mail
    if (!isValidEmail(email)) {
        showError('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simulação de login (aqui você conectaria com o backend)
    simulateLogin(email, password);
});

// ===================================
// FUNÇÃO PARA VALIDAR E-MAIL
// ===================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// FUNÇÃO PARA MOSTRAR ERRO
// ===================================
function showError(message) {
    const errorMessageElement = document.getElementById('errorMessage');
    const errorText = errorMessageElement.querySelector('span');
    errorText.textContent = message;
    errorMessageElement.classList.add('show');
    
    // Remove o erro após 5 segundos
    setTimeout(() => {
        errorMessageElement.classList.remove('show');
    }, 5000);
}

// ===================================
// SIMULAÇÃO DE LOGIN (TEMPORÁRIO)
// ===================================
function simulateLogin(email, password) {
    // Adiciona estado de loading ao botão
    const button = loginForm.querySelector('.btn-login');
    const buttonText = button.querySelector('.btn-text');
    const originalText = buttonText.textContent;
    
    buttonText.textContent = 'Entrando...';
    button.style.opacity = '0.7';
    button.disabled = true;
    
    // Simula uma requisição ao servidor (1.5 segundos)
    setTimeout(() => {
        // Credenciais de exemplo (REMOVA ISSO EM PRODUÇÃO!)
        // Em produção, a validação deve ser feita no backend
        if (email === 'admin@inclusaodigital.org' && password === 'admin123') {
            // Login bem-sucedido
            buttonText.textContent = 'Acesso concedido!';
            button.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            
            // Redireciona após 1 segundo (substitua pela URL do painel)
            setTimeout(() => {
                // window.location.href = 'painel.html'; // Descomente quando tiver a página
                console.log('Redirecionando para o painel administrativo...');
            }, 1000);
        } else {
            // Login falhou
            showError('E-mail ou senha incorretos. Tente novamente.');
            buttonText.textContent = originalText;
            button.style.opacity = '1';
            button.disabled = false;
        }
    }, 1500);
}

// ===================================
// ANIMAÇÃO DOS INPUTS (FOCUS)
// ===================================
const inputs = document.querySelectorAll('.form-input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ===================================
// PREVINE REFRESH ACIDENTAL
// ===================================
window.addEventListener('beforeunload', function(e) {
    // Se os campos estiverem preenchidos, pergunta antes de sair
    if (emailInput.value.trim() || passwordInput.value.trim()) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ===================================
// CONSOLE LOG INFORMATIVO
// ===================================
console.log('%c🔐 Painel de Login - Inclusão Digital', 'color: #3B82F6; font-size: 18px; font-weight: bold;');
console.log('%cCredenciais de teste:', 'color: #22D3EE; font-size: 14px; font-weight: bold;');
console.log('Email: admin@inclusaodigital.org');
console.log('Senha: admin123');
console.log('%c⚠️ ATENÇÃO: Remova as credenciais hardcoded em produção!', 'color: #FACC15; font-size: 12px;');