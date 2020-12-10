const params = new URLSearchParams({
  query: location.search.slice(1),
});

function searchSubmit() {

  const query = document.getElementById('search').value;
  console.log(query);
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
      sessionStorage.setItem('filmes',JSON.stringify(filmes.results));
  })
}

buscarFilme();