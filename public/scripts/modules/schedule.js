export default function scheduleModal(buttonSchedule, container, close, modalSchedule) {
  const scheduleButton = document.querySelector(buttonSchedule);
  const modalContainer = document.querySelector(container);
  const closeButton = document.querySelector(close);
  const modal = document.querySelector(modalSchedule);

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
