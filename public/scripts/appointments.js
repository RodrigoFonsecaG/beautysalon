const url = window.location.href;
const back = document.querySelector('.back-date');
const forward = document.querySelector('.forward-date');
const today = document.querySelector('.today-btn')

const urlDate = url.slice(34, url.length);
const urlWithoutDate = url.slice(0, 34);


function incrementDate() {
  const data = new Date(urlDate);

  const diaSeguinte = new Date(+data);
  const dataValor = diaSeguinte.getDate() + 1;

  diaSeguinte.setDate(dataValor);

  const diaSeguinteFinal = diaSeguinte.toISOString();

  return diaSeguinteFinal.slice(0,10);
}

function decrementDate() {
  const data = new Date(urlDate);

  const diaAnterior = new Date(+data);
  const dataValor = diaAnterior.getDate() - 1;
  diaAnterior.setDate(dataValor);

  const diaAnteriorFinal = diaAnterior.toISOString();

  return diaAnteriorFinal.slice(0,10);

}

function actualDate(){
    const data = new Date();

    return data.toISOString().slice(0,10)
}

forward.addEventListener('click', function(){
    const increment = incrementDate();
    window.location.href = `${urlWithoutDate}${increment}`  
})

back.addEventListener('click', function(){
    const decrement = decrementDate();
    window.location.href = `${urlWithoutDate}${decrement}`  
})

today.addEventListener('click', function(){
    const todayDate = actualDate();
    window.location.href = `${urlWithoutDate}${todayDate}`
})



