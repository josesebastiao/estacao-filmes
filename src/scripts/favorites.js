let filmes = [];
let x = 0;
for (let i=0; i < localStorage.length; i ++){
    let key = localStorage.key(i);
    if (key === "dark") {continue}; 
    if (key === "OTelJS.ClientId") {continue}; 
    let valores = localStorage.getItem(key);
    filmes.push(JSON.parse(valores));
    fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR`)
    .then(function(response){
        return response.json();
    })
    .then(function(filme){
        const sectionCards = document.getElementsByClassName('cards')[0];
        sectionCards.innerHTML += `
        <div class="card checked" id="${x}">
            <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" alt="">
            <div class="card-footer">
            <p>${filme.title}</p>
            </div>
        </div>
        `
        x ++;
    })
    .catch(console.log.bind(console));
};

sessionStorage.setItem('filmes',JSON.stringify(filmes));