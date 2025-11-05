// ========== DATOS DE EJEMPLO PRE-CARGADOS ==========

// Servicios ofrecidos de ejemplo
const serviciosIniciales = [
    {
        categoria: "Limpieza",
        descripcion: "Limpieza profunda de casas y apartamentos. Incluye baños, cocina y habitaciones.",
        precio: "80000",
        nombre: "María González",
        telefono: "3201234567"
    },
    {
        categoria: "Plomería",
        descripcion: "Reparación de fugas, instalación de lavamanos y mantenimiento de tuberías.",
        precio: "120000",
        nombre: "Carlos Ramírez",
        telefono: "3157654321"
    },
    {
        categoria: "Electricidad",
        descripcion: "Instalación de lámparas, arreglo de tomas corrientes y revisión de tableros eléctricos.",
        precio: "100000",
        nombre: "José Martínez",
        telefono: "3009876543"
    },
    {
        categoria: "Jardinería",
        descripcion: "Poda de árboles, mantenimiento de jardines y siembra de plantas ornamentales.",
        precio: "60000",
        nombre: "Ana Rodríguez",
        telefono: "3189012345"
    },
    {
        categoria: "Cuidado",
        descripcion: "Cuidado de adultos mayores con experiencia. Horarios flexibles.",
        precio: "150000",
        nombre: "Lucía Fernández",
        telefono: "3112223344"
    },
    {
        categoria: "Transporte",
        descripcion: "Servicio de transporte particular en moto para mandados y diligencias.",
        precio: "30000",
        nombre: "Pedro López",
        telefono: "3205556677"
    }
];

// Solicitudes de ejemplo
const solicitudesIniciales = [
    {
        categoria: "Plomería",
        descripcion: "Necesito reparar una tubería que está goteando en el baño urgentemente.",
        urgencia: "Alta",
        nombre: "Sandra Pérez",
        telefono: "3101112233"
    },
    {
        categoria: "Limpieza",
        descripcion: "Requiero limpieza general de un apartamento de 2 habitaciones para fin de mes.",
        urgencia: "Media",
        nombre: "Roberto Silva",
        telefono: "3167778899"
    },
    {
        categoria: "Electricidad",
        descripcion: "Instalar 3 ventiladores de techo en mi casa.",
        urgencia: "Baja",
        nombre: "Diana Torres",
        telefono: "3124445566"
    },
    {
        categoria: "Cuidado",
        descripcion: "Busco persona para cuidar a mi madre durante las tardes entre semana.",
        urgencia: "Alta",
        nombre: "Miguel Ángel Castro",
        telefono: "3198889900"
    },
    {
        categoria: "Jardinería",
        descripcion: "Necesito que poden el césped y arreglen las plantas de mi jardín pequeño.",
        urgencia: "Baja",
        nombre: "Gloria Mendoza",
        telefono: "3002221144"
    },
    {
        categoria: "Asesorías",
        descripcion: "Requiero asesoría para crear un pequeño negocio desde casa.",
        urgencia: "Media",
        nombre: "Andrés Vargas",
        telefono: "3133334455"
    }
];

// ========== INICIALIZACIÓN ==========

// Cargar datos iniciales en LocalStorage si no existen
if (!localStorage.getItem('serviciosOfrecidos')) {
    localStorage.setItem('serviciosOfrecidos', JSON.stringify(serviciosIniciales));
}

if (!localStorage.getItem('solicitudesServicios')) {
    localStorage.setItem('solicitudesServicios', JSON.stringify(solicitudesIniciales));
}

// Verificar si hay sesión activa
window.onload = function() {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        const usuario = JSON.parse(usuarioActual);
        mostrarMenu(usuario.nombre);
    }
};

// ========== FUNCIONES DE NAVEGACIÓN ==========

