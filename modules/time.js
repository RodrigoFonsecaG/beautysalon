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
      'Sábado',
    ];
    
    return diaTexto[dia];
  }

  function construirData(){
    let diaTexto = converterDiaTexto(diaSemana)
    let mesTexto = converterMesTexto(mes);
    actualDate.innerHTML = `${diaTexto}, ${diaMes} de ${mesTexto} de ${ano}<span> ${hora}:${minutos}<span>`
  }

  construirData();
}
