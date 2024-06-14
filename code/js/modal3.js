// Obtener elementos
var modalPedido = document.getElementById('modalPedido');
var modalContentPedido = document.querySelector('.modal-content-pedido');
var misPedidosBtn = document.getElementById('misPedidosBtn');
var misPedidosContent = document.getElementById('misPedidosContent');

// Cuando se hace clic en el botón "Mis pedidos", mostrar el modal
misPedidosBtn.addEventListener('click', function() {
  modalPedido.style.display = 'block';
  var misPedidos = JSON.parse(localStorage.getItem('misPedidos')) || [];
  misPedidosContent.innerHTML = ''; // Vacía el contenido previo

  // Recorrer todos los pedidos
  misPedidos.forEach(function(pedido) {
    // Elemento de información del pedido
    var pedidoInfo = document.createElement('p');
    pedidoInfo.textContent = 'Identificador del pedido: ' + pedido.id;
    pedidoInfo.classList.add('pedido-info'); // Agregar clase para estilo específico
    misPedidosContent.appendChild(pedidoInfo);

    // Recorrer elementos del pedido
    pedido.productos.forEach(function(itemsPedido) {
      // Elemento de información del producto del pedido
      var productoInfo = document.createElement('p');
      productoInfo.textContent = itemsPedido.nombre + ' - ' + itemsPedido.precio + '€';
      productoInfo.classList.add('producto-info'); // Agregar clase para estilo específico
      misPedidosContent.appendChild(productoInfo);
    });
  });
});

// Cuando se hace clic en la 'x', cerrar el modal
modalContentPedido.querySelector('.close-pedido').addEventListener('click', function() {
  modalPedido.style.display = 'none';
});

// Cuando se hace clic fuera del modal, cerrarlo también
window.addEventListener('click', function(event) {
  if (event.target === modalPedido) {
    modalPedido.style.display = 'none';
  }
});
