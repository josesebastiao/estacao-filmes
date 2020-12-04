let imagens = document.querySelectorAll('.card');
let janelapop = document.querySelector('.pop');
let corpo = document.querySelector('body');
let heart = document.querySelector('.favourite');

for (let imagem of imagens) {
    imagem.onmouseover = function() {
        
        console.log(imagem.offsetTop)

        janelapop.style.zIndex = 5;
        janelapop.style.opacity = 1;
        if ((imagem.offsetLeft + imagem.offsetWidth + janelapop.offsetWidth) <= corpo.offsetWidth) {
            janelapop.style.left = `${imagem.offsetLeft + imagem.offsetWidth}px`;
        } else {
            janelapop.style.left = `${imagem.offsetLeft - janelapop.offsetWidth}px`;
        };
        janelapop.style.top = `${imagem.offsetTop}px`;
    };
    
    imagem.onmouseleave = function() {
        janelapop.style.zIndex = -1; 
        janelapop.style.opacity = 0; 
    };

    janelapop.onmouseover = function() {
        janelapop.style.zIndex = 5;
        janelapop.style.opacity = 1;
    };

    janelapop.onmouseleave = function() {
        janelapop.style.zIndex = -1;
        janelapop.style.opacity = 0;
    };
};

heart.onclick = function(ev) {
    ev.preventDefault();
    if (heart.style.fill == "rgb(235, 47, 160)") {
        heart.style.fill = "#0E2137";
    } else {
        heart.style.fill = "#EB2FA0";
    }; 
};