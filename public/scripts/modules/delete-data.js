//Deletar localstorage
export default function deleteLocalStorage(){
    const buttonDeleteData = document.querySelector('.button-delete-data');

    if(localStorage.getItem('dados')){
        buttonDeleteData.style.display = 'flex';
    }

    buttonDeleteData.addEventListener('click', function(){
        localStorage.removeItem('dados');
        location.reload();
    })
}