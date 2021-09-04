export default function changeColor(){
 const slider = document.querySelector('#slider');


 function handleColor(){
    document.documentElement.style.setProperty('--hue', slider.value);
 }

 slider.addEventListener('input', handleColor)
}