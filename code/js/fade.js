document.addEventListener('DOMContentLoaded', function() {
  const opcionesNav2 = document.querySelectorAll('.opciones-nav2');
  const infoCajas = document.querySelectorAll('.info-caja');

  // Función para manejar el clic en las opciones
  function handleOptionClick(e) {
    e.preventDefault(); // Evitar comportamiento por defecto

    const idSeccion = this.getAttribute('href');
    const seccionInfo = document.querySelector(idSeccion);

    // Ocultar todas las cajas primero
    infoCajas.forEach(caja => {
      if (caja !== seccionInfo && caja.style.display === 'block') {
        caja.classList.remove('visible');
        caja.classList.add('hidden');
        setTimeout(() => {
          caja.style.display = 'none';
        }, 500); // Tiempo igual al de la transición
      }
    });

    // Alternar la visibilidad de la sección seleccionada
    if (seccionInfo.style.display === 'block') {
      seccionInfo.classList.remove('visible');
      seccionInfo.classList.add('hidden');
      setTimeout(() => {
        seccionInfo.style.display = 'none';
      }, 500); // Tiempo igual al de la transición
    } else {
      seccionInfo.style.display = 'block';
      setTimeout(() => {
        seccionInfo.classList.remove('hidden');
        seccionInfo.classList.add('visible');
      }, 10); // Ajustar para permitir que el display se aplique antes de la opacidad
    }
  }

  // Aplicar la lógica solo a las dos primeras opciones
  opcionesNav2.forEach((opcion, index) => {
    if (index < 2) { // Solo a las dos primeras opciones
      opcion.addEventListener('click', handleOptionClick);
    }
  });
});
