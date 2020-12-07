console.log('api')

// async function buscarPopulares(){
//     const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR&page=1");
//     const json = await res.json();
//     return json.results;
// };
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

function buscarPopulares(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR&page=1")
    .then(function(response){
        return response.json();
    })
    .then(function(filmes){
        const sectionCards = document.getElementsByClassName('cards')[0];
        filmes.results.forEach(
            (filme, indice) => {
                sectionCards.innerHTML += `
                <div class="card" id="${indice}">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" alt="">
                    <div class="card-footer">
                    <p>${filme.title}</p>
                    </div>
                </div>
                `
            }
        );
        let imagens = document.getElementsByClassName('card');
        let janelapop = document.querySelector('.pop');
        let corpo = document.querySelector('body');
        let heart = document.querySelector('.favourite');

        for (let imagem of imagens) {
            imagem.onmouseover = function() {
                let generoFilme = "";
                filmes.results[imagem.getAttribute("id")].genre_ids.forEach(
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
                    janelapop.style.left = `${imagem.offsetLeft - janelapop.offsetWidth}px`;
                };
                janelapop.style.top = `${imagem.offsetTop}px`;
                let resumofilme = filmes.results[imagem.getAttribute("id")].overview;
                if (resumofilme == "") {resumofilme = "Sinopse não encontrada."};
                document.getElementById("h1titulofilme").innerText = filmes.results[imagem.getAttribute("id")].title;
                document.getElementById("titulofilme").innerText = filmes.results[imagem.getAttribute("id")].title;
                document.getElementById("resumofilme").innerText = resumofilme;
                document.getElementById("anofilme").innerText = filmes.results[imagem.getAttribute("id")].release_date.substr(0,4);
                document.getElementById("generofilme").innerText = generoFilme;
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
    })
    .catch(console.log.bind(console));
};

// async function gerarCards() {
//     const filmes = await buscarPopulares();
//     const sectionCards = document.getElementsByClassName('cards')[0];
//     filmes.forEach(
//         (filme, indice) => {
//             sectionCards.innerHTML += `
//             <div class="card" id="${indice}">
//                 <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" alt="">
//                 <div class="card-footer">
//                 <p>${filme.title}</p>
//                 </div>
//             </div>
//             `
//         }
//     );
// };

buscarPopulares();