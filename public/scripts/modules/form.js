import validarCpf from './cpf.js';

export default class scheduleForm {
  constructor() {
    this.changeLanguageButton = document.querySelector('.lang');
    this.formularioInputs = document.querySelectorAll('#formulario input');
    this.submitButton = document.querySelector('.button-submit');
    this.userWelcome = document.querySelector('.user-welcome');
    this.userLocale = document.querySelector('.user-locale');
    this.scheduleButton = document.querySelector('.button-schedule');
    this.cepInput = document.querySelector('#cep');
    this.errorMessageCep = document.querySelectorAll('.error-message')[1];
    this.buttonMakeAppointment = document.querySelector('.make-an-appointment');
    this.image = document.querySelector('input[name="image"]');

    this.mostrarDados = this.mostrarDados.bind(this);
  }

  validarCpf(cpf) {
    const validar = new validarCpf(cpf);
    const cpfFormatado = validar.cpfFinal();
    return cpfFormatado;
  }

  /*API DE CEP*/
  async getCep(cep) {
    try {
      const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepJSON = await cepResponse.json();

      const { logradouro, bairro, localidade, uf } = cepJSON;

      this.cepInput.classList.remove('invalido'); //remove classe que mostra erro no input
      this.errorMessageCep.style.display = 'none'; //esconde a mensagem de erro no input

      this.userLocale.innerHTML = `<br>${logradouro}, ${bairro}<br>${localidade}, ${uf}`;

      return cep;
    } catch (error) {
      console.log(error);
      this.cepInput.classList.add('invalido');
      this.errorMessageCep.style.display = 'flex';
      this.userLocale.innerHTML = '';

      throw error;
    }
  }

  userImage(){
    this.image.addEventListener('change', function(){
      // como vamos salvar a imagem no localStorage e ele só aceita strings 
      // temos que converter a imagem para DataURL, que é uma url com as informações da imagem
      // para isso vamos usar o objeto FileReader
          const reader = new FileReader();

          reader.addEventListener('load', () => {
            
            localStorage.setItem('image', reader.result); 
          })  
          reader.readAsDataURL(this.files[0]);
        
    })
  }

  getDados() {
    const arrayDados = Array.from(this.formularioInputs);

    const dadosArray = arrayDados.map((input) => {
      return input.value;
    });

    const [nome, email, telefone, cpf, cep, image] = dadosArray;

    const cpfFormatado = this.validarCpf(cpf); //valida e formata cpf

    const imageDataURL = localStorage.getItem('image');
  

    if (cpfFormatado &&  cep) {
      return {
        nome,
        email,
        telefone,
        cpf: cpfFormatado,
        cep,
        image: imageDataURL
      };
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

      localStorage.removeItem('image');
    }
  }

  mostrarDados() {
    if (localStorage.getItem('dados')) {
      const dadosRecuperados = JSON.parse(localStorage.getItem('dados'));
      const cep = dadosRecuperados.cep;
      const primeiroNome = dadosRecuperados.nome.split(' ');

      this.getCep(cep);


      /*Mudar o botão*/
      if (localStorage.getItem('dados')) {
        this.scheduleButton.style.display = 'none';
        this.buttonMakeAppointment.style.display = 'inline-flex';


        if (document.documentElement.classList.contains('ptBR')) {
          this.userWelcome.innerHTML = `Seja bem-vindo <span>${primeiroNome[0]}<span>!`;
        }

        if (document.documentElement.classList.contains('enUS')) {
          this.userWelcome.innerHTML = `Welcome <span>${primeiroNome[0]}<span>!`;
        }
      }
    }
  }

  mostrarFoto(){
    if(localStorage.getItem('dados')){
    const image = JSON.parse(localStorage.getItem('dados')).image;

    if(image){
      const imgTag = document.createElement('img');
      imgTag.setAttribute('src', image)
      imgTag.classList.add('user-image')
      const nav = document.querySelector('.menu .grid');
      nav.appendChild(imgTag);
    }
  }
  }

  initEvents() {
    const dados = this.getDados();

    if (dados) {
      this.getDados();
      this.getCep(dados.cep);
      this.salvarDados();
      location.reload();
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
      this.mostrarFoto();
      this.buttonEvents();
      this.languageButtonEvent();
      this.userImage();
    }
    return this;
  }
}
