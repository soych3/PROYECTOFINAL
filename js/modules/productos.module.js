// ===============================================
// MÓDULO DE PRODUCTOS - Carga y renderizado de productos
// ===============================================

import { agregarAlCarrito } from './carrito.module.js';

// URL del archivo JSON de productos
const PRODUCTOS_URL = './data/productos.json';

// Función asíncrona para cargar productos desde el JSON via fetch (HTTP)
export async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    const loading = document.getElementById('loading');

    try {
        // Consulta HTTP asíncrona al archivo productos.json
        const response = await fetch(PRODUCTOS_URL);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Parsear la respuesta JSON de forma asíncrona
        const productos = await response.json();
        
        loading.style.display = 'none';
        
        // Renderizado dinámico de productos desde el JSON
        productos.forEach(producto => {
            const card = crearCardProducto(producto);
            container.appendChild(card);
        });
        
        console.log(`✅ Se cargaron ${productos.length} productos desde ${PRODUCTOS_URL}`);
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        loading.innerHTML = '<p>Error al cargar productos. Por favor, intenta más tarde.</p>';
    }
}

// Crear tarjeta de producto dinámicamente
function crearCardProducto(producto) {
    const article = document.createElement('article');
    article.className = 'producto-card';
    article.setAttribute('role', 'listitem');
    
    article.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p class="producto-precio">$${producto.price.toFixed(2)}</p>
        <button class="btn-agregar" data-id="${producto.id}" data-titulo="${producto.title.replace(/"/g, '&quot;')}" data-precio="${producto.price}" data-imagen="${producto.image}" aria-label="Agregar ${producto.title} al carrito">
            Agregar al Carrito
        </button>
    `;
    
    // Event listener para agregar al carrito
    const btnAgregar = article.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', handleAgregarCarrito);
    
    return article;
}

// Handler para agregar producto al carrito
function handleAgregarCarrito(e) {
    const btn = e.target;
    const producto = {
        id: parseInt(btn.dataset.id),
        titulo: btn.dataset.titulo,
        precio: parseFloat(btn.dataset.precio),
        imagen: btn.dataset.imagen
    };
    
    agregarAlCarrito(producto);
    mostrarNotificacion();
}

// Mostrar notificación visual al agregar
function mostrarNotificacion() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        contador.classList.add('animate');
        setTimeout(() => contador.classList.remove('animate'), 300);
    }
}
