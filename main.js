/*abre e fecha o menu quando clicar no ícone: hamburger e x*/

const nav = document.querySelector('#header nav');
const toggle = document.querySelectorAll('nav .toggle');

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show');
  });
}

/*quando clicar em um item do menu, esconder o menu*/
const links = document.querySelectorAll('nav ul li a');

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show');
  });
}

/*Mudar o header da pagina quando der scroll*/
const header = document.querySelector('#header');
const navHeight = header.offsetHeight;

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    //scroll é maior que a altura do header
    header.classList.add('scroll');
  } else {
    //menor que a altura do header
    header.classList.remove('scroll');
  }
}

/*TESTIMONIALS carrossel swiper slider*/

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
});

/*SCROLL REVEAL: Mostrar elementos quando der scroll na pagina*/

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
  //reset: true
});
scrollReveal.reveal(
  `#home .image,#home .text,
#about .image, #about .text,
#services header, #services .card,
#testimonials header, #testimonials .testimonials, 
#qualidades, .qualidades, #qualidades header,
#contact .text, #contact .links,
footer .brand, footer .social
`,
  { interval: 100 }
);

/*Botão voltar para o topo*/
const backToTopButton = document.querySelector('.back-to-top');

function backToTop() {
  if (window.scrollY >= 580) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

/*menu ativo conforme a sessão visivel na pagina*/
const sections = document.querySelectorAll('main section[id]');

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active');
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active');
    }
  }
}

window.addEventListener('scroll', function () {
  changeHeaderWhenScroll();
  backToTop();
  activateMenuAtCurrentSection();
});

/*Accordion*/
const accordionTitle = document.querySelectorAll('.qualidade-item');

if (accordionTitle.length) {
  accordionTitle[0].classList.add('ativo');
  accordionTitle[0].nextElementSibling.classList.add('ativo');
  function activeAccordion() {
    this.classList.toggle('ativo');
    this.nextElementSibling.classList.toggle('ativo');
  }

  accordionTitle.forEach((accordionItem) => {
    accordionItem.addEventListener('click', activeAccordion);
  });
}
/*FRASE DO DIA*/

function fraseDoDia() {
  const fraseP = document.createElement('p');
  const brandFooter = document.querySelector('.brand');
  brandFooter.appendChild(fraseP);
  fraseP.style.marginTop = '2rem';
  fraseP.classList.add('br'); // classe para mudar linguagem

  async function puxarDados() {
    try {
      const dadosResponse = await fetch('https://api.adviceslip.com/advice');
      const dadosJson = await dadosResponse.json();
      fraseP.innerHTML = `Frase do dia: ${dadosJson.slip.advice}`;
    } catch (erro) {
      console.log(erro);
    }
  }
  puxarDados();
}
fraseDoDia();

/*MUDAR LINGUAGEM*/

import changeLanguage from './modules/language.js';

const langButton = document.querySelector('.lang');

langButton.addEventListener('click', handleLanguage);

function handleLanguage() {
  if(document.documentElement.classList.contains('ptBR')){
    document.documentElement.classList.remove('ptBR');
    document.documentElement.classList.add('enUS');
    langButton.innerHTML = 'PT-BR';
    changeLanguage('enUS');
  }
  else if(document.documentElement.classList.contains('enUS')){
    document.documentElement.classList.remove('enUS');
    document.documentElement.classList.add('ptBR');
    langButton.innerHTML = 'EN-US';
    changeLanguage('ptBR');
  }
}


