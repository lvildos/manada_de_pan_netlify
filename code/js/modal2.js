(function() {
  var modal = document.getElementById("cestaModal");
  var btn = document.getElementById("cestaBtn");
  var span = document.getElementsByClassName("close2")[0];

  btn.onclick = function() {
      modal.style.display = "block";
      actualizarCesta();
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  window.onload = function() {
      actualizarCesta();
  }
})();
