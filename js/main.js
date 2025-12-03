// ===============================================
// MAIN.JS - Punto de entrada principal (Index)
// Importa módulos y ejecuta la inicialización
// ===============================================

import { cargarProductos } from './modules/productos.module.js';
import { cargarResenas } from './modules/resenas.module.js';
import { actualizarContadorCarrito } from './modules/carrito.module.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Función de inicialización
async function init() {
    console.log('🚀 Inicializando FashionStore...');
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Cargar productos desde JSON via fetch
    await cargarProductos();
    
    // Cargar reseñas desde JSON via fetch
    await cargarResenas();
    
    console.log('✅ FashionStore inicializado correctamente');
}
