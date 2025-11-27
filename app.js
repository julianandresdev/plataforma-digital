// Estado global (in-memory storage)
let usuarioActual = null;
let historyStack = [];
let usuarios = [];
let servicios = [];
let solicitudes = [];
let mensajes = [];

// Datos iniciales pre-cargados
const serviciosIniciales = [
    {
        id: 's1',
        categoria: 'Limpieza',
        descripcion: 'Limpieza profunda de casas y apartamentos',
        precio: '80000',
        nombre: 'María González',
        telefono: '3201234567',
        avatar: 'https://i.pravatar.cc/150?img=47',
        rating: 4.8,
        inmutable: true
    },
    {
        id: 's2',
        categoria: 'Plomería',
        descripcion: 'Reparación de fugas y mantenimiento',
        precio: '120000',
        nombre: 'Carlos Ramírez',
        telefono: '3157654321',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 4.5,
        inmutable: true
    },
    {
        id: 's3',
        categoria: 'Electricidad',
        descripcion: 'Instalación y reparación eléctrica',
        precio: '100000',
        nombre: 'José Martínez',
        telefono: '3009876543',
        avatar: 'https://i.pravatar.cc/150?img=33',
        rating: 5.0,
        inmutable: true
    },
    {
        id: 's4',
        categoria: 'Jardinería',
        descripcion: 'Poda y mantenimiento de jardines',
        precio: '60000',
        nombre: 'Ana Rodríguez',
        telefono: '3189012345',
        avatar: 'https://i.pravatar.cc/150?img=45',
        rating: 4.9,
        inmutable: true
    },
    {
        id: 's5',
        categoria: 'Cuidado',
        descripcion: 'Cuidado de adultos mayores',
        precio: '150000',
        nombre: 'Lucía Fernández',
        telefono: '3112223344',
        avatar: 'https://i.pravatar.cc/150?img=48',
        rating: 5.0,
        inmutable: true
    },
    {
        id: 's6',
        categoria: 'Transporte',
        descripcion: 'Transporte particular en moto',
        precio: '30000',
        nombre: 'Pedro López',
        telefono: '3205556677',
        avatar: 'https://i.pravatar.cc/150?img=15',
        rating: 4.3,
        inmutable: true
    }
];

const solicitudesIniciales = [
    {
        id: 'r1',
        categoria: 'Plomería',
        descripcion: 'Tubería goteando urgente en baño',
        urgencia: 'Alta',
        nombre: 'Sandra Pérez',
        telefono: '3101112233',
        inmutable: true
    },
    {
        id: 'r2',
        categoria: 'Limpieza',
        descripcion: 'Limpiar apartamento 2 habitaciones',
        urgencia: 'Media',
        nombre: 'Roberto Silva',
        telefono: '3167778899',
        inmutable: true
    },
    {
        id: 'r3',
        categoria: 'Electricidad',
        descripcion: 'Instalar 3 ventiladores techo',
        urgencia: 'Baja',
        nombre: 'Diana Torres',
        telefono: '3124445566',
        inmutable: true
    },
    {
        id: 'r4',
        categoria: 'Cuidado',
        descripcion: 'Cuidar madre tardes entre semana',
        urgencia: 'Alta',
        nombre: 'Miguel Ángel Castro',
        telefono: '3198889900',
        inmutable: true
    },
    {
        id: 'r5',
        categoria: 'Jardinería',
        descripcion: 'Podar césped y arreglar plantas',
        urgencia: 'Baja',
        nombre: 'Gloria Mendoza',
        telefono: '3002221144',
        inmutable: true
    },
    {
        id: 'r6',
        categoria: 'Asesorías',
        descripcion: 'Asesoría para negocio desde casa',
        urgencia: 'Media',
        nombre: 'Andrés Vargas',
        telefono: '3133334455',
        inmutable: true
    }
];

// Inicializar datos al cargar
function initializeData() {
    if (servicios.length === 0) {
        servicios = [...serviciosIniciales];
    }
    if (solicitudes.length === 0) {
        solicitudes = [...solicitudesIniciales];
    }
}

