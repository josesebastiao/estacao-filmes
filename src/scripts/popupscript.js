let generos = [];

async function buscarGeneroFilme(){
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR")
    .then(function(response){
        return response.json();
    })
    .then(function(genre){
        genre.genres.forEach(
            genero => {generos.push(genero)}
        );
        return genre.genres;
    })
    .catch(console.log.bind(console));
};

buscarGeneroFilme();

let t = 1000;
setTimeout(() => {
    preenchePopup();
},t);

function preenchePopup() {
    let filmes = JSON.parse(sessionStorage.getItem('filmes'));
    sessionStorage.clear();
    let imagens = document.getElementsByClassName('card');
    let janelapop = document.querySelector('.pop');
    let corpo = document.querySelector('body'); 
    let heart = document.querySelector('.favourite');
    for (let imagem of imagens) {
        imagem.onmouseover = function() {
            let generoFilme = "";
            filmes[imagem.getAttribute("id")].genre_ids.forEach(
                genre => {
                    let pos = generos.findIndex((genero, index, array) => genero.id == genre);
                    if (pos >= 0){
                        generoFilme += generos[pos].name + ", ";
                    };                       
                }
            );
            if (generoFilme.length > 0){
                generoFilme = generoFilme.substr(0,generoFilme.length-2);
            };
            janelapop.style.zIndex = 5;
            janelapop.style.opacity = 1;
            if ((imagem.offsetLeft + imagem.offsetWidth + janelapop.offsetWidth) <= corpo.offsetWidth) {
                janelapop.style.left = `${imagem.offsetLeft + imagem.offsetWidth}px`;
            } else {
                let vl = imagem.offsetLeft - janelapop.offsetWidth > 0 ? imagem.offsetLeft - janelapop.offsetWidth : 0; 
                janelapop.style.left = `${vl}px`;
            };
            janelapop.style.top = `${imagem.offsetTop}px`;
            for (let i=0; i < localStorage.length; i ++){
                let key = localStorage.key(i);
                if (key === "dark") {
                    continue
                } else {
                    if (filmes[imagem.getAttribute("id")].id == key){
                        imagem.classList.add("checked");
                        break;
                    };
                }; 
            };
            buscaDiretores(filmes[imagem.getAttribute("id")].id);
            let resumofilme = filmes[imagem.getAttribute("id")].overview;
            if (resumofilme == "") {resumofilme = "Sinopse não encontrada."};
            document.getElementById("h1titulofilme").innerText = filmes[imagem.getAttribute("id")].title;
            document.getElementById("titulofilme").innerText = filmes[imagem.getAttribute("id")].title;
            document.getElementById("resumofilme").innerText = resumofilme;
            document.getElementById("anofilme").innerText = filmes[imagem.getAttribute("id")].release_date.substr(0,4);
            document.getElementById("generofilme").innerText = generoFilme;
            janelapop.setAttribute('id',`#${imagem.getAttribute("id")}`);
            if (document.getElementById(document.getElementsByClassName('pop')[0].id.slice(1)).classList == 'card checked') {
                heart.style.fill = "#EB2FA0";
            } else {
                heart.style.fill = "#0E2137";
            };
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
        document.getElementById(document.getElementsByClassName('pop')[0].id.slice(1)).classList.toggle('checked');
        let pos = document.getElementById(document.getElementsByClassName('pop')[0].id.slice(1)).id;
        if (document.getElementById(document.getElementsByClassName('pop')[0].id.slice(1)).classList == 'card checked') {
            heart.style.fill = "#EB2FA0";
            localStorage.setItem(filmes[pos].id,JSON.stringify(filmes[pos]))
        } else {
            heart.style.fill = "#0E2137";
            localStorage.removeItem(filmes[pos].id);
        }; 
    };
    clearInterval(t);
};

function buscaDiretores(idFilme){
    fetch(`https://api.themoviedb.org/3/movie/${idFilme}/credits?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR`)
    .then(function(response){
        return response.json();
    })
    .then(function(elenco){
        let diretores = "";
        elenco.crew.forEach(function(person){
            if (person.job === 'Director'){
                diretores += person.name + ", ";
            };
        });
        if (diretores.length > 0) {
            diretores = diretores.substr(0,diretores.length-2);
        } else {
            diretores = "Não informado";
        }
        document.getElementById("diretorfilme").innerText = diretores;
    })
    .catch(console.log.bind(console));
};