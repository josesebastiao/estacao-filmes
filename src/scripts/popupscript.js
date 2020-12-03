let imagens = document.querySelectorAll('img');
let janelapop = document.querySelector('.pop');
let corpo = document.querySelector('body')

for (let imagem of imagens) {
    imagem.onmouseover = function() {
        console.log(corpo.offsetTop)
        janelapop.style.zIndex = 1;
        if ((imagem.offsetLeft + imagem.offsetWidth + janelapop.offsetWidth) <= corpo.offsetWidth) {
            janelapop.style.left = `${imagem.offsetLeft + imagem.offsetWidth}px`;
        } else {
            janelapop.style.left = `${imagem.offsetLeft - janelapop.offsetWidth}px`;
        };
        janelapop.style.top = `${imagem.offsetTop}px`;
    };
    
    imagem.onmouseleave = function() {
        janelapop.style.zIndex = -1;  
    }

    janelapop.onmouseover = function() {
        janelapop.style.zIndex = 1;
    }

    janelapop.onmouseleave = function() {
        janelapop.style.zIndex = -1;
    }
}