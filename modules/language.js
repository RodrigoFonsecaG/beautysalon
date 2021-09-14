export default function changeLanguage(lang) {
  let modificableTexts = document.querySelectorAll('.br');
  modificableTexts = Array.from(modificableTexts);

  async function languageFile(lang) {
    const languageResponse = await fetch(`../languages/${lang}.json`);
    const languageJSON = await languageResponse.json();

    for (let i = 0; i < Object.keys(languageJSON.text).length; i++) {
      if (document.documentElement.classList.contains(lang)) {
        modificableTexts[i].innerHTML = languageJSON.text[i];
      }
    }
  }
  languageFile(lang);
}
