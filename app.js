async function generarCatalogo() {
    try {
        const respuesta = await fetch('ofertas.json');
        const productos = await respuesta.json();
        
        // Seleccionamos los contenedores específicos definidos en el HTML
        const contenedorTerminales = document.getElementById('contenedor-terminales');
        const contenedorSolicitudes = document.getElementById('contenedor-solicitudes');
        
        // Variables para almacenar las plantillas HTML que se autogenerarán
        let htmlTerminales = '';
        let htmlSolicitudes = '';
        
        // Bucle generador
        productos.forEach(producto => {
            
            // Evaluamos el tipo de oferta para aplicar los estilos y textos correspondientes
            if (producto.tipo === 'terminal') {
                htmlTerminales += `
                    <div class="tarjeta-producto">
                        <div class="img-container">
                            <img src="${producto.imagen}" alt="${producto.titulo}">
                        </div>
                        <h3>${producto.titulo}</h3>
                        <p>${producto.descripcion}</p>
                        <div class="precio-block">
                            ${producto.precio} <span>MXN</span>
                        </div>
                        <a href="${producto.enlace}" target="_blank" rel="noopener noreferrer" class="btn-action btn-terminal">Adquirir con Descuento</a>
                    </div>
                `;
            } else if (producto.tipo === 'solicitud') {
                htmlSolicitudes += `
                    <div class="tarjeta-producto">
                        <div class="img-container">
                            <img src="${producto.imagen}" alt="${producto.titulo}">
                        </div>
                        <h3>${producto.titulo}</h3>
                        <p>${producto.descripcion}</p>
                        <div class="precio-block">
                            ${producto.precio}
                        </div>
                        <a href="${producto.enlace}" target="_blank" rel="noopener noreferrer" class="btn-action btn-solicitud">Iniciar Solicitud</a>
                    </div>
                `;
            }
        });
        
        // Inyección automática en el DOM
        contenedorTerminales.innerHTML = htmlTerminales || '<p class="text-muted">No hay terminales disponibles en este momento.</p>';
        contenedorSolicitudes.innerHTML = htmlSolicitudes || '<p class="text-muted">No hay servicios para solicitar en este momento.</p>';
        
    } catch (error) {
        console.error('Error crítico al procesar el generador:', error);
        const errorMsg = '<p style="color:red; text-align:center; width:100%;">Error al conectar con la base de datos de ofertas.</p>';
        document.getElementById('contenedor-terminales').innerHTML = errorMsg;
        document.getElementById('contenedor-solicitudes').innerHTML = errorMsg;
    }
}

// Inicializar el motor cuando la página web cargue por completo
document.addEventListener('DOMContentLoaded', generarCatalogo);
