const API_URL = 'https://fakestoreapi.com/products';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarResenas();
    actualizarContadorCarrito();
    inicializarEventos();
});

async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    const loading = document.getElementById('loading');

    try {
        const response = await fetch(API_URL);
        const productos = await response.json();
        
        loading.style.display = 'none';
        
        productos.slice(0, 12).forEach(producto => {
            const card = crearCardProducto(producto);
            container.appendChild(card);
        });
    } catch (error) {
        loading.innerHTML = '<p>Error al cargar productos. Por favor, intenta más tarde.</p>';
    }
}

async function cargarResenas() {
    const container = document.getElementById('resenasContainer');

    try {
        const response = await fetch('resenas.json');
        const resenas = await response.json();
        
        resenas.forEach(resena => {
            const card = crearCardResena(resena);
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar reseñas.</p>';
    }
}

function crearCardResena(resena) {
    const article = document.createElement('article');
    article.className = 'resena-card';
    
    const estrellas = '⭐'.repeat(resena.rating);
    
    article.innerHTML = `
        <img src="${resena.avatar}" alt="Foto de perfil de ${resena.nombre}" class="resena-avatar">
        <h3>${resena.nombre}</h3>
        <p class="resena-rating">${estrellas}</p>
        <p>"${resena.comentario}"</p>
    `;
    
    return article;
}

function crearCardProducto(producto) {
    const article = document.createElement('article');
    article.className = 'producto-card';
    article.setAttribute('role', 'listitem');
    
    article.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p class="producto-precio">$${producto.price.toFixed(2)}</p>
        <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${producto.title.replace(/'/g, "\\'")}', ${producto.price}, '${producto.image}')" aria-label="Agregar ${producto.title} al carrito">
            Agregar al Carrito
        </button>
    `;
    
    return article;
}

function agregarAlCarrito(id, titulo, precio, imagen) {
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarMensaje('Producto agregado al carrito');
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
}

function mostrarMensaje(mensaje) {
    const badge = document.getElementById('contadorCarrito');
    badge.classList.add('animate');
    setTimeout(() => badge.classList.remove('animate'), 300);
}

function inicializarEventos() {
    document.getElementById('btnCarrito').addEventListener('click', mostrarCarrito);
    document.getElementById('btnFinalizarCompra').addEventListener('click', finalizarCompra);
    document.getElementById('formularioContacto').addEventListener('submit', validarFormulario);
}

function mostrarCarrito() {
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
    const carritoItems = document.getElementById('carritoItems');
    const carritoVacio = document.getElementById('carritoVacio');
    const carritoTotal = document.getElementById('carritoTotal');
    
    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
        carritoItems.innerHTML = '';
        carritoTotal.innerHTML = '';
    } else {
        carritoVacio.style.display = 'none';
        carritoItems.innerHTML = carrito.map(item => `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.titulo}">
                <div class="carrito-item-info">
                    <h4>${item.titulo}</h4>
                    <p>$${item.precio.toFixed(2)}</p>
                </div>
                <div class="carrito-item-controls">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Disminuir cantidad">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)" aria-label="Aumentar cantidad">+</button>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar producto">Eliminar</button>
                </div>
            </div>
        `).join('');
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        carritoTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    }
    
    modal.show();
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            guardarCarrito();
            mostrarCarrito();
            actualizarContadorCarrito();
        }
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    alert('¡Gracias por tu compra! Total: $' + carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toFixed(2));
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    bootstrap.Modal.getInstance(document.getElementById('modalCarrito')).hide();
}

function validarFormulario(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    
    let valido = true;
    
    if (nombre.value.trim() === '') {
        mostrarError('errorNombre', 'El nombre es obligatorio');
        valido = false;
    } else {
        limpiarError('errorNombre');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        mostrarError('errorEmail', 'Ingresa un correo electrónico válido');
        valido = false;
    } else {
        limpiarError('errorEmail');
    }
    
    if (mensaje.value.trim() === '') {
        mostrarError('errorMensaje', 'El mensaje es obligatorio');
        valido = false;
    } else {
        limpiarError('errorMensaje');
    }
    
    if (valido) {
        document.getElementById('successMessage').textContent = '¡Mensaje enviado correctamente!';
        setTimeout(() => {
            e.target.submit();
        }, 1000);
    }
}

function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
}

function limpiarError(id) {
    document.getElementById(id).textContent = '';
}
