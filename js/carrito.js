let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    mostrarCarrito();
    inicializarEventos();
});

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

function mostrarCarrito() {
    const carritoVacio = document.getElementById('carritoVacio');
    const carritoContenido = document.getElementById('carritoContenido');
    const carritoItems = document.getElementById('carritoItems');
    const carritoTotal = document.getElementById('carritoTotal');
    
    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
        carritoContenido.style.display = 'none';
    } else {
        carritoVacio.style.display = 'none';
        carritoContenido.style.display = 'block';
        
        carritoItems.innerHTML = '';
        carrito.forEach(item => {
            const itemDiv = crearItemCarrito(item);
            carritoItems.appendChild(itemDiv);
        });
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        carritoTotal.innerHTML = `
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p class="total-final"><strong>Total: $${total.toFixed(2)}</strong></p>
        `;
    }
}

function crearItemCarrito(item) {
    const div = document.createElement('div');
    div.className = 'carrito-item';
    
    div.innerHTML = `
        <img src="${item.imagen}" alt="${item.titulo}">
        <div class="carrito-item-info">
            <h4>${item.titulo}</h4>
            <p class="precio">$${item.precio.toFixed(2)}</p>
        </div>
        <div class="carrito-item-controls">
            <button class="btn-cantidad" data-id="${item.id}" data-accion="decrementar" aria-label="Disminuir cantidad">-</button>
            <span class="cantidad">${item.cantidad}</span>
            <button class="btn-cantidad" data-id="${item.id}" data-accion="incrementar" aria-label="Aumentar cantidad">+</button>
        </div>
        <div class="carrito-item-total">
            <p><strong>$${(item.precio * item.cantidad).toFixed(2)}</strong></p>
            <button class="btn-eliminar" data-id="${item.id}" aria-label="Eliminar producto">🗑️</button>
        </div>
    `;
    
    return div;
}

function inicializarEventos() {
    const carritoItems = document.getElementById('carritoItems');
    const btnVaciar = document.getElementById('btnVaciarCarrito');
    const btnFinalizar = document.getElementById('btnFinalizarCompra');
    
    carritoItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cantidad')) {
            const id = parseInt(e.target.dataset.id);
            const accion = e.target.dataset.accion;
            cambiarCantidad(id, accion);
        } else if (e.target.classList.contains('btn-eliminar')) {
            const id = parseInt(e.target.dataset.id);
            eliminarDelCarrito(id);
        }
    });
    
    btnVaciar.addEventListener('click', vaciarCarrito);
    btnFinalizar.addEventListener('click', finalizarCompra);
}

function cambiarCantidad(id, accion) {
    const item = carrito.find(item => item.id === id);
    
    if (item) {
        if (accion === 'incrementar') {
            item.cantidad++;
        } else if (accion === 'decrementar') {
            item.cantidad--;
            if (item.cantidad <= 0) {
                eliminarDelCarrito(id);
                return;
            }
        }
        
        guardarCarrito();
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    alert(`¡Gracias por tu compra!\nTotal: $${total.toFixed(2)}\n\nTu pedido ha sido procesado correctamente.`);
    
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}