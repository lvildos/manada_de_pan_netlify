function agregarProducto(nombre, precio) {
  var cesta = JSON.parse(localStorage.getItem('cesta')) || [];
  cesta.push({ nombre, precio });
  localStorage.setItem('cesta', JSON.stringify(cesta));
  alert('Producto añadido a la cesta');
}

function actualizarCesta() {
  var cesta = JSON.parse(localStorage.getItem('cesta')) || [];
  var listaProductos = document.getElementById('cestaProductos');
  var totalPrecio = 0;
  var productosAgrupados = {};

  listaProductos.innerHTML = '';

  if (cesta.length === 0) {
    // Mostrar el mensaje si la cesta está vacía
    var mensajeVacio = document.createElement('p');
    mensajeVacio.textContent = 'Tu cesta está vacía';
    mensajeVacio.classList.add('mensajeVacio');
    listaProductos.appendChild(mensajeVacio);
  } else {
    // Agrupar productos por nombre y contar cuántas veces aparece cada uno
    cesta.forEach(producto => {
      var nombre = producto.nombre;
      var precio = parseFloat(producto.precio);

      if (productosAgrupados[nombre]) {
        productosAgrupados[nombre].cantidad++;
        productosAgrupados[nombre].precio += precio;
      } else {
        productosAgrupados[nombre] = {
          cantidad: 1,
          precio: precio
        };
      }
    });

    // Generar la lista de productos agrupados
    Object.keys(productosAgrupados).forEach(nombre => {
      var producto = productosAgrupados[nombre];
      var li = document.createElement('li');
      li.textContent = 'x' + producto.cantidad + ' ' + nombre + ' - ' + producto.precio.toFixed(2) + '€';
      
      var botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', function () {
        eliminarProducto(nombre);
      });
      
      li.appendChild(botonEliminar);
      listaProductos.appendChild(li);
      totalPrecio += producto.precio;
    });

// Mostrar el botón "Hacer pedido" si hay productos en la cesta
var hacerPedidoBtn = document.getElementById('hacerPedidoBtn');
if (!hacerPedidoBtn) {
  hacerPedidoBtn = document.createElement('button');
  hacerPedidoBtn.id = 'hacerPedidoBtn';
  hacerPedidoBtn.textContent = 'Hacer pedido';
  hacerPedidoBtn.addEventListener('click', function () {
    if (cesta.length === 0) {
      alert('No puedes hacer un pedido porque la cesta está vacía.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas hacer el pedido?')) {
      transferirCestaAMisPedidos();
      localStorage.removeItem('cesta');
      actualizarCesta(); // Actualizar la cesta después de hacer el pedido
      mostrarMisPedidos(); // Mostrar los pedidos

      // Recargar la página después de realizar el pedido
      window.location.reload();

      // Ocultar el botón "Hacer pedido" después de realizar el pedido
      hacerPedidoBtn.style.display = 'none';

      alert('¡Pedido realizado con éxito!');
    }
  });

  document.querySelector('.modal-content2').appendChild(hacerPedidoBtn);
} else {
  hacerPedidoBtn.style.display = 'block'; // Asegurar que el botón esté visible si hay productos en la cesta
}

// Verificar cesta después de cargar los productos
verificarCesta();
}

document.getElementById('totalPrecio').textContent = "Total: " + totalPrecio.toFixed(2) + '€';
}



// Función para generar un ID único
function generarIdUnico() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function transferirCestaAMisPedidos() {
  var cesta = JSON.parse(localStorage.getItem('cesta')) || [];
  var misPedidos = JSON.parse(localStorage.getItem('misPedidos')) || [];

  // Agrupar todos los productos de la cesta en un solo pedido
  var nuevoPedido = {
    id: generarIdUnico(),
    productos: cesta
  };

  // Agregar el pedido al historial de pedidos
  misPedidos.push(nuevoPedido);

  localStorage.setItem('misPedidos', JSON.stringify(misPedidos));
}

function mostrarMisPedidos() {
  var misPedidos = JSON.parse(localStorage.getItem('misPedidos')) || [];
  var misPedidosContent = document.getElementById('misPedidosContent');
  misPedidosContent.innerHTML = '';

  misPedidos.forEach((pedido, index) => {
    var pedidoDiv = document.createElement('div');
    pedidoDiv.classList.add('pedido');
    pedidoDiv.innerHTML = `<h3>Pedido ${pedido.id}</h3>`;
    var botonMostrarProductos = document.createElement('button');
    botonMostrarProductos.textContent = 'Mostrar Productos';
    botonMostrarProductos.addEventListener('click', function () {
      mostrarProductosDelPedido(pedido.productos);
    });
    pedidoDiv.appendChild(botonMostrarProductos);
    misPedidosContent.appendChild(pedidoDiv);
  });
}

function mostrarProductosDelPedido(productos) {
  // Muestra los productos del pedido
  var productosDelPedidoContent = document.getElementById('productosDelPedidoContent');
  productosDelPedidoContent.innerHTML = '';

  productos.forEach(producto => {
    var productoDiv = document.createElement('div');
    productoDiv.textContent = `${producto.nombre} - ${producto.precio}`;
    productosDelPedidoContent.appendChild(productoDiv);
  });
}

function eliminarProducto(nombre) {
  var cesta = JSON.parse(localStorage.getItem('cesta')) || [];
  // Buscar el índice del producto en la cesta
  var index = cesta.findIndex(producto => producto.nombre === nombre);
  if (index !== -1) {
    // Eliminar el producto del array utilizando el índice encontrado
    cesta.splice(index, 1);
    localStorage.setItem('cesta', JSON.stringify(cesta));
    actualizarCesta();

    window.location.reload();
  }
}
