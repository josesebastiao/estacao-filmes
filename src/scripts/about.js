const filmesfavoritos = [274,228150,807,550,1592];
let filmes = [];

for (let i = 0; i < filmesfavoritos.length; i ++){
    let key = filmesfavoritos[i];
    fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR`)
    .then(function(response){
        return response.json();
    })
    .then(function(filme){
        const sectionCards = document.getElementsByClassName('our-cards')[0];
        sectionCards.innerHTML += `
        <div class="card checked" id="${i}">
            <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="">
            <div class="card-footer">
            <p>${filme.title}</p>
            </div>
        </div>
        `
        console.log(filme);
        filmes.push(filme);
    })
    .catch(console.log.bind(console));
};

console.log(filmes);

sessionStorage.setItem('filmes',JSON.stringify(filmes));

