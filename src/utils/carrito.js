/* CARRITO */
// Variable para llevar el conteo de la cantidad de productos en el carrito
let cantidadCarrito = 0;

// Obtener el enlace del carrito y el contador
const carritoEnlace = document.querySelector('.button-inherit');
const contadorCarrito = document.getElementById('cartCount');

// Función para agregar un producto al carrito
export function agregarAlCarrito() {
    // Incrementar la cantidad del carrito
    cantidadCarrito++;

    // Si la cantidad es mayor que 0, mostramos el contador
    if (cantidadCarrito > 0) {
        contadorCarrito.style.display = 'block';  // Muestra el contador
    }

    // Actualizar el número del contador con la cantidad de productos
    contadorCarrito.textContent = cantidadCarrito;
}

// Asignar el evento de clic al botón de "Agregar al carrito"
const botonAgregarCarrito = document.getElementById('agregarCarrito');
botonAgregarCarrito.addEventListener('click', agregarAlCarrito);

