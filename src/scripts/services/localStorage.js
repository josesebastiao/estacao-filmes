const addFav = document.querySelectorAll('path.favourite'); //retorna um array

function addFilmeFavorito() { // como vou fazer essa função ser ouvida por todos do array? forEach?

  let filmesFavoritos = [];
  
  let title = this.title // definitivamente não seria exatamente assim, mas pensei que seria inteligente usarmos o this
  let cover = this.image 

  var index = filmesFavoritos.findIndex(i => i.title === title );

  if (index > -1) {
    filmesFavoritos.splice(index, 1);
    localStorage.setItem("filmesFavoritos", JSON.stringify(filmesFavoritos));
    
  } else {
    filmesFavoritos.push(
      {
        name: title,
        image: cover,
      });
      localStorage.setItem("filmesFavoritos", JSON.stringify(filmesFavoritos));
    }

    console.log(filmesFavoritos)
}


addFav.forEach(item => item.addEventListener('click', addFilmeFavorito)