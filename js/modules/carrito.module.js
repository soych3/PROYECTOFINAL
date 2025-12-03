// ===============================================
// MÓDULO DE CARRITO - Gestión del carrito de compras
// ===============================================

// Estado del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Obtener carrito actual
export function obtenerCarrito() {
    return carrito;
}

// Guardar carrito en localStorage
export function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
export function agregarAlCarrito(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
}

// Cambiar cantidad de un producto
export function cambiarCantidad(id, accion) {
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
    }
}

// Eliminar producto del carrito
export function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContadorCarrito();
}

// Vaciar carrito completo
export function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
}

// Calcular total del carrito
export function calcularTotal() {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

// Actualizar contador del carrito en el navbar
export function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

// Finalizar compra
export function finalizarCompra() {
    if (carrito.length === 0) {
        return { success: false, message: 'Tu carrito está vacío' };
    }
    
    const total = calcularTotal();
    vaciarCarrito();
    
    return { 
        success: true, 
        message: `¡Gracias por tu compra!\nTotal: $${total.toFixed(2)}\n\nTu pedido ha sido procesado correctamente.`
    };
}
