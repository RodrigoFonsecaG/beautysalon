export default function numerosClientes() {
  const clientesP = document.querySelector('.numeros-clientes-text');
  const funcionamento = document.querySelector('[data-semana]');

  function addNumber(element) {
    let i = localStorage.tempo || 0;

    if (funcionamento.classList.contains('aberto')) {
      setInterval(() => {
        let tempo = (element.innerHTML = i++);

        localStorage.setItem('tempo', tempo);
      }, 1000);
    }

    if (!funcionamento.classList.contains('aberto')) {
      element.innerHTML = 0;
      localStorage.tempo = 0;
    }
  }
  addNumber(clientesP);

  document.onchange = addNumber;
}
