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
            console.log(filme)
            sectionCards.innerHTML += `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.poster_path}" alt="">
                <div class="card-footer">
                <p>${filme.title}</p>
                </div>
            </div>
            `
        }
    );
}

gerarCards(buscarPopulares);
