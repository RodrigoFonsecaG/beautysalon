import validarCpf from './cpf.js';

export default class scheduleForm {
  constructor() {
    this.changeLanguageButton = document.querySelector('.lang');
    this.formularioInputs = document.querySelectorAll('#formulario input');
    this.submitButton = document.querySelector('.button-submit');
    this.userWelcome = document.querySelector('.user-welcome');
    this.userLocale = document.querySelector('.user-locale');
    this.scheduleButton = document.querySelector('.button-schedule');
    this.cepInput = document.querySelector('#cep')
    this.errorMessageCep = document.querySelectorAll('.error-message')[1]

  }

  validarCpf(cpf) {
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

    const cpfFormatado = this.validarCpf(cpf); //valida e formata cpf

    if (nome && email && telefone && cpfFormatado && cep) {
      return {
        nome,
        email,
        telefone,
        cpf: cpfFormatado,
        cep
      };
    }
  }

  /*API DE CEP*/
  async getCep(cep) {
    try{
    const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepJSON = await cepResponse.json();

    const { logradouro, bairro, localidade, uf } = cepJSON;

    this.cepInput.classList.remove('invalido'); //remove classe que mostra erro no input
    this.errorMessageCep.style.display = 'none'; //esconde a mensagem de erro no input

    const userLocal = this.userLocale.innerHTML = `<br>${logradouro}, ${bairro}<br>${localidade}, ${uf}`;
    return userLocal;
  }
  catch(error){
    console.log(error);
    this.cepInput.classList.add('invalido');
    this.errorMessageCep.style.display = 'flex';
  }
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
      const primeiroNome = dadosRecuperados.nome.split(' ');

      this.getCep(cep);

      if (document.documentElement.classList.contains('ptBR')) {
        this.userWelcome.innerHTML = `Seja bem-vindo <span>${primeiroNome[0]}<span>!`;
        localStorage.getItem('dados')
          ? (this.scheduleButton.innerHTML = 'Agendar um horário')
          : null;
      }

      if (document.documentElement.classList.contains('enUS')) {
        this.userWelcome.innerHTML = `Welcome <span>${primeiroNome[0]}<span>!`;
        localStorage.getItem('dados')
          ? (this.scheduleButton.innerHTML = 'Schedule an appointment')
          : null;
      }
    }
  }

  initEvents() {
    const dados = this.getDados();

    if (dados) {
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
    if (this.scheduleButton && this.submitButton) {
      this.mostrarDados();
      this.buttonEvents();
      this.languageButtonEvent();
    }
    return this;
  }
}