function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.getElementById('seccion-login').classList.add('hidden');
    document.getElementById('seccion-menu').classList.add('hidden');
    document.getElementById('seccion-buscar-servicios').classList.add('hidden');
    document.getElementById('seccion-ver-solicitudes').classList.add('hidden');
    document.getElementById('seccion-ofrecer-servicio').classList.add('hidden');
    document.getElementById('seccion-solicitar-servicio').classList.add('hidden');

    // Mostrar la sección seleccionada
    if (seccion === 'menu') {
        document.getElementById('seccion-menu').classList.remove('hidden');
    } else if (seccion === 'buscar-servicios') {
        document.getElementById('seccion-buscar-servicios').classList.remove('hidden');
        cargarServiciosOfrecidos();
    } else if (seccion === 'ver-solicitudes') {
        document.getElementById('seccion-ver-solicitudes').classList.remove('hidden');
        cargarSolicitudes();
    } else if (seccion === 'ofrecer-servicio') {
        document.getElementById('seccion-ofrecer-servicio').classList.remove('hidden');
        document.getElementById('mensaje-ofrecer').classList.add('hidden');
    } else if (seccion === 'solicitar-servicio') {
        document.getElementById('seccion-solicitar-servicio').classList.remove('hidden');
        document.getElementById('mensaje-solicitar').classList.add('hidden');
    }
}

// ========== LOGIN ==========

document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('input-nombre').value;
    const telefono = document.getElementById('input-telefono').value;
    
    // Guardar usuario en LocalStorage
    const usuario = { nombre, telefono };
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    
    // Mostrar menú principal
    mostrarMenu(nombre);
});

function mostrarMenu(nombre) {
    document.getElementById('texto-bienvenida').textContent = `Bienvenido, ${nombre}`;
    mostrarSeccion('menu');
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    document.getElementById('form-login').reset();
    mostrarSeccion('login');
    document.getElementById('seccion-login').classList.remove('hidden');
}

// ========== BUSCAR SERVICIOS OFRECIDOS ==========

