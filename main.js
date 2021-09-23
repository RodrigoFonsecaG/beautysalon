import menuMobile from './modules/menu-mobile.js';
const menu = new menuMobile('#header nav','nav .toggle','nav ul li a');
menu.init();

import changeHeader from './modules/change-header.js';
const headerChange = new changeHeader('#header');
headerChange.init();



/*TESTIMONIALS carrossel swiper slider*/

const swiper = new Swiper('.swiper', {
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

import backToTop from './modules/back-to-top.js';
const backToTopButton = new backToTop('.back-to-top')
backToTopButton.init();

import activateMenuAtCurrentSection from './modules/active-menu.js';
const activeMenu = new activateMenuAtCurrentSection('main section[id]')
activeMenu.init();


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


import dailyQuote from './modules/daily-quote.js';
const quote = new dailyQuote('https://api.adviceslip.com/advice', '.brand')
quote.init();



/*MUDAR LINGUAGEM*/

import changeLanguage from './modules/language.js';

const langButton = document.querySelector('.lang');

langButton.addEventListener('click', handleLanguage);

function handleLanguage() {
  if (document.documentElement.classList.contains('ptBR')) {
    document.documentElement.classList.remove('ptBR');
    document.documentElement.classList.add('enUS');
    langButton.innerHTML = 'PT-BR';
    changeLanguage('enUS');
  } else if (document.documentElement.classList.contains('enUS')) {
    document.documentElement.classList.remove('enUS');
    document.documentElement.classList.add('ptBR');
    langButton.innerHTML = 'EN-US';
    changeLanguage('ptBR');
  }
}

/*HORARIO FUNCIONAMENTO*/
import funcionamento from './modules/funcionamento.js';
funcionamento();

import changeColor from './modules/color.js';
const colorChange = new changeColor('#slider');
colorChange.init();

/*NUMEROS DE CLIENTES*/
import numerosClientes from './modules/clients.js';
const numeroClientes = new numerosClientes('.numeros-clientes-text','[data-semana]');
numeroClientes.init();

import actualTime from './modules/time.js';
setInterval(actualTime, 1000);

import scheduleModal from './modules/schedule.js';
scheduleModal();

import scheduleForm from './modules/form.js';
scheduleForm();
