export default function numerosClientes() {
  const clientesP = document.querySelector('.numeros-clientes-text');
  const funcionamento = document.querySelector('[data-semana]');

  let numeroInicial = Math.floor(Math.random() * (50 - 10 + 1) + 10);

  function addNumber(element) {
    if (funcionamento.classList.contains('aberto')) {
      setInterval(() => {
        if (document.documentElement.classList.contains('ptBR')) {
          element.innerHTML = `Número de clientes sendo atendidos no momento: ${
            Math.random() < 0.5 ? numeroInicial++ : numeroInicial--
          }`;
        }

        if (document.documentElement.classList.contains('enUS')) {
          element.innerHTML = `Number of customers currently being attended: ${
            Math.random() < 0.5 ? numeroInicial++ : numeroInicial--
          }`;
        }
      }, 2000);
    }
  }
  addNumber(clientesP);
}
