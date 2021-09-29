export default class validarCpf {
  constructor(cpfElement) {
    //recebe o elemento do query selector
    this.cpf = cpfElement;
    this.cpfInput = document.querySelector('#cpf')
    this.errorMessage = document.querySelector('.error-message')
  }

  limpar(cpf) {
    //metodo que limpa cpf
    return cpf.replace(/\D/g, '');
  }
  construir(cpf) {
    //metodo que construi cpf padrão
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  formatar(cpf) {
    //metodo que limpa e constroi cpf utilizando os metodos anteriores
    const cpfLimpo = this.limpar(cpf);
    return this.construir(cpfLimpo);
  }
  validar(){ //metodo que verifica se o cpf é valido atraves do regexp e retorna true or false
    const matchCpf = this.cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g);
    return(matchCpf && matchCpf[0] === this.cpf); 
}

    cpfFinal(){
        if(this.validar()){
            this.cpfInput.classList.remove('invalido')
            this.errorMessage.style.display = 'none';
            return this.formatar(this.cpf); 
        }
        else{
            this.cpfInput.classList.add('invalido');
            this.errorMessage.style.display = 'flex';
        }
    }
}
