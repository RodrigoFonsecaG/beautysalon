export default function scheduleModal() {
  const scheduleButton = document.querySelector('.button-schedule');
  const modalContainer = document.querySelector('.modal-container');
  const closeButton = document.querySelector('.close');
  const modal = document.querySelector('.modal');

  scheduleButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalContainer.classList.add('ativo');
  });

  closeButton.addEventListener('click', () => {
      modalContainer.classList.remove('ativo');
  })

  modalContainer.addEventListener('click', (event) => {
    (modal.contains(event.target)) ? '' : modalContainer.classList.remove('ativo');
  })
}
