# FashionStore - Proyecto Final

Tienda online de moda con arquitectura modular y buenas prácticas de desarrollo.

## 📁 Estructura del Proyecto

```
PRE PROYECTO/
├── index.html                    # Página principal (único HTML en raíz)
├── css/
│   └── styles.css               # Estilos globales
├── js/
│   ├── main.js                  # Punto de entrada - Index
│   ├── carrito.page.js          # Lógica página carrito
│   ├── contacto.page.js         # Lógica página contacto
│   └── modules/
│       ├── carrito.module.js    # Módulo de gestión del carrito
│       ├── productos.module.js  # Módulo de carga de productos
│       └── resenas.module.js    # Módulo de carga de reseñas
├── pages/
│   ├── carrito.html             # Página del carrito
│   └── contacto.html            # Página de contacto
├── data/
│   ├── productos.json           # Base de datos de productos
│   └── resenas.json             # Base de datos de reseñas
├── img/                         # Carpeta de imágenes
└── README.md                    # Documentación
```

## ✅ Características Implementadas

### Arquitectura Modular
- **Separación de responsabilidades**: Cada módulo tiene una función específica
- **Import/Export ES6**: Módulos JavaScript con sintaxis moderna
- **Sin código inline**: Todo el JS está en archivos externos

### Funcionalidades
- ✅ Consulta de productos via **fetch HTTP** al archivo `productos.json`
- ✅ Renderizado dinámico de productos en tarjetas (cards)
- ✅ Carrito de compras con **localStorage**
- ✅ Contador dinámico actualizado en tiempo real
- ✅ Edición de cantidades y eliminación de productos
- ✅ Total dinámico calculado automáticamente
- ✅ Formulario de contacto con validación
- ✅ Diseño responsive con Flexbox y Grid

### Tecnologías
- HTML5 semántico
- CSS3 con variables y Flexbox/Grid
- JavaScript ES6+ con módulos
- Bootstrap 5
- localStorage API
- Fetch API

## 🚀 Uso

1. Abrir `index.html` en un servidor local (Live Server recomendado)
2. Los módulos ES6 requieren un servidor HTTP para funcionar

## 📝 Notas

- El proyecto utiliza módulos ES6 (`type="module"`)
- Es necesario ejecutar desde un servidor HTTP (no file://)
- Compatible con navegadores modernos
