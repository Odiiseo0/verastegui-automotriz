// --- 1. LÓGICA DEL CARRUSEL DE IMÁGENES REALES ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function siguienteImagen() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
setInterval(siguienteImagen, 4000); // Cambia automáticamente cada 4 segundos


// --- 2. APERTURA Y CIERRE DE VENTANAS MODALES ---
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "flex";
        
        // Bloqueo de fechas pasadas en el calendario para agendar citas
        if (idModal === 'modalCita') {
            const inputFecha = document.getElementById('fechaCita');
            const hoy = new Date().toISOString().split('T')[0];
            inputFecha.setAttribute('min', hoy);
        }
    }
}

function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "none";
    }
}

// Cerrar cualquier modal si el usuario da clic sobre el fondo negro externo
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


// --- 3. PROCESAMIENTO DEL FORMULARIO DE CITAS ---
const formCita = document.getElementById('formCita');
if (formCita) {
    formCita.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombreCita').value;
        const telefono = document.getElementById('telefonoCita').value;
        const servicio = document.getElementById('servicioCita').value;
        const fecha = document.getElementById('fechaCita').value;

        alert(`¡Cita Programada Exitosamente!\n\nCliente: ${nombre}\nServicio: ${servicio}\nFecha: ${fecha}\n\nNos comunicaremos al ${telefono} para confirmar la hora.`);
        console.log("Nueva Cita Registrada:", { nombre, telefono, servicio, fecha });

        formCita.reset();
        cerrarModal('modalCita');
    });
}


// --- 4. PROCESAMIENTO DEL INICIO DE SESIÓN ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('emailLogin').value;
        alert(`Inicio de sesión exitoso.\nBienvenido al sistema seguro: ${email}`);
        console.log("Inicio de sesión seguro para:", email);

        formLogin.reset();
        cerrarModal('modalLogin');
    });
}


// --- 5. LÓGICA PARA DETALLES DE SERVICIO Y PRECIOS ---
const infoServicios = {
    'Amortiguadores': {
        titulo: 'Cambio de Amortiguadores',
        icono: 'fa-car-side',
        descripcion: 'Inspección completa del sistema de suspensión, desmontaje de amortiguadores desgastados e instalación de piezas nuevas de alta calidad para garantizar la estabilidad y suavidad de tu manejo.',
        costo: '$1,800 MXN + refacciones (Varía según el modelo)'
    },
    'Aceite': {
        titulo: 'Cambio de Aceite y Filtros',
        icono: 'fa-oil-can',
        descripcion: 'Drenado del aceite quemado, reemplazo del filtro de aceite de motor por uno nuevo y llenado con aceite multigrado o sintético de última generación según las especificaciones de tu vehículo.',
        costo: 'Desde $850 MXN (Incluye mano de obra y materiales)'
    },
    'Frenos': {
        titulo: 'Servicio de Frenos',
        icono: 'fa-circle-dot',
        descripcion: 'Cambio de balatas delanteras o traseras, rectificado de discos o tambores, limpieza profunda del sistema y purgado con líquido de frenos nuevo para máxima seguridad.',
        costo: 'Desde $950 MXN por eje'
    },
    'Escaner': {
        titulo: 'Diagnóstico por Escáner',
        icono: 'fa-laptop-medical',
        descripcion: 'Lectura completa de códigos de error de la computadora de tu auto (Check Engine). Borrado de códigos y entrega de un reporte detallado sobre fallas de motor, transmisión o sensores.',
        costo: '$500 MXN (Diagnóstico inicial)'
    },
    'Enfriamiento': {
        titulo: 'Sistema de Enfriamiento',
        icono: 'fa-temperature-arrow-down',
        descripcion: 'Revisión de fugas en mangueras, sondeo o cambio de radiador, reemplazo de anticongelante de alta duración y verificación del correcto encendido de los motoventiladores.',
        costo: 'Desde $600 MXN'
    },
    'Preventivo': {
        titulo: 'Mantenimiento Preventivo',
        icono: 'fa-screwdriver-wrench',
        descripcion: 'Inspección de puntos de seguridad esenciales: niveles de fluidos, estado de bandas, revisión de luces, presión de llantas y diagnóstico general para prevenir fallas mayores en carretera.',
        costo: '$500 MXN (Inspección general)'
    },
    'Historial': {
        titulo: 'Nuestra Historia y Compromiso',
        icono: 'fa-shop',
        descripcion: 'En Servicio Automotriz Verastegui iniciamos con una meta clara: ofrecer un servicio mecánico honesto, confiable y de calidad. Lo que comenzó como una pasión por el mantenimiento vehicular hoy es un taller de confianza gracias a ti.\n\nNos especializamos en diagnósticos precisos y soluciones garantizadas.\n\n¡Garantizamos que tu auto está en las mejores manos!',
        costo: '¡Ven a conocernos!'
    }
};

function mostrarDetalle(llaveServicio) {
    const data = infoServicios[llaveServicio];
    
    if (data) {
        document.getElementById('detalleTitulo').innerText = data.titulo;
        document.getElementById('detalleDescripcion').innerText = data.descripcion;
        document.getElementById('detalleCosto').innerText = data.costo;
        
        const elementoIcono = document.getElementById('detalleIcono');
        elementoIcono.className = `fa-solid ${data.icono}`;
        
        abrirModal('modalDetalleServicio');
    }
}
// Función para calcular el estatus del taller en tiempo real
function actualizarEstatusTaller() {
    const ahora = new Date();
    const dia = ahora.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaDecimal = hora + (minutos / 60);

    const indicador = document.getElementById('indicador-taller');
    const punto = document.getElementById('punto-estatus');
    const texto = document.getElementById('texto-estatus');
    const subtexto = document.getElementById('subtexto-estatus');

    if (!indicador || !punto || !texto || !subtexto) return;

    let abierto = false;

    // Lunes a Viernes: 8:00 AM a 6:30 PM (18.5)
    if (dia >= 1 && dia <= 5) {
        if (horaDecimal >= 8 && horaDecimal < 18.5) {
            abierto = true;
        }
    } 
    // Sábados: 8:00 AM a 2:00 PM (14.0)
    else if (dia === 6) {
        if (horaDecimal >= 8 && horaDecimal < 14) {
            abierto = true;
        }
    }

    // Aplicar estilos según el resultado
    if (abierto) {
        indicador.style.border = "1px solid #34c759";
        punto.style.backgroundColor = "#34c759";
        punto.style.boxShadow = "0 0 10px #34c759";
        texto.innerText = "¡ABIERTO AHORA!";
        texto.style.color = "#34c759";
        subtexto.innerText = "Trae tu auto a diagnóstico o mantenimiento. ¡Te esperamos!";
    } else {
        indicador.style.border = "1px solid #ff3b30";
        punto.style.backgroundColor = "#ff3b30";
        punto.style.boxShadow = "0 0 10px #ff3b30";
        texto.innerText = "CERRADO POR AHORA";
        texto.style.color = "#ff3b30";
        subtexto.innerText = "Estamos descansando. Te esperamos en nuestro próximo horario de atención.";
    }
}

// Ejecutar la función cuando cargue la página
window.addEventListener('DOMContentLoaded', actualizarEstatusTaller);
// Función para abrir y cerrar el acordeón de Preguntas Frecuentes
function toggleFaq(button) {
    const icon = button.querySelector('i');
    const content = button.nextElementSibling;
    
    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        content.style.padding = "0px 20px";
        icon.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + 30 + "px";
        content.style.padding = "15px 20px";
        icon.style.transform = "rotate(180deg)";
    }
}