console.log('api')

async function buscarPopulares(){
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR&page=1");
    const json = await res.json();
    return json.results;
}

async function gerarCards(listaFilmes) {
    const filmes = await listaFilmes();
    const sectionCards = document.getElementsByClassName('cards')[0];
    filmes.forEach(
      filme => {
        filme.cardId = filmes.indexOf(filme); //pega o id do card do filme
        console.log(filme.cardId);
        sectionCards.innerHTML += `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" alt="">
          <div class="card-footer">
          <p>${filme.title}</p>
          </div>
        </div>

        <section class="pop" id="${filme.cardID}>
          <h1>${filme.title}</h1>
          <section class="cdescricao">
            <ul>
              <li class="halfline">
                <p id="titulo">Título:</p>
                <p class="vl" id="titulofilme">${filme.title}</p>
              </li>
              <li class="halfline">
                <p class="lbl">Gênero:</p>
                <p class="vl" id="generofilme">${filme.genre_ids}</p>
              </li>
              <li class="halfline">
                <p class="lbl">Lançamento:</p>
                <p class="vl" id="anofilme">${filme.release_date}</p>
              </li>
              <li class="halfline">
                <p class="lbl">Diretor:</p> 
                <p class="vl" id="diretorfilme">Nome do Diretor</p>
              </li>
              <div id="heart">
                  <ul>
                      <li class="lbl">Sinopse:</li>
                      <li>
                          <a href="#">
                              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M30 53.375L26.375 50.075C13.5 38.4 5 30.7 5 21.25C5 13.55 11.05 7.5 18.75 7.5C23.1 7.5 27.275 9.525 30 12.725C32.725 9.525 36.9 7.5 41.25 7.5C48.95 7.5 55 13.55 55 21.25C55 30.7 46.5 38.4 33.625 50.1L30 53.375Z" fill="#0E2137" class="favourite"/>
                              </svg>
                          </a>
                      </li>
                  </ul>
                  <p id="resumofilme">${filme.overview}</p>
              </div>
            </ul>
          </section>
        </section>
            `
      }
    );
}

gerarCards(buscarPopulares);
