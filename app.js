async function cargarOfertas() {
    try {
        const respuesta = await fetch('ofertas.json');
        const productos = await respuesta.json();
        const contenedor = document.getElementById('contenedor-ofertas');
        
        let htmlContenido = '';
        
        productos.forEach(producto => {
            htmlContenido += `
                <div class="tarjeta-producto">
                    <img src="${producto.imagen}" alt="${producto.titulo}">
                    <h3>${producto.titulo}</h3>
                    <p>${producto.descripcion}</p>
                    <span class="precio"><strong>${producto.precio}</strong></span>
                    <a href="${producto.enlace}" target="_blank" rel="noopener noreferrer" class="btn-comprar">Ver Oferta</a>
                </div>
            `;
        });
        
        contenedor.innerHTML = htmlContenido;
        
    } catch (error) {
        console.error('Error al cargar el catálogo:', error);
        document.getElementById('contenedor-ofertas').innerHTML = 
            '<p style="text-align:center; color:red; grid-column: 1/-1;">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
    }
}

// Ejecutar la función cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarOfertas);
