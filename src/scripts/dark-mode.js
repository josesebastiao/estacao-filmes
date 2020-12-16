/*const darkBtn = document.querySelector('#btnDark');
const darkBtn2 = document.querySelector('#btnDark2');

const darkMode = () => {
    document.body.classList.toggle('darkmode');
    document.querySelector('.pop').classList.toggle('darkmode');
    console.log('dark-mode')
}

darkBtn.addEventListener('click', darkMode)
darkBtn2.addEventListener('click', darkMode)
*/



const darkBtn = document.querySelector('#btnDark');
const darkBtn2 = document.querySelector('#btnDark2');

if(localStorage.getItem("dark") == null){
    localStorage.setItem("dark",true)
}

if(localStorage.getItem("dark") == "false" && !document.body.classList.contains('darkmode')){
    document.body.classList.add('darkmode')
    document.querySelector('.pop').classList.add('darkmode')
    localStorage.setItem("dark",true)
}

if(localStorage.getItem("dark") == "true" && document.body.classList.contains('darkmode')){
    document.body.classList.add('darkmode')
    document.querySelector('.pop').classList.add('darkmode')
    localStorage.setItem("dark",false)
}


const darkMode = () => {

    if(localStorage.getItem("dark") == "true"){
        document.body.classList.add('darkmode')
        document.querySelector('.pop').classList.add('darkmode')
        localStorage.setItem("dark",false)
        return false
    }

    if(localStorage.getItem("dark") == "false"){
        document.body.classList.remove('darkmode')
        document.querySelector('.pop').classList.remove('darkmode')
        localStorage.setItem("dark",true)
        return false
    }
}

darkBtn.addEventListener('click', darkMode)
darkBtn2.addEventListener('click', darkMode)
