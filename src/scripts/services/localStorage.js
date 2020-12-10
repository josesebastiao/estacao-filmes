let filmesFavoritos = [];

function addFilmeFavorito(title, cover) {

  var index = filmesFavoritos.findIndex(i => i.name === title );

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
}