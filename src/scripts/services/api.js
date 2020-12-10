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
        sessionStorage.setItem('filmes',JSON.stringify(filmes.results));
    })
    .catch(console.log.bind(console));
};

buscarPopulares();

//clicar categoria
let subcategories = document.getElementsByClassName("subcategories");
for(let subcategory of subcategories){
    subcategory.onclick = function() {
        const sectionCards = document.getElementsByClassName('cards')[0];
        while (sectionCards.firstChild) {
            sectionCards.removeChild(sectionCards.lastChild)
        };
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=54d5d6e26602b36d146edeb90b272ae5&language=pt-BR&page=2&with_genres="+subcategory.id)
        .then(function(response){
            return response.json();
        })
        .then(function(filmes){
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
            sessionStorage.setItem('filmes',JSON.stringify(filmes.results));
            preenchePopup();
        })
        .catch(console.log.bind(console));
    }
};