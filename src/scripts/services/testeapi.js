

async function buscarPopulares(){
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR&page=1");
    const json = await res.json();
    return json.results;
}

async function gerarCards(listaFilmes) {
    const filmes = await listaFilmes();
    const titleCardFooter = document.getElementsByClassName('title-card-footer');
    const imgCard = document.getElementsByClassName('img-card');

    for(let i=0; i<imgCard.length;i++){
        titleCardFooter[i].innerText = filmes[i].title;
        imgCard[i].src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filmes[i].poster_path}`;
    }
}

gerarCards(buscarPopulares);
