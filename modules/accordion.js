/*Accordion*/
export default class accordion {
  constructor(itens) {
    this.accordionItem = document.querySelectorAll(itens);

    this.accordionEvents = this.accordionEvents.bind(this);
  }

  addToFirstItem() {
    this.accordionItem[0].classList.add('ativo');
    this.accordionItem[0].nextElementSibling.classList.add('ativo');
  }

  activeAccordion() {
    this.classList.toggle('ativo');
    this.nextElementSibling.classList.toggle('ativo');
  }

  accordionEvents() {
    this.accordionItem.forEach((item) => {
      item.addEventListener('click', this.activeAccordion);
    });
  }

  init() {
    if (this.accordionItem.length) {
      this.addToFirstItem();
      this.accordionEvents();
    }
    return this;
  }
}
