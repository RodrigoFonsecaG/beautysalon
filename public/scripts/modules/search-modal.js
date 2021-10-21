export default function searchModal(buttonSchedule, container, close, modalSchedule) {
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
}
  