// Navegación entre rutas
function navigate(route) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
    
    // Agregar ruta actual al historial
    const currentRoute = getCurrentRoute();
    if (currentRoute && currentRoute !== route) {
        historyStack.push(currentRoute);
    }
    
    // Mostrar pantalla correspondiente
    const screen = document.getElementById(route);
    if (screen) {
        screen.classList.remove('hidden');
        
        // Mostrar botones fijos solo si hay sesión iniciada
        const fixedButtons = document.getElementById('fixedButtons');
        if (route !== 'login' && route !== 'register' && route !== 'admin-login') {
            fixedButtons.style.display = 'flex';
        } else {
            fixedButtons.style.display = 'none';
        }
        
        // Cargar contenido específico de cada pantalla
        loadRouteContent(route);
    }
}

function getCurrentRoute() {
    const screens = document.querySelectorAll('.container');
    for (let screen of screens) {
        if (!screen.classList.contains('hidden')) {
            return screen.id;
        }
    }
    return null;
}

function goBack() {
    if (historyStack.length > 0) {
        const previousRoute = historyStack.pop();
        // Limpiar el array para evitar loops
        const tempStack = [...historyStack];
        historyStack = [];
        navigate(previousRoute);
        historyStack = tempStack;
    } else {
        navigate('home');
    }
}

function loadRouteContent(route) {
    switch(route) {
        case 'home':
            loadHome();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'edit-profile':
            loadEditProfile();
            break;
        case 'services':
            loadServices();
            break;
        case 'my-services':
            loadMyServices();
            break;
        case 'requests':
            loadRequests();
            break;
        case 'messages':
            loadMessagesScreen();
            break;
        case 'admin':
            loadAdminPanel();
            break;
    }
}

// Login
function handleLogin(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('login-nombre').value.trim();
    const telefono = document.getElementById('login-telefono').value.trim();
    
    const usuario = usuarios.find(u => u.nombre === nombre && u.telefono === telefono);
    
    if (usuario) {
        usuarioActual = usuario;
        navigate('home');
    } else {
        alert('Usuario no encontrado. Por favor regístrate primero.');
    }
}

// Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    
    if (password === 'admin123') {
        usuarioActual = { nombre: 'Administrador', tipo: 'admin' };
        navigate('admin');
    } else {
        alert('Contraseña incorrecta');
    }
}

