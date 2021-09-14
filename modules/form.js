export default function scheduleForm() {
  const changeLanguageButton = document.querySelector('.lang');
  const formularioInputs = document.querySelectorAll('#formulario input');
  const submitButton = document.querySelector('.button-submit');
  const userWelcome = document.querySelector('.user-welcome');
  const userLocale = document.querySelector('.user-locale');

  /*Adiciona evento no botão de mudar linguagem de mostrar mensagem de bem-vindo dependendo da linguagem*/
  changeLanguageButton.addEventListener('click', mostrarDados);

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    init();
  });

  function getDados() {
    const arrayDados = Array.from(formularioInputs);

    const dadosArray = arrayDados.map((input) => {
      return input.value;
    });

    const [nome, email, telefone, cpf, cep] = dadosArray;

    if(nome && email && telefone && cpf && cep){
    return {
      nome,
      email,
      telefone,
      cpf,
      cep
    }
  }
  }

    /*API DE CEP*/
    const getCep = async (cep) => {
      const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepJSON = await cepResponse.json();
  
      const {logradouro, bairro, localidade,uf} = cepJSON;

      const userLocal = userLocale.innerHTML = `<br>${logradouro}, ${bairro}<br>${localidade}, ${uf}`

      return userLocal;
    }
  

  function salvarDados() {
    const dados = getDados();
    if (!((dados.nome && dados.email && dados.telefone && dados.cpf && dados.cep) === '')) {
      const dadosJSON = JSON.stringify(dados);
      localStorage.setItem('dados', dadosJSON);
    }
  }

  function mostrarDados() {
    const dadosRecuperados = JSON.parse(localStorage.getItem('dados'));
    const cep = dadosRecuperados.cep;
    const nomeCompleto = dadosRecuperados.nome.split(' ');

    getCep(cep);

    if (document.documentElement.classList.contains('ptBR')) {
      userWelcome.innerHTML = `Seja bem-vindo <span>${nomeCompleto[0]}<span>!`;
    }

    if (document.documentElement.classList.contains('enUS')) {
      userWelcome.innerHTML = `Welcome <span>${nomeCompleto[0]}<span>!`;
    }
  }
  
  mostrarDados();

  function init() {
    const dados = getDados();
    getDados();
    salvarDados();
    getCep(dados.cep);
    mostrarDados();
  }
}

