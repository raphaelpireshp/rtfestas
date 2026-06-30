document.addEventListener('DOMContentLoaded', function () {
    // Configuração do WhatsApp
    const WHATSAPP_NUMBER = '5511945373075';

    // Mensagens personalizadas por pacote
    function generateWhatsAppMessage(packageName, price = '') {
        const messages = {
            'Decoração Pequena': `Olá! Tenho interesse na *Decoração Pequena* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            'Decoração Média': `Olá! Tenho interesse na *Decoração Média* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            'Decoração Grande': `Olá! Tenho interesse na *Decoração Grande* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de contratação\n• Formas de pagamento\n\nAguardo seu retorno! 😊`,
            "Kit Simples 'Pegue e Monte'": `Olá! Tenho interesse no *Kit Simples "Pegue e Monte"* ${price}. Gostaria de saber mais detalhes sobre:\n\n• Disponibilidade de datas\n• Processo de retirada\n• Formas de pagamento\n\nAguardo seu retorno! 😊`
        };

        return messages[packageName] || `Olá! Tenho interesse em seus serviços de decoração. Gostaria de mais informações! 😊`;
    }

    // Abrir WhatsApp
    function openWhatsApp(message, clickedEl) {
        const defaultMessage = `Olá! Vim através do site da R&T Decorações e gostaria de saber mais sobre os serviços de decoração. Podem me ajudar? 😊`;
        const finalMessage = message || defaultMessage;
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        if (clickedEl) {
            clickedEl.style.transform = 'scale(0.96)';
            setTimeout(() => { clickedEl.style.transform = ''; }, 150);
        }

        window.open(whatsappURL, '_blank', 'noopener');
    }

    // Botões de orçamento por pacote
    document.querySelectorAll('.inquire-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const packageName = this.getAttribute('data-package');
            const price = this.getAttribute('data-price');
            const message = generateWhatsAppMessage(packageName, price);
            openWhatsApp(message, this);
        });
    });

    // Botões genéricos de WhatsApp (header, hero, nav, sobre, float, footer)
    const genericWhatsappIds = [
        'headerWhatsappBtn',
        'navWhatsappBtn',
        'aboutWhatsappBtn',
        'whatsappFloatBtn',
        'footerWhatsappBtn'
    ];

    genericWhatsappIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                openWhatsApp(null, this);
            });
        }
    });

    // Fechar menu mobile ao clicar em um link
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        document.querySelectorAll('.site-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

    // Reveal de seções ao rolar a página
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // Fade-in das imagens ao carregar
    const images = document.querySelectorAll('.decor-image');
    images.forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
        if (img.complete) img.classList.add('loaded');
    });

    // Lightbox de imagens
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    });

    // Botão WhatsApp flutuante: aparece e pulsa periodicamente
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (whatsappFloat) {
        setTimeout(() => whatsappFloat.classList.add('show'), 1000);

        setInterval(() => {
            whatsappFloat.classList.add('pulse');
            setTimeout(() => whatsappFloat.classList.remove('pulse'), 1000);
        }, 6000);
    }

    // Ripple nos botões
    document.querySelectorAll('.inquire-button, .btn').forEach(button => {
        button.addEventListener('click', function (e) {
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
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Sinaliza que a página carregou (controla o fade-in do body via CSS)
    setTimeout(() => document.body.classList.add('loaded'), 100);
});