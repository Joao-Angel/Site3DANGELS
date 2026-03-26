// Alternar menu no celular
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Rolagem suave ao clicar nos links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const navLinks = document.getElementById('navLinks');
                navLinks.classList.remove('active');

                const alvo = document.querySelector(this.getAttribute('href'));
                if (alvo) {
                    alvo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animação ao rolar a página
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });

        // Destacar link ativo no menu
        window.addEventListener('scroll', () => {
            let atual = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const topo = section.offsetTop;
                if (scrollY >= (topo - 100)) {
                    atual = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === atual) {
                    link.classList.add('active');
                }
            });
        });
        
