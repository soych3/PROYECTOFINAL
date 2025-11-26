let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    inicializarFormulario();
});

function actualizarContadorCarrito() {
    const contador = document.getElementById('contadorCarrito');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

function inicializarFormulario() {
    const formulario = document.getElementById('formularioContacto');
    formulario.addEventListener('submit', validarFormulario);
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