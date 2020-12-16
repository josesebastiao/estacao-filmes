const id = location.search.slice(4);

async function buscarGeneroFilme(){
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR")
  .then(function(response){
      return response.json();
  })
  .then(function(genres){
    const generos = genres.genres;

    console.log(generos);
      
  })
};

buscarGeneroFilme();


function buscarId() {
  
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR`)
  .then(function (response){
    return response.json();
  })
  .then(function (filme) {
    const cardDetails = document.querySelector('main');

    cardDetails.innerHTML = `

    <section class="card-detail">
      <div class="card">
        <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" "alt="">
        <div class="card-footer">
          <p>${filme.title}</p>
        </div>
      </div>

      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 53.375L26.375 50.075C13.5 38.4 5 30.7 5 21.25C5 13.55 11.05 7.5 18.75 7.5C23.1 7.5 27.275 9.525 30 12.725C32.725 9.525 36.9 7.5 41.25 7.5C48.95 7.5 55 13.55 55 21.25C55 30.7 46.5 38.4 33.625 50.1L30 53.375Z" fill="#0E2137"/>
      </svg>

    </section>

      <h6>Título:</h6>
      <p>
        ${filme.title}
      </p>

      <h6>Gênero:</h6>
      <p>
        ${[filme.genre]}
      </p>

      <h6>Lançamento:</h6>
      <p>
        ${filme.release}
      </p>

      <h6>Diretor:</h6>
      <p>
        ${filme.director}
      </p>

      <h6>Sinopse:</h6>
      <p>
        ${filme.overview}
      </p>

    `
    console.log(filme.genre)
  })


}

buscarId();

console.log(buscarId());

console.log(id);