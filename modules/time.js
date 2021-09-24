export default class actualTime{
  constructor(content){
    this.actualDate = document.querySelector(content);
  }

  construirData() {
    if (document.documentElement.classList.contains('ptBR')) {
      const dataBR = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'full'
      }).format(new Date());

      const horaBR = new Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'short'
      }).format(new Date());

      this.actualDate.innerHTML = `${dataBR}<span>${horaBR}</span>`;
    }
    
    if (document.documentElement.classList.contains('enUS')) {
      const dataEN = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
      }).format(new Date());

      const horaEN = new Intl.DateTimeFormat('en-US', {
        timeStyle: 'short'
      }).format(new Date());

      this.actualDate.innerHTML = `${dataEN}<span>${horaEN}</span>`;
    }
  }

  init(){
    setInterval(() => this.construirData(), 1000)
  }
  
}
