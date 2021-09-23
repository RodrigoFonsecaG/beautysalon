import debounce from './debounce.js'

/*Mudar o header da pagina quando der scroll*/
export default class changeHeader {
    
  constructor(header) {
    this.header = document.querySelector(header);
    this.navHeight = this.header.offsetHeight;

    this.changeHeaderWhenScroll = debounce(this.changeHeaderWhenScroll.bind(this),100);
  }


  changeHeaderWhenScroll() {
    if (window.scrollY >= this.navHeight) {
      //scroll é maior que a altura do header
      this.header.classList.add('scroll');
    } else {
      //menor que a altura do header
      this.header.classList.remove('scroll');
    }
  }

  headerEvent(){
    window.addEventListener('scroll', this.changeHeaderWhenScroll)
  }

  init() {
    if (this.header) {
      this.headerEvent();
    }
    return this;
  }
}
