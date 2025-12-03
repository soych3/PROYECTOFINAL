// ===============================================
// CONTACTO.PAGE.JS - Página de contacto
// Validación de formulario
// ===============================================

import { actualizarContadorCarrito } from './modules/carrito.module.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initContacto();
});

// Función de inicialización
function initContacto() {
    actualizarContadorCarrito();
    inicializarFormulario();
}

// Inicializar validación del formulario
function inicializarFormulario() {
    const formulario = document.getElementById('formularioContacto');
    
    if (formulario) {
        formulario.addEventListener('submit', handleSubmit);
    }
}

// Handler del submit del formulario
function handleSubmit(e) {
    e.preventDefault();
    
    // Limpiar errores previos
    limpiarErrores();
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar campos
    let esValido = true;
    
    if (!validarNombre(nombre)) {
        mostrarError('errorNombre', 'El nombre debe tener al menos 2 caracteres');
        esValido = false;
    }
    
    if (!validarEmail(email)) {
        mostrarError('errorEmail', 'Ingresa un correo electrónico válido');
        esValido = false;
    }
    
    if (!validarMensaje(mensaje)) {
        mostrarError('errorMensaje', 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    }
    
    // Si es válido, enviar formulario
    if (esValido) {
        // Aquí se enviaría a Formspree
        mostrarExito();
    }
}

// Validaciones
function validarNombre(nombre) {
    return nombre.length >= 2;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarMensaje(mensaje) {
    return mensaje.length >= 10;
}

// Mostrar error en campo
function mostrarError(idError, mensaje) {
    const errorElement = document.getElementById(idError);
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
}

// Limpiar todos los errores
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

// Mostrar mensaje de éxito
function mostrarExito() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = '¡Mensaje enviado correctamente! Te responderemos pronto.';
        successMessage.style.display = 'block';
        
        // Limpiar formulario
        document.getElementById('formularioContacto').reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}
