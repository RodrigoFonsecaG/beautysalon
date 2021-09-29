export default class numerosClientes {
  constructor(text, data) {
    this.clientesP = document.querySelector(text);
    this.funcionamento = document.querySelector(data);
    this.numeroInicial = Math.floor(Math.random() * (50 - 10 + 1) + 10);
  }

  addNumber(element) {
    if (this.funcionamento.classList.contains('aberto')) {
      //Se o estabelecimento estiver aberto executa a função
      setInterval(() => {
        if (document.documentElement.classList.contains('ptBR')) {
          element.innerHTML = `Número de clientes sendo atendidos no momento: ${
            Math.random() < 0.5 ? this.numeroInicial++ : this.numeroInicial--
          }`;
        }

        if (document.documentElement.classList.contains('enUS')) {
          element.innerHTML = `Number of customers currently being attended: ${
            Math.random() < 0.5 ? this.numeroInicial++ : this.numeroInicial--
          }`;
        }
      }, 2000);
    }
  }

  init() {
    if (this.clientesP && this.funcionamento) {
      this.addNumber(this.clientesP);
    }
    return this;
  }
}
