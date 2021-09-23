/*FRASE DO DIA*/

export default class dailyQuote {
  constructor(url, parentElement) {
    this.url = url;
    this.parent = document.querySelector(parentElement);
  }

  createElement() {
    const fraseP = document.createElement('p');
    this.parent.appendChild(fraseP);
    fraseP.classList.add('daily-quote');

    return fraseP;
  }

  async puxarDados() {
    const fraseP = this.createElement();

    try {
      const dadosResponse = await fetch(this.url);
      const dadosJson = await dadosResponse.json();
      fraseP.innerHTML = `<span>&ldquo;</span> ${dadosJson.slip.advice}`;
    } catch (erro) {
      console.log(erro);
    }
  }

  init() {
    this.puxarDados();
  }
}
