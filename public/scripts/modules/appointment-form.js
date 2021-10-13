export default class Appointment {
  constructor(cardClass, stateSelect, citySelect) {
    this.cards = document.querySelectorAll(cardClass);
    this.stateSelect = document.querySelector(stateSelect);
    this.citySelect = document.querySelector(citySelect);
    this.btnSubmit = document.querySelector('.button-make-an-appointment');
    this.hideItemsInput = document.querySelector('input[name="items"]')
    this.hideStateInput = document.querySelector('input[name="state"]')
    this.selectedItems = [];
    

    this.populateCities = this.populateCities.bind(this);
  }

  showUserData() {
    const userName = JSON.parse(localStorage.getItem('dados')).nome;
    const userEmail = JSON.parse(localStorage.getItem('dados')).email;

    const nomeInput = document.querySelector("input[name='name']");
    const emailInput = document.querySelector("input[name='email']");

    nomeInput.value = userName;
    emailInput.value = userEmail;
  }

  async populateStates() {


    const res = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );
    const states = await res.json();

    states.forEach((state) => {
      this.stateSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
    });

    
  }

  async populateCities(event) {
    const stateId = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex; 
    this.hideStateInput.value = event.target.options[indexOfSelectedState].text;


    this.citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    this.citySelect.disabled = true;

    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
    const cities = await res.json();

    cities.forEach(city => {
      this.citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
    })

    this.citySelect.removeAttribute('disabled');
  }

  enableCities() {
    this.stateSelect.addEventListener('change', this.populateCities);
  }

  cardSelected() {
    this.cards.forEach((card) => {
      card.addEventListener('click', this.handleSelectedCard);
    });
  }

  handleSelectedCard(event) {
    const item = event.currentTarget;
    item.classList.toggle('selected');

  }

  submitEvents(){
    this.btnSubmit.addEventListener('click', (e) => {
      // Salva no input escondido as planos selecionados pelo usuario no momento que ele aperta
      // o botao de enviar
      for(let card of this.cards){

        let cardName = card.querySelector('.card-text').innerText;

        if(card.classList.contains('selected')){
          this.selectedItems.push(cardName)
        }
      }
      this.hideItemsInput.value = this.selectedItems;
    })
    
    
  }

  init() {
    if(this.cards.length && this.stateSelect){
    this.cardSelected();
    this.showUserData();
    this.populateStates();
    this.enableCities();
    this.submitEvents();
  }
  }
}
