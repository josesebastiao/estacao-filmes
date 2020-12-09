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


// SEARCHING

const params = new URLSearchParams({
    query: location.search.slice(1),
});

function searchSubmit() {

    const query = document.getElementById('search').value;
    const queryMobile = document.getElementById('search-mobile').value;
    console.log(queryMobile);
    if(queryMobile == ''){
        location.href = `/search.html?${query}`;
    } else {
        location.href = `/search.html?${queryMobile}`;
    }
}


const querystring = params.getAll('query')[0];

console.log(querystring);



console.log(location.search);

const url = `https://api.themoviedb.org/3/search/movie?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-br&query=${querystring}`

console.log(url);

function buscarFilme() {
    fetch(url)
    .then(function(response){
    return response.json();
    })
    .then(function(filmes){
        const sectionCards = document.getElementsByClassName('search-cards')[0];
        filmes.results.forEach(
            (filme, indice) => {
                sectionCards.innerHTML += `
                <div class="card" id="${indice}">
                    <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="">
                    <div class="card-footer">
                    <p>${filme.title}</p>
                    </div>
                </div>
                `
            }
        );
    })
}

buscarFilme();


// async function gerarCards(listaFilmes) {
//     const filmes = await listaFilmes();
//     const sectionCards = document.getElementsByClassName('cards')[0];
//     filmes.forEach(
//       filme => {
//         filme.cardId = filmes.indexOf(filme); //pega o id do card do filme
//         console.log(filme.cardId);
//         sectionCards.innerHTML += `
//         <div class="card">
//           <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" alt="">
//           <div class="card-footer">
//           <p>${filme.title}</p>
//           </div>
//         </div>
//         <section class="pop" id="${filme.cardID}>
//           <h1>${filme.title}</h1>
//           <section class="cdescricao">
//             <ul>
//               <li class="halfline">
//                 <p id="titulo">Título:</p>
//                 <p class="vl" id="titulofilme">${filme.title}</p>
//               </li>
//               <li class="halfline">
//                 <p class="lbl">Gênero:</p>
//                 <p class="vl" id="generofilme">${filme.genre_ids}</p>
//               </li>
//               <li class="halfline">
//                 <p class="lbl">Lançamento:</p>
//                 <p class="vl" id="anofilme">${filme.release_date}</p>
//               </li>
//               <li class="halfline">
//                 <p class="lbl">Diretor:</p> 
//                 <p class="vl" id="diretorfilme">Nome do Diretor</p>
//               </li>
//               <div id="heart">
//                   <ul>
//                       <li class="lbl">Sinopse:</li>
//                       <li>
//                           <a href="#">
//                               <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                   <path d="M30 53.375L26.375 50.075C13.5 38.4 5 30.7 5 21.25C5 13.55 11.05 7.5 18.75 7.5C23.1 7.5 27.275 9.525 30 12.725C32.725 9.525 36.9 7.5 41.25 7.5C48.95 7.5 55 13.55 55 21.25C55 30.7 46.5 38.4 33.625 50.1L30 53.375Z" fill="#0E2137" class="favourite"/>
//                               </svg>
//                           </a>
//                       </li>
//                   </ul>
//                   <p id="resumofilme">${filme.overview}</p>
//               </div>
//             </ul>
//           </section>
//         </section>
//             `
//       }
//     );
// }

buscarPopulares();