// Registro
function togglePrestadorFields() {
    const tipo = document.getElementById('reg-tipo').value;
    const fields = document.getElementById('prestador-fields');
    
    if (tipo === 'prestador') {
        fields.classList.remove('hidden');
        document.getElementById('reg-foto').required = true;
    } else {
        fields.classList.add('hidden');
        document.getElementById('reg-foto').required = false;
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('reg-nombre').value.trim();
    const telefono = document.getElementById('reg-telefono').value.trim();
    const password = document.getElementById('reg-password').value;
    const genero = document.getElementById('reg-genero').value;
    const tipo = document.getElementById('reg-tipo').value;
    
    // Verificar si ya existe
    if (usuarios.find(u => u.telefono === telefono)) {
        alert('Este teléfono ya está registrado');
        return;
    }
    
    const nuevoUsuario = {
        id: 'u' + Date.now(),
        nombre,
        telefono,
        password,
        genero,
        tipo
    };
    
    if (tipo === 'prestador') {
        nuevoUsuario.avatar = document.getElementById('reg-foto').value;
        nuevoUsuario.descripcion = document.getElementById('reg-descripcion').value;
    }
    
    usuarios.push(nuevoUsuario);
    
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    navigate('login');
}

// Home
function loadHome() {
    const welcomeMsg = document.getElementById('welcome-message');
    const menuGrid = document.getElementById('menu-grid');
    
    welcomeMsg.textContent = `Bienvenido, ${usuarioActual.nombre}`;
    
    let menuItems = [];
    
    if (usuarioActual.tipo === 'admin') {
        menuItems = [
            { name: 'Panel Admin', icon: '🔧', route: 'admin' }
        ];
    } else if (usuarioActual.tipo === 'prestador') {
        menuItems = [
            { name: 'Mi Perfil', icon: '👤', route: 'profile' },
            { name: 'Buscar Servicios', icon: '🔍', route: 'services' },
            { name: 'Mis Servicios', icon: '📋', route: 'my-services' },
            { name: 'Publicar Servicio', icon: '➕', route: 'publish-service' },
            { name: 'Ver Solicitudes', icon: '📝', route: 'requests' },
            { name: 'Mensajes', icon: '💬', route: 'messages' }
        ];
    } else {
        menuItems = [
            { name: 'Mi Perfil', icon: '👤', route: 'profile' },
            { name: 'Buscar Servicios', icon: '🔍', route: 'services' },
            { name: 'Crear Solicitud', icon: '➕', route: 'create-request' },
            { name: 'Mis Solicitudes', icon: '📝', route: 'requests' },
            { name: 'Mensajes', icon: '💬', route: 'messages' }
        ];
    }
    
    menuGrid.innerHTML = menuItems.map(item => `
        <button class="menu-card" onclick="navigate('${item.route}')">
            <h3>${item.icon} ${item.name}</h3>
        </button>
    `).join('');
}

// Perfil
function loadProfile() {
    const content = document.getElementById('profile-content');
    
    content.innerHTML = `
        <div class="card">
            ${usuarioActual.avatar ? `<img src="${usuarioActual.avatar}" alt="Avatar" class="avatar">` : ''}
            <h3>${usuarioActual.nombre}</h3>
            <p><strong>Teléfono:</strong> ${usuarioActual.telefono}</p>
            <p><strong>Género:</strong> ${usuarioActual.genero}</p>
            <p><strong>Tipo:</strong> ${usuarioActual.tipo === 'prestador' ? 'Prestador de Servicios' : 'Usuario'}</p>
            ${usuarioActual.descripcion ? `<p><strong>Descripción:</strong> ${usuarioActual.descripcion}</p>` : ''}
        </div>
    `;
}

// Editar Perfil
function loadEditProfile() {
    document.getElementById('edit-nombre').value = usuarioActual.nombre;
    document.getElementById('edit-telefono').value = usuarioActual.telefono;
    document.getElementById('edit-genero').value = usuarioActual.genero;
    
    const prestadorFields = document.getElementById('edit-prestador-fields');
    if (usuarioActual.tipo === 'prestador') {
        prestadorFields.classList.remove('hidden');
        document.getElementById('edit-foto').value = usuarioActual.avatar || '';
        document.getElementById('edit-descripcion').value = usuarioActual.descripcion || '';
    } else {
        prestadorFields.classList.add('hidden');
    }
}

function handleEditProfile(event) {
    event.preventDefault();
    
    usuarioActual.nombre = document.getElementById('edit-nombre').value.trim();
    usuarioActual.telefono = document.getElementById('edit-telefono').value.trim();
    usuarioActual.genero = document.getElementById('edit-genero').value;
    
    if (usuarioActual.tipo === 'prestador') {
        usuarioActual.avatar = document.getElementById('edit-foto').value;
        usuarioActual.descripcion = document.getElementById('edit-descripcion').value;
    }
    
    // Actualizar en memoria
    const index = usuarios.findIndex(u => u.id === usuarioActual.id);
    if (index !== -1) {
        usuarios[index] = usuarioActual;
    }
    
    alert('✅ Perfil actualizado correctamente');
    navigate('profile');
}

// Servicios
function loadServices() {
    const list = document.getElementById('services-list');
    
    list.innerHTML = servicios.map(s => `
        <div class="card">
            <img src="${s.avatar}" alt="Avatar" class="avatar">
            <h3>${s.nombre}</h3>
            <p><strong>Categoría:</strong> <span class="badge badge-media">${s.categoria}</span></p>
            <p>${s.descripcion}</p>
            <p><strong>Precio:</strong> $${Number(s.precio).toLocaleString()} COP</p>
            <p class="rating">⭐ ${s.rating || 'Sin calificar'}</p>
            <p><strong>Contacto:</strong> ${s.telefono}</p>
            <button class="btn" onclick="contactService('${s.telefono}')">📞 Contactar</button>
        </div>
    `).join('');
}

function filterServices() {
    const search = document.getElementById('search-services').value.toLowerCase();
    const filtered = servicios.filter(s => 
        s.categoria.toLowerCase().includes(search) ||
        s.nombre.toLowerCase().includes(search) ||
        s.descripcion.toLowerCase().includes(search)
    );
    
    const list = document.getElementById('services-list');
    list.innerHTML = filtered.map(s => `
        <div class="card">
            <img src="${s.avatar}" alt="Avatar" class="avatar">
            <h3>${s.nombre}</h3>
            <p><strong>Categoría:</strong> <span class="badge badge-media">${s.categoria}</span></p>
            <p>${s.descripcion}</p>
            <p><strong>Precio:</strong> $${Number(s.precio).toLocaleString()} COP</p>
            <p class="rating">⭐ ${s.rating || 'Sin calificar'}</p>
            <p><strong>Contacto:</strong> ${s.telefono}</p>
            <button class="btn" onclick="contactService('${s.telefono}')">📞 Contactar</button>
        </div>
    `).join('');
}

function contactService(telefono) {
    alert(`Para contactar este servicio, llama al: ${telefono}`);
}

// Mis Servicios
function loadMyServices() {
    const misServicios = servicios.filter(s => s.telefono === usuarioActual.telefono);
    const list = document.getElementById('my-services-list');
    
    if (misServicios.length === 0) {
        list.innerHTML = '<p>No has publicado servicios aún.</p>';
        return;
    }
    
    list.innerHTML = misServicios.map(s => `
        <div class="card">
            <h3>${s.categoria}</h3>
            <p>${s.descripcion}</p>
            <p><strong>Precio:</strong> $${Number(s.precio).toLocaleString()} COP</p>
            <p class="rating">⭐ ${s.rating || 'Sin calificar'}</p>
            ${!s.inmutable ? `<button class="btn btn-danger" onclick="deleteService('${s.id}')">Eliminar</button>` : ''}
        </div>
    `).join('');
}

function deleteService(id) {
    if (confirm('¿Eliminar este servicio?')) {
        const index = servicios.findIndex(s => s.id === id);
        if (index !== -1) {
            servicios.splice(index, 1);
        }
        loadMyServices();
    }
}

// Publicar Servicio
function handlePublishService(event) {
    event.preventDefault();
    
    const nuevoServicio = {
        id: 's' + Date.now(),
        categoria: document.getElementById('pub-categoria').value,
        descripcion: document.getElementById('pub-descripcion').value,
        precio: document.getElementById('pub-precio').value,
        nombre: usuarioActual.nombre,
        telefono: usuarioActual.telefono,
        avatar: usuarioActual.avatar || 'https://i.pravatar.cc/150',
        rating: 0,
        inmutable: false
    };
    
    servicios.push(nuevoServicio);
    
    alert('✅ Servicio publicado correctamente');
    event.target.reset();
    navigate('my-services');
}

// Solicitudes
function loadRequests() {
    const list = document.getElementById('requests-list');
    
    list.innerHTML = solicitudes.map(r => {
        const badgeClass = r.urgencia === 'Alta' ? 'badge-alta' : 
                          r.urgencia === 'Media' ? 'badge-media' : 'badge-baja';
        
        return `
            <div class="card">
                <h3>${r.categoria}</h3>
                <p>${r.descripcion}</p>
                <p><strong>Urgencia:</strong> <span class="badge ${badgeClass}">${r.urgencia}</span></p>
                <p><strong>Solicitante:</strong> ${r.nombre}</p>
                <p><strong>Contacto:</strong> ${r.telefono}</p>
                ${!r.inmutable && r.telefono === usuarioActual.telefono ? 
                    `<button class="btn btn-danger" onclick="deleteRequest('${r.id}')">Eliminar</button>` : ''}
            </div>
        `;
    }).join('');
}

function deleteRequest(id) {
    if (confirm('¿Eliminar esta solicitud?')) {
        const index = solicitudes.findIndex(r => r.id === id);
        if (index !== -1) {
            solicitudes.splice(index, 1);
        }
        loadRequests();
    }
}

// Crear Solicitud
function handleCreateRequest(event) {
    event.preventDefault();
    
    const nuevaSolicitud = {
        id: 'r' + Date.now(),
        categoria: document.getElementById('req-categoria').value,
        descripcion: document.getElementById('req-descripcion').value,
        urgencia: document.getElementById('req-urgencia').value,
        nombre: usuarioActual.nombre,
        telefono: usuarioActual.telefono,
        inmutable: false
    };
    
    solicitudes.push(nuevaSolicitud);
    
    alert('✅ Solicitud creada correctamente');
    event.target.reset();
    navigate('requests');
}

// Mensajes/Chat
function loadMessagesScreen() {
    const select = document.getElementById('chat-destinatario');
    
    // Limpiar y agregar admin
    select.innerHTML = '<option value="">Seleccione...</option><option value="admin">Soporte (Admin)</option>';
    
    // Agregar otros usuarios
    usuarios.forEach(u => {
        if (u.id !== usuarioActual.id) {
            select.innerHTML += `<option value="${u.id}">${u.nombre}</option>`;
        }
    });
}

function loadChatMessages() {
    const destinatario = document.getElementById('chat-destinatario').value;
    if (!destinatario) return;
    
    const chatMessages = document.getElementById('chat-messages');
    
    // Filtrar mensajes entre el usuario actual y el destinatario
    const conversacion = mensajes.filter(m => 
        (m.de === usuarioActual.id && m.para === destinatario) ||
        (m.de === destinatario && m.para === usuarioActual.id)
    );
    
    if (conversacion.length === 0) {
        chatMessages.innerHTML = '<p style="text-align: center; color: #999;">No hay mensajes aún. ¡Inicia la conversación!</p>';
        return;
    }
    
    chatMessages.innerHTML = conversacion.map(m => {
        const isSent = m.de === usuarioActual.id;
        return `
            <div class="message ${isSent ? 'sent' : ''}">
                <div class="message-header">${isSent ? 'Tú' : m.nombreDe}</div>
                <div>${m.texto}</div>
                <div class="message-time">${new Date(m.timestamp).toLocaleString()}</div>
            </div>
        `;
    }).join('');
    
    // Scroll al final
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const destinatario = document.getElementById('chat-destinatario').value;
    const input = document.getElementById('chat-input');
    const texto = input.value.trim();
    
    if (!destinatario) {
        alert('Selecciona un destinatario primero');
        return;
    }
    
    if (!texto) return
    
    const nuevoMensaje = {
        id: 'm' + Date.now(),
        de: usuarioActual.id,
        nombreDe: usuarioActual.nombre,
        para: destinatario,
        texto: texto,
        timestamp: new Date().toISOString()
    };
    
    mensajes.push(nuevoMensaje);
    
    input.value = '';
    loadChatMessages();
}

// Enter para enviar mensaje
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Admin Panel
function loadAdminPanel() {
    
    // Estadísticas
    document.getElementById('stat-usuarios').textContent = usuarios.length;
    document.getElementById('stat-servicios').textContent = servicios.length;
    document.getElementById('stat-solicitudes').textContent = solicitudes.length;
    
    // Usuarios
    const adminUsuarios = document.getElementById('admin-usuarios');
    adminUsuarios.innerHTML = usuarios.map(u => `
        <div class="card">
            <h4>${u.nombre}</h4>
            <p><strong>Teléfono:</strong> ${u.telefono}</p>
            <p><strong>Tipo:</strong> ${u.tipo}</p>
            <button class="btn btn-danger" onclick="deleteUser('${u.id}')">Eliminar</button>
        </div>
    `).join('');
    
    // Servicios
    const adminServicios = document.getElementById('admin-servicios');
    adminServicios.innerHTML = servicios.map(s => `
        <div class="card">
            <h4>${s.categoria} - ${s.nombre}</h4>
            <p>${s.descripcion}</p>
            <p><strong>Precio:</strong> $${Number(s.precio).toLocaleString()}</p>
            ${!s.inmutable ? `<button class="btn btn-danger" onclick="adminDeleteService('${s.id}')">Eliminar</button>` : '<span class="badge badge-media">Dato inicial</span>'}
        </div>
    `).join('');
    
    // Solicitudes
    const adminSolicitudes = document.getElementById('admin-solicitudes');
    adminSolicitudes.innerHTML = solicitudes.map(r => `
        <div class="card">
            <h4>${r.categoria} - ${r.nombre}</h4>
            <p>${r.descripcion}</p>
            <p><strong>Urgencia:</strong> ${r.urgencia}</p>
            ${!r.inmutable ? `<button class="btn btn-danger" onclick="adminDeleteRequest('${r.id}')">Eliminar</button>` : '<span class="badge badge-media">Dato inicial</span>'}
        </div>
    `).join('');
}

function deleteUser(id) {
    if (confirm('¿Eliminar este usuario?')) {
        const index = usuarios.findIndex(u => u.id === id);
        if (index !== -1) {
            usuarios.splice(index, 1);
        }
        loadAdminPanel();
    }
}

function adminDeleteService(id) {
    if (confirm('¿Eliminar este servicio?')) {
        const index = servicios.findIndex(s => s.id === id);
        if (index !== -1) {
            servicios.splice(index, 1);
        }
        loadAdminPanel();
    }
}

function adminDeleteRequest(id) {
    if (confirm('¿Eliminar esta solicitud?')) {
        const index = solicitudes.findIndex(r => r.id === id);
        if (index !== -1) {
            solicitudes.splice(index, 1);
        }
        loadAdminPanel();
    }
}

// Cerrar Sesión
function cerrarSesion() {
    if (confirm('¿Cerrar sesión?')) {
        usuarioActual = null;
        historyStack = [];
        navigate('login');
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    initializeData();
    navigate('login');
});