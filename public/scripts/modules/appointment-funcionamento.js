import funcionamento from './funcionamento.js';

export default function AppointmentFuncionamento(){

    const funcionamentoData = document.querySelector('[data-semana]');
    const aberto = funcionamento();
    console.log(aberto)
    
    if(aberto == false){
        funcionamentoData.style.display = 'block';
    }   
}