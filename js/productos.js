const API_URL = 'https://fakestoreapi.com/products/category/men\'s%20clothing';
const API_URL_WOMEN = 'https://fakestoreapi.com/products/category/women\'s%20clothing';
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarResenas();
    actualizarContadorCarrito();
});

async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    const loading = document.getElementById('loading');

    try {
        // Obtener productos de ropa de hombre y mujer
        const [responseMen, responseWomen] = await Promise.all([
            fetch(API_URL),
            fetch(API_URL_WOMEN)
        ]);
        
        const productosMen = await responseMen.json();
        const productosWomen = await responseWomen.json();
        
        // Combinar ambas categorías
        const productos = [...productosMen, ...productosWomen];
        
        loading.style.display = 'none';
        
        productos.forEach(producto => {
            const productoTraducido = traducirProducto(producto);
            const card = crearCardProducto(productoTraducido);
            container.appendChild(card);
        });
    } catch (error) {
        loading.innerHTML = '<p>Error al cargar productos. Por favor, intenta más tarde.</p>';
    }
}

function traducirProducto(producto) {
    const traducciones = {
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Mochila Fjallraven Foldsack No. 1",
        "Mens Casual Premium Slim Fit T-Shirts": "Camiseta Premium Slim Fit para Hombre",
        "Mens Cotton Jacket": "Chaqueta de Algodón para Hombre",
        "Mens Casual Slim Fit": "Camisa Casual Slim Fit para Hombre",
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "Pulsera Dragón Oro y Plata - Colección Naga",
        "Solid Gold Petite Micropave": "Anillo de Oro Macizo con Micropavé",
        "White Gold Plated Princess": "Anillo Princesa en Oro Blanco",
        "Pierced Owl Rose Gold Plated Stainless Steel Double": "Aretes Dobles en Acero Oro Rosa",
        "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Disco Duro Externo WD 2TB USB 3.0",
        "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "SSD SanDisk PLUS 1TB SATA III",
        "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "SSD Silicon Power 256GB SATA III",
        "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Disco Gaming WD 4TB para PlayStation 4",
        "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Monitor Acer SB220Q 21.5\" Full HD IPS",
        "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED": "Monitor Gaming Samsung 49\" Curved 144Hz QLED",
        "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Chaqueta de Invierno 3 en 1 para Mujer",
        "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket": "Chaqueta Biker de Cuero Sintético para Mujer",
        "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Chaqueta Impermeable para Mujer con Rayas",
        "MBJ Women's Solid Short Sleeve Boat Neck V": "Blusa Manga Corta Cuello en V para Mujer",
        "Opna Women's Short Sleeve Moisture": "Camiseta Deportiva Manga Corta para Mujer",
        "DANVOUY Womens T Shirt Casual Cotton Short": "Camiseta Casual de Algodón para Mujer"
    };
    
    let tituloTraducido = producto.title;
    for (const [ingles, espanol] of Object.entries(traducciones)) {
        if (producto.title.includes(ingles)) {
            tituloTraducido = espanol;
            break;
        }
    }
    
    return {
        ...producto,
        title: tituloTraducido
    };
}

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
    
    const btnAgregar = article.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', agregarAlCarrito);
    
    return article;
}

function agregarAlCarrito(e) {
    const btn = e.target;
    const producto = {
        id: parseInt(btn.dataset.id),
        titulo: btn.dataset.titulo,
        precio: parseFloat(btn.dataset.precio),
        imagen: btn.dataset.imagen
    };
    
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarMensaje();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

function mostrarMensaje() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        contador.classList.add('animate');
        setTimeout(() => contador.classList.remove('animate'), 300);
    }
}

async function cargarResenas() {
    const container = document.getElementById('resenasContainer');
    if (!container) return;

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