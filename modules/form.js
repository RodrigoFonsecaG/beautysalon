import validarCpf from './cpf.js';

export default class scheduleForm {
  constructor() {
    this.changeLanguageButton = document.querySelector('.lang');
    this.formularioInputs = document.querySelectorAll('#formulario input');
    this.submitButton = document.querySelector('.button-submit');
    this.userWelcome = document.querySelector('.user-welcome');
    this.userLocale = document.querySelector('.user-locale');
    this.scheduleButton = document.querySelector('.button-schedule');
  }

  validarCpf(cpf){
    const validar = new validarCpf(cpf);
    const cpfFormatado = validar.cpfFinal();
    return cpfFormatado;
  }

  getDados() {
    const arrayDados = Array.from(this.formularioInputs);

    const dadosArray = arrayDados.map((input) => {
      return input.value;
    });

    const [nome, email, telefone, cpf, cep] = dadosArray;

    const cpfFormatado = this.validarCpf(cpf) //valida e formata cpf

    if (nome && email && telefone && cpfFormatado && cep) {
      return {
        nome,
        email,
        telefone,
        cpf: cpfFormatado,
        cep
    }
  }
  }

  /*API DE CEP*/
  async getCep(cep) {
    const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepJSON = await cepResponse.json();

    const { logradouro, bairro, localidade, uf } = cepJSON;

    const userLocal =
      (this.userLocale.innerHTML = `<br>${logradouro}, ${bairro}<br>${localidade}, ${uf}`);

    return userLocal;
  }

  salvarDados() {
    const dados = this.getDados();
    
    if (
      !(
        (dados.nome &&
          dados.email &&
          dados.telefone &&
          dados.cpf &&
          dados.cep) === ''
      )
    ) {
      const dadosJSON = JSON.stringify(dados);
      localStorage.setItem('dados', dadosJSON);
    }
  }

  mostrarDados() {
    if (localStorage.getItem('dados')) {
      const dadosRecuperados = JSON.parse(localStorage.getItem('dados'));
      const cep = dadosRecuperados.cep;
      const nomeCompleto = dadosRecuperados.nome.split(' ');

      this.getCep(cep);

      if (document.documentElement.classList.contains('ptBR')) {
        this.userWelcome.innerHTML = `Seja bem-vindo <span>${nomeCompleto[0]}<span>!`;
        localStorage.getItem('dados')
          ? (this.scheduleButton.innerHTML = 'Agendar um horário')
          : null;
      }

      if (document.documentElement.classList.contains('enUS')) {
        this.userWelcome.innerHTML = `Welcome <span>${nomeCompleto[0]}<span>!`;
        localStorage.getItem('dados')
          ? (this.scheduleButton.innerHTML = 'Schedule an appointment')
          : null;
      }
    }
  }

  initEvents() {
    const dados = this.getDados();
    
    if(dados){
    this.getDados();
    this.salvarDados();
    this.getCep(dados.cep);
    this.mostrarDados();
  }
  }

  languageButtonEvent() {
    /*Adiciona evento no botão de mudar linguagem de mostrar mensagem de bem-vindo dependendo da linguagem*/
    this.changeLanguageButton.addEventListener('click', this.mostrarDados);
  }

  buttonEvents() {
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.initEvents();
    });
  }

  init() {
    if(this.scheduleButton && this.submitButton){
    this.mostrarDados();
    this.buttonEvents();
    this.languageButtonEvent();
  }
  return this;
  }
}
