import debounce from './debounce.js'

/*menu ativo conforme a sessão visivel na pagina*/
export default class activateMenuAtCurrentSection {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);

    this.activateMenuAtCurrentSection = debounce(this.activateMenuAtCurrentSection.bind(this),50);
  }

  eventScroll() {
    window.addEventListener('scroll', this.activateMenuAtCurrentSection);
  }

  activateMenuAtCurrentSection() {
    const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

    for (const section of this.sections) {
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

  init() {
    if (this.sections.length) {
      this.eventScroll();
    }
  }
}
