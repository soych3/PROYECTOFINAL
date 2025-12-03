// ===============================================
// CARRITO.PAGE.JS - Página del carrito de compras
// ===============================================

import { 
    obtenerCarrito, 
    cambiarCantidad, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    calcularTotal,
    actualizarContadorCarrito,
    finalizarCompra 
} from './modules/carrito.module.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initCarrito();
});

// Función de inicialización del carrito
function initCarrito() {
    actualizarContadorCarrito();
    mostrarCarrito();
    inicializarEventos();
}

// Mostrar productos en el carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
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
        
        const total = calcularTotal();
        carritoTotal.innerHTML = `
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p class="total-final"><strong>Total: $${total.toFixed(2)}</strong></p>
        `;
    }
}

// Crear elemento de item del carrito
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

// Inicializar eventos del carrito
function inicializarEventos() {
    const carritoItems = document.getElementById('carritoItems');
    const btnVaciar = document.getElementById('btnVaciarCarrito');
    const btnFinalizar = document.getElementById('btnFinalizarCompra');
    
    // Delegación de eventos para botones dinámicos
    carritoItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cantidad')) {
            const id = parseInt(e.target.dataset.id);
            const accion = e.target.dataset.accion;
            cambiarCantidad(id, accion);
            mostrarCarrito();
        } else if (e.target.classList.contains('btn-eliminar')) {
            const id = parseInt(e.target.dataset.id);
            eliminarDelCarrito(id);
            mostrarCarrito();
        }
    });
    
    // Botón vaciar carrito
    btnVaciar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            vaciarCarrito();
            mostrarCarrito();
        }
    });
    
    // Botón finalizar compra
    btnFinalizar.addEventListener('click', () => {
        const resultado = finalizarCompra();
        alert(resultado.message);
        if (resultado.success) {
            mostrarCarrito();
        }
    });
}
