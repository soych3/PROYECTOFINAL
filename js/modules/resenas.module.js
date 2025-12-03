// ===============================================
// MÓDULO DE RESEÑAS - Carga y renderizado de reseñas
// ===============================================

// URL del archivo JSON de reseñas
const RESENAS_URL = './data/resenas.json';

// Función asíncrona para cargar reseñas desde el JSON via fetch (HTTP)
export async function cargarResenas() {
    const container = document.getElementById('resenasContainer');
    if (!container) return;

    try {
        // Consulta HTTP asíncrona al archivo resenas.json
        const response = await fetch(RESENAS_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const resenas = await response.json();
        
        // Renderizado dinámico de reseñas desde el JSON
        resenas.forEach(resena => {
            const card = crearCardResena(resena);
            container.appendChild(card);
        });
        
        console.log(`✅ Se cargaron ${resenas.length} reseñas desde ${RESENAS_URL}`);
        
    } catch (error) {
        console.error('Error al cargar reseñas:', error);
        container.innerHTML = '<p>Error al cargar reseñas.</p>';
    }
}

// Crear tarjeta de reseña dinámicamente
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
