export default class changeColor{
   constructor(slider){
      this.slider = document.querySelector(slider);
   }
 
 handleColor(){
    document.documentElement.style.setProperty('--hue', slider.value);
 }

 sliderEvents(){
   this.slider.addEventListener('input', this.handleColor)
 }

 init(){
    this.sliderEvents()
 }
}