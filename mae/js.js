document.addEventListener('DOMContentLoaded', function() {
    // Configuração do WhatsApp
    const WHATSAPP_NUMBER = '5511945373075';
    
    // Função para gerar mensagem personalizada do WhatsApp
    function generateWhatsAppMessage(packageName, price = '') {
        const messages = {
            'Decoração Pequena': `Olá! Tenho interesse na *Decoração Pequena* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            'Decoração Média': `Olá! Tenho interesse na *Decoração Média* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            'Decoração Grande': `Olá! Tenho interesse na *Decoração Grande* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            "Kit Simples 'Pegue e Monte'": `Olá! Tenho interesse no *Kit Simples "Pegue e Monte"* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de retirada\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            'Kit com Escada de Lembrancinhas': `Olá! Tenho interesse no *Kit com Escada de Lembrancinhas* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de retirada\n• Formas de pagamento\n\nAguardo seu retorno! 😊`
        };
        
        return messages[packageName] || `Olá! Tenho interesse em seus serviços de decoração. Gostaria de mais informações! 😊`;
    }
    
    // Função para abrir WhatsApp
    function openWhatsApp(message = '') {
        const defaultMessage = `Olá! Vim através do site da R&T Decorações e gostaria de saber mais sobre os serviços de decoração. Podem me ajudar? 😊`;
        const finalMessage = message || defaultMessage;
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Adicionar efeito visual no botão clicado
        const clickedButton = event.target.closest('button, a');
        if (clickedButton) {
            clickedButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                clickedButton.style.transform = '';
            }, 150);
        }
        
        window.open(whatsappURL, '_blank');
    }
    
    // Botões de orçamento específicos
    const inquireButtons = document.querySelectorAll('.inquire-button');
    inquireButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packageName = this.getAttribute('data-package');
            const price = this.getAttribute('data-price');
            const message = generateWhatsAppMessage(packageName, price);
            openWhatsApp(message);
        });
    });
    
    // Botão WhatsApp do header
    const headerWhatsappBtn = document.getElementById('headerWhatsappBtn');
    if (headerWhatsappBtn) {
        headerWhatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    // Botão WhatsApp flutuante
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
    if (whatsappFloatBtn) {
        whatsappFloatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    // Botão WhatsApp do footer
    const footerWhatsappBtn = document.getElementById('footerWhatsappBtn');
    if (footerWhatsappBtn) {
        footerWhatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    // Animação de scroll para as seções
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Efeito de hover nas imagens com zoom suave
    const images = document.querySelectorAll('.decor-image');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Adicionar efeito de clique nas imagens
        img.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Animação do botão flutuante do WhatsApp
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        // Mostrar o botão após um pequeno delay
        setTimeout(() => {
            whatsappFloat.classList.add('show');
        }, 1000);
        
        // Animação de pulso periódica
        setInterval(() => {
            whatsappFloat.classList.add('pulse');
            setTimeout(() => {
                whatsappFloat.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
    
    // Suavizar scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de loading nas imagens
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Se a imagem já foi carregada
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // Adicionar efeito de ripple nos botões
    const buttons = document.querySelectorAll('.inquire-button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Contador de visualizações (simulado)
    let viewCount = localStorage.getItem('rt-decoracoes-views') || 0;
    viewCount++;
    localStorage.setItem('rt-decoracoes-views', viewCount);
    
    // Adicionar um pequeno delay para melhorar a experiência
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

