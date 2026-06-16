async function compilarSistema() {
    try {
        const respuesta = await fetch('ofertas.json');
        const hardware = await respuesta.json();
        
        const grid = document.getElementById('tech-grid');
        let htmlCompilado = '';
        
        hardware.forEach(item => {
            htmlCompilado += `
                <div class="tech-card">
                    <div class="img-wrapper">
                        <img src="${item.imagen}" alt="${item.titulo}">
                    </div>
                    <h3>${item.titulo}</h3>
                    <p>${item.descripcion}</p>
                    
                    <div class="tech-price">
                        ${item.precio} <span style="font-size: 0.8rem; margin-left:5px; color: #8b9bb4;">MXN</span>
                    </div>
                    
                    <a href="${item.enlace}" target="_blank" rel="noopener noreferrer" class="btn-neon">
                        Ir al producto
                    </a>
                </div>
            `;
        });
        
        grid.innerHTML = htmlCompilado;
        
    } catch (error) {
        console.error('System Failure:', error);
        document.getElementById('tech-grid').innerHTML = `
            <div style="color: #ff003c; font-family: monospace; text-align: center; grid-column: 1/-1;">
                [ERROR_CRÍTICO]: No se pudo establecer conexión con la base de datos de hardware.
            </div>
        `;
    }
}

// Iniciar el renderizado al cargar el DOM
document.addEventListener('DOMContentLoaded', compilarSistema);
