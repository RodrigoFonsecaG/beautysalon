/*abre e fecha o menu quando clicar no ícone: hamburger e x*/
export default class menuMobile {
    
  constructor(nav, toggleIcon, links) {
    this.nav = document.querySelector(nav);
    this.toggleIcons = document.querySelectorAll(toggleIcon);
    this.links = document.querySelectorAll(links);

    this.handleEventToggle = this.handleEventToggle.bind(this);
    this.handleEventHide = this.handleEventHide.bind(this);
  }

  menuEvents() {
    for (const element of this.toggleIcons) {
      element.addEventListener('click', this.handleEventToggle);
    }
  }

  handleEventToggle() {
    this.nav.classList.toggle('show');
  }

  /*quando clicar em um item do menu, esconder o menu*/
  hideOnClick() {
    for (const link of this.links) {
      link.addEventListener('click', this.handleEventHide);
    }
  }

  handleEventHide() {
    this.nav.classList.remove('show');
  }

  init() {
    if (this.toggleIcons.length && this.links.length) {
      this.menuEvents();
      this.hideOnClick();
    }
    return this;
  }
}
