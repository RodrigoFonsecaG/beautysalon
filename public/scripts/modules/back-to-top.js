import debounce from './debounce.js'

/*Botão voltar para o topo*/
export default class backToTop {
  constructor(button) {
    this.backToTopButton = document.querySelector(button);

    this.backToTop = debounce(this.backToTop.bind(this), 100);
  }

  backToTop() {
    if (window.scrollY >= 580) {
      this.backToTopButton.classList.add('show');
    } else {
      this.backToTopButton.classList.remove('show');
    }
  }

  scrollEvent(){
    window.addEventListener('scroll', this.backToTop)
  }

  init() {
    if (this.backToTopButton) {
      this.scrollEvent();
    }
    return this;
  }
}
