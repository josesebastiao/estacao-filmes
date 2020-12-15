
function addFilmeFavorito(filme) { // como vou fazer essa função ser ouvida por todos do array? forEach?

  let filmesFavoritos = JSON.parse(localStorage.getItem('filmesFavoritos'));

  if (!filmesFavoritos) filmesFavoritos = [];
  
  const id = filme.id
  const title = filme.title // definitivamente não seria exatamente assim, mas pensei que seria inteligente usarmos o this
  const cover = filme.backdrop_path

  const index = filmesFavoritos.findIndex(i => i.name === title );

  if (index > -1) {
    const novosFavoritos = filmesFavoritos.filter(i => i.name !== title);
    localStorage.setItem("filmesFavoritos", JSON.stringify(novosFavoritos));
    
  } else {
    filmesFavoritos.push(
      {
        id: id,
        name: title,
        image: cover,
      });
      localStorage.setItem("filmesFavoritos", JSON.stringify(filmesFavoritos));
    }
}

/*
function listarFilmeFavorito() {
  let filmesFavoritos = JSON.parse(localStorage.getItem('filmesFavoritos'));
  
  if (!filmesFavoritos) return

  const sectionCards = document.getElementsByClassName('cards')[0];

  sectionCards.innerHTML = ``

        filmesFavoritos.forEach(
            (filme, indice) => {
                sectionCards.innerHTML += `
                <div class="card" id="${filme.id}">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${filme.imagem}" alt="">
                    <div class="card-footer">
                    <p>${filme.name}</p>
                    </div>
                </div>
                `
            }



}
*/