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

// Carrossel da galeria
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');

if (track) {
    const imgs = track.querySelectorAll('img');
    const total = imgs.length;
    const visiveis = window.innerWidth <= 768 ? 1 : 3;
    let atual = 0;

    // Criar bolinhas
    const totalDots = Math.ceil(total / visiveis);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => irPara(i));
        dotsContainer.appendChild(dot);
    }

    function atualizarDots() {
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === Math.round(atual / visiveis));
        });
    }

    function irPara(index) {
        atual = index * visiveis;
        if (atual >= total) atual = total - visiveis;
        const largura = imgs[0].offsetWidth + 16;
        track.scrollTo({ left: atual * largura, behavior: 'smooth' });
        atualizarDots();
    }

    window.moverCarrossel = function(direcao) {
        const visiveis = window.innerWidth <= 768 ? 1 : 3;
        atual += direcao * visiveis;
        if (atual < 0) atual = 0;
        if (atual >= total) atual = total - visiveis;
        const largura = imgs[0].offsetWidth + 16;
        track.scrollTo({ left: atual * largura, behavior: 'smooth' });
        atualizarDots();
    };
}
