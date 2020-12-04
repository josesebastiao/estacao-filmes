const darkBtn = document.querySelector('#btnDark');
const darkBtn2 = document.querySelector('#btnDark2');

const darkMode = () => {
    document.body.classList.toggle('darkmode');
    document.querySelector('.pop').classList.toggle('darkmode');
    console.log('dark-mode')
}

darkBtn.addEventListener('click', darkMode)
darkBtn2.addEventListener('click', darkMode)