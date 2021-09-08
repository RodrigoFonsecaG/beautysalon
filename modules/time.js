export default function actualTime() {
  const data = new Date();
  const diaMes = data.getDate();
  const diaSemana = data.getDay();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  const hora = data.getUTCHours() - 3;
  const minutos = data.getUTCMinutes();
  const actualDate = document.querySelector('.actualDate');

  function converterMesTexto(mes) {
    let mesTexto = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];

    return mesTexto[mes];
  }

  function converterDiaTexto(dia) {
    let diaTexto = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ];

    return diaTexto[dia];
  }

  function formatarTempo(tempo) {
    return tempo >= 10 ? tempo : `0${tempo}`;
  }

  function construirData() {
    let diaTexto = converterDiaTexto(diaSemana);
    let mesTexto = converterMesTexto(mes);
    if (document.documentElement.classList.contains('ptBR')) {
      actualDate.innerHTML = `${diaTexto}, ${diaMes} de ${mesTexto} de ${ano}<span> ${formatarTempo(
        hora
      )}:${formatarTempo(minutos)}<span>`;
    }
    if (document.documentElement.classList.contains('enUS')) {
      const dataEN = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
      }).format(data);

      const horaEN = new Intl.DateTimeFormat('en-US', {
        timeStyle: 'short'
      }).format(data);

      actualDate.innerHTML = `${dataEN}<span>${horaEN}</span>`;
    }
  }

  construirData();
}
