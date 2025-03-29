// Menu Mobile e funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');

    btnMenu.addEventListener('click', () => {
        menu.classList.add('abrir-menu');
    });

    menu.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
    });

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile se estiver aberto
            if (menu.classList.contains('abrir-menu')) {
                menu.classList.remove('abrir-menu');
            }
        });
    });

    // Header com fundo ao rolar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Animação das barras de habilidades
    const skills = document.querySelectorAll('.skill-level');
    skills.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        
        setTimeout(() => {
            skill.style.transition = 'width 1.5s ease';
            skill.style.width = width;
        }, 300);
    });

    // Contador para estatísticas
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        
        const increment = target / 50; // Velocidade do contador
        
        function updateCount() {
            const current = parseInt(counter.textContent);
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCount, 40);
            } else {
                counter.textContent = target;
            }
        }
        
        // Iniciar o contador quando a seção estiver visível
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });

    // Efeito de hover nos projetos e rolagem para landing pages
    const portfolioItems = document.querySelectorAll('.img-port');
    portfolioItems.forEach(item => {
        // Verificar se o item é uma landing page
        const isLandingPage = item.querySelector('a')?.getAttribute('href')?.includes('agalab.net') || 
                             item.classList.contains('landing-page');
        
        if (isLandingPage) {
            // Adicionar classe landing-page se ainda não tiver
            if (!item.classList.contains('landing-page')) {
                item.classList.add('landing-page');
            }
            
            // Configurar posição inicial
            item.style.backgroundPosition = 'center top';
            
            item.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 35px rgba(0, 255, 8, 0.2)';
                this.style.backgroundPosition = 'center bottom';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
                this.style.backgroundPosition = 'center top';
            });
        } else {
            // Para projetos normais, manter apenas o efeito de sombra
            item.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        }
    });

    // Validação e envio do formulário
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const formElements = form.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const submitBtn = form.querySelector('input[type="submit"]');
            submitBtn.value = "ENVIANDO...";
            
            setTimeout(() => {
                // Mostrar mensagem de sucesso
                const formContainer = form.parentElement;
                const originalContent = formContainer.innerHTML;
                
                formContainer.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 40px;">
                        <i class="bi bi-check-circle" style="font-size: 60px; color: #00FF08;"></i>
                        <h3 style="margin-top: 20px; font-size: 24px;">Mensagem enviada com sucesso!</h3>
                        <p style="margin-top: 15px; color: #ccc;">Obrigado pelo contato. Retornarei em breve.</p>
                    </div>
                `;
                
                // Restaurar o formulário após 5 segundos
                setTimeout(() => {
                    formContainer.innerHTML = originalContent;
                    const newForm = formContainer.querySelector('form');
                    
                    // Adicionar o event listener novamente
                    if (newForm) {
                        newForm.addEventListener('submit', arguments.callee);
                    }
                }, 5000);
            }, 2000);
        });
    }
    
    // Efeito de animação para elementos que entram na tela
    const animateElements = document.querySelectorAll('.img-topo-site, .especialidades-box, .img-sobre, .txt-sobre');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Efeito de hover nos botões sociais
    const socialButtons = document.querySelectorAll('.btn-social button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efeito de digitação para o título principal (opcional)
    try {
        const title = document.querySelector('.topo-do-site h1');
        if (title) {
            const originalText = title.textContent;
            title.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Iniciar a animação após um breve atraso
            setTimeout(typeWriter, 500);
        }
    } catch (error) {
        console.log('Efeito de digitação não inicializado');
    }
});