function cargarServiciosOfrecidos() {
    const servicios = JSON.parse(localStorage.getItem('serviciosOfrecidos')) || [];
    const contenedor = document.getElementById('lista-servicios-ofrecidos');
    
    if (servicios.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay servicios disponibles en este momento.</p>';
        return;
    }
    
    let html = '';
    servicios.forEach((servicio, index) => {
        html += `
            <div class="servicio-card">
                <h4 style="color: var(--color-azul); margin-bottom: 10px;">${servicio.categoria}</h4>
                <p style="margin-bottom: 10px;">${servicio.descripcion}</p>
                <p style="font-size: 20px; color: var(--color-verde); font-weight: bold; margin-bottom: 10px;">
                    Precio: $${parseInt(servicio.precio).toLocaleString('es-CO')} COP
                </p>
                <div class="contacto-info">
                    <strong>👤 Contacto:</strong> ${servicio.nombre}<br>
                    <strong>📱 Teléfono:</strong> ${servicio.telefono}
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

function filtrarServiciosOfrecidos() {
    const filtro = document.getElementById('filtro-categoria-ofrecidos').value;
    const servicios = JSON.parse(localStorage.getItem('serviciosOfrecidos')) || [];
    const contenedor = document.getElementById('lista-servicios-ofrecidos');
    
    let serviciosFiltrados = servicios;
    if (filtro !== 'Todas') {
        serviciosFiltrados = servicios.filter(s => s.categoria === filtro);
    }
    
    if (serviciosFiltrados.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay servicios en esta categoría.</p>';
        return;
    }
    
    let html = '';
    serviciosFiltrados.forEach(servicio => {
        html += `
            <div class="servicio-card">
                <h4 style="color: var(--color-azul); margin-bottom: 10px;">${servicio.categoria}</h4>
                <p style="margin-bottom: 10px;">${servicio.descripcion}</p>
                <p style="font-size: 20px; color: var(--color-verde); font-weight: bold; margin-bottom: 10px;">
                    Precio: $${parseInt(servicio.precio).toLocaleString('es-CO')} COP
                </p>
                <div class="contacto-info">
                    <strong>👤 Contacto:</strong> ${servicio.nombre}<br>
                    <strong>📱 Teléfono:</strong> ${servicio.telefono}
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

// ========== VER SOLICITUDES ==========

function cargarSolicitudes() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesServicios')) || [];
    const contenedor = document.getElementById('lista-solicitudes');
    
    if (solicitudes.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay solicitudes en este momento.</p>';
        return;
    }
    
    let html = '';
    solicitudes.forEach(solicitud => {
        const claseUrgencia = `urgencia-${solicitud.urgencia.toLowerCase()}`;
        const badgeUrgencia = `badge-${solicitud.urgencia.toLowerCase()}`;
        
        html += `
            <div class="solicitud-card ${claseUrgencia}">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <h4 style="color: var(--color-verde); margin: 0;">${solicitud.categoria}</h4>
                    <span class="badge ${badgeUrgencia} badge-urgencia">${solicitud.urgencia}</span>
                </div>
                <p style="margin-bottom: 10px;">${solicitud.descripcion}</p>
                <div class="contacto-info">
                    <strong>👤 Contacto:</strong> ${solicitud.nombre}<br>
                    <strong>📱 Teléfono:</strong> ${solicitud.telefono}
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

function filtrarSolicitudes() {
    const filtro = document.getElementById('filtro-urgencia').value;
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesServicios')) || [];
    const contenedor = document.getElementById('lista-solicitudes');
    
    let solicitudesFiltradas = solicitudes;
    if (filtro !== 'Todas') {
        solicitudesFiltradas = solicitudes.filter(s => s.urgencia === filtro);
    }
    
    if (solicitudesFiltradas.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay solicitudes con esta urgencia.</p>';
        return;
    }
    
    let html = '';
    solicitudesFiltradas.forEach(solicitud => {
        const claseUrgencia = `urgencia-${solicitud.urgencia.toLowerCase()}`;
        const badgeUrgencia = `badge-${solicitud.urgencia.toLowerCase()}`;
        
        html += `
            <div class="solicitud-card ${claseUrgencia}">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <h4 style="color: var(--color-verde); margin: 0;">${solicitud.categoria}</h4>
                    <span class="badge ${badgeUrgencia} badge-urgencia">${solicitud.urgencia}</span>
                </div>
                <p style="margin-bottom: 10px;">${solicitud.descripcion}</p>
                <div class="contacto-info">
                    <strong>👤 Contacto:</strong> ${solicitud.nombre}<br>
                    <strong>📱 Teléfono:</strong> ${solicitud.telefono}
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

// ========== OFRECER SERVICIO ==========

document.getElementById('form-ofrecer').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const categoria = document.getElementById('select-categoria-ofrecer').value;
    const descripcion = document.getElementById('textarea-descripcion-ofrecer').value;
    const precio = document.getElementById('input-precio').value;
    
    const nuevoServicio = {
        categoria,
        descripcion,
        precio,
        nombre: usuario.nombre,
        telefono: usuario.telefono
    };
    
    // Agregar a LocalStorage
    const servicios = JSON.parse(localStorage.getItem('serviciosOfrecidos')) || [];
    servicios.push(nuevoServicio);
    localStorage.setItem('serviciosOfrecidos', JSON.stringify(servicios));
    
    // Mostrar mensaje de éxito
    const mensajeDiv = document.getElementById('mensaje-ofrecer');
    mensajeDiv.className = 'mensaje-exito';
    mensajeDiv.textContent = '✅ ¡Tu servicio ha sido publicado exitosamente!';
    mensajeDiv.classList.remove('hidden');
    
    // Limpiar formulario
    document.getElementById('form-ofrecer').reset();
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.classList.add('hidden');
    }, 3000);
});

// ========== SOLICITAR SERVICIO ==========

document.getElementById('form-solicitar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const categoria = document.getElementById('select-categoria-solicitar').value;
    const descripcion = document.getElementById('textarea-descripcion-solicitar').value;
    const urgencia = document.getElementById('select-urgencia').value;
    
    const nuevaSolicitud = {
        categoria,
        descripcion,
        urgencia,
        nombre: usuario.nombre,
        telefono: usuario.telefono
    };
    
    // Agregar a LocalStorage
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesServicios')) || [];
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem('solicitudesServicios', JSON.stringify(solicitudes));
    
    // Mostrar mensaje de éxito
    const mensajeDiv = document.getElementById('mensaje-solicitar');
    mensajeDiv.className = 'mensaje-exito';
    mensajeDiv.textContent = '✅ ¡Tu solicitud ha sido enviada exitosamente!';
    mensajeDiv.classList.remove('hidden');
    
    // Limpiar formulario
    document.getElementById('form-solicitar').reset();
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.classList.add('hidden');
    }, 3000);
});
