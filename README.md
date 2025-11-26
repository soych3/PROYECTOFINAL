# FashionStore - E-Commerce de Ropa

Proyecto de tienda en línea de moda con 3 páginas independientes que consume API REST para productos de ropa y gestiona un carrito de compras persistente mediante localStorage.

## Estructura del Proyecto

```
PRE PROYECTO/
├── index.html              # Página principal con productos de ropa y reseñas
├── contacto.html           # Página de contacto con formulario
├── carrito.html            # Página del carrito de compras
├── styles.css              # Hoja de estilos global
├── resenas.json            # Base de datos local de reseñas
├── js/
│   ├── productos.js        # Lógica de productos de ropa desde API
│   ├── contacto.js         # Validación de formulario
│   └── carrito.js          # Gestión del carrito
└── README.md               # Documentación
```

## Características
- **3 páginas independientes**: Index, Contacto y Carrito
- **Diseño responsivo**: Bootstrap, Flexbox y Grid
- **API REST**: Consumo de FakeStore API para productos de ropa (men's & women's clothing)
- **JSON local**: Reseñas cargadas dinámicamente
- **Carrito persistente**: localStorage mantiene el carrito entre sesiones
- **Formulario funcional**: Validación completa con Formspree
- **SEO y Accesibilidad**: Optimizado WCAG 2.2

## Tecnologías
- HTML5 semántico
- CSS3 con Bootstrap 5
- JavaScript ES6+ vanilla
- FakeStore API
- LocalStorage

## Uso
1. Abrir `index.html` en el navegador
2. Navegar entre páginas usando el menú
3. Agregar productos al carrito
4. Ver y gestionar el carrito en `carrito.html`
5. Enviar consultas desde `contacto.html`
