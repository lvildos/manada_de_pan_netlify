document.addEventListener('DOMContentLoaded', function() {
  const enlace = document.getElementById('enlace2');
  const contenido = document.getElementById('contenido');

  enlace.addEventListener('click', function(e) {
    e.preventDefault(); // Evitar que el enlace recargue la página

    fetch("index3.html")
    .then((response) => response.text())
    .then((data) => {contenido .innerHTML = data;}
  );
  });
});