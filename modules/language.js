export default class changeLanguage {
  constructor(originalLanguageClass, langButton) {
    this.modificableTexts = document.querySelectorAll(originalLanguageClass);
    this.langButton = document.querySelector(langButton);

    this.handleLanguage = this.handleLanguage.bind(this);
  }

  langEvents() {
    this.langButton.addEventListener('click', this.handleLanguage);
  }

  handleLanguage() {
    const html = document.documentElement;

    if (html.classList.contains('ptBR')) {
      html.classList.remove('ptBR');
      html.classList.add('enUS');
      this.languageFile('enUS');
    } else if (html.classList.contains('enUS')) {
      html.classList.remove('enUS');
      html.classList.add('ptBR');
      this.languageFile('ptBR');
    }
  }

  async languageFile(lang) {
    this.modificableTexts = Array.from(this.modificableTexts);

    const languageResponse = await fetch(`../languages/${lang}.json`);
    const languageJSON = await languageResponse.json();

    for (let i = 0; i < Object.keys(languageJSON.text).length; i++) {
        this.modificableTexts[i].innerHTML = languageJSON.text[i];
    }
  }

  init() {
    if (this.modificableTexts.length && this.langButton) {
      this.langEvents();
    }
    return this;
  }
}
