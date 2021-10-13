export default function funcionamento() {
  const data = new Date();
  const diaAgora = data.getDay();
  const horaAgora = data.getUTCHours() - 3;

  const funcionamento = document.querySelector('[data-semana]');
  const diasSemana = funcionamento.dataset.semana.split(',').map(Number)
  const horarioSemana = funcionamento.dataset.horario.split(',').map(Number)

    const semanaAberto = diasSemana.indexOf(diaAgora) !== -1;
    const horarioAberto = horaAgora >= horarioSemana[0] && horaAgora < horarioSemana[1];

    if(semanaAberto && horarioAberto){
        funcionamento.classList.add('aberto');
        return true;
    }
    else{
      return false;
    }


  
}
