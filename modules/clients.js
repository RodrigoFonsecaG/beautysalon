export default function numerosClientes() {
  const clientesP = document.querySelector('.numeros-clientes-text');
  const funcionamento = document.querySelector('[data-semana]');
  const horaAgora = new Date().getUTCHours() - 3;

  function addNumber(element) {
    let i =0;

    if (funcionamento.classList.contains('aberto')) {
      setInterval(() => {
        let tempo = (element.innerHTML = i++);

        
      }, 1800);
    }

    if (!funcionamento.classList.contains('aberto') || (8 < horaAgora > 18)) {
      element.innerHTML = 0;

    }
  }
  addNumber(clientesP);


}
