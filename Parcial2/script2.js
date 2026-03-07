// 1. RELOJ ESTILO NIXIE
function updateClock() {
    const clockElement = document.getElementById('clock');
    
    // Si no hay reloj en esta página (ej. en las actividades), no hace nada y evita errores
    if (!clockElement) return; 

    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');
    
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // Si h es 0, mostrar 12
    h = h.toString().padStart(2, '0');
    
    clockElement.innerText = `${h}:${m}:${s} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. SIMULACIÓN DE FORMULARIO Y AUTORESPUESTA
const contactForm = document.getElementById('contactForm');

// Solo ejecuta esto si el formulario existe en la página actual
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {    
        // Simulación visual de "Autorespuesta"
        const statusMsg = document.getElementById('form-status');
        const btn = document.querySelector('.cyber-btn');
        
        btn.innerHTML = "ENVIANDO PAQUETES...";
        btn.style.opacity = "0.7";
        
        // Simulamos un retraso de red
        setTimeout(() => {
            statusMsg.style.display = "block";
            statusMsg.innerHTML = "> [SISTEMA]: MENSAJE RECIBIDO.<br>> [AUTO-REPLY]: Hemos recibido su solicitud. Protocolo de respuesta iniciado.";
            btn.innerHTML = "TRANSMISIÓN COMPLETADA";
            btn.style.background = "#333";
            btn.disabled = true;
            
            // Limpiar formulario
            contactForm.reset();
        }, 1500);
    });
}

console.log("SYSTEM SECURE... HTTPS ENABLED.");

// --- LOGICA DE PESTAÑAS ---

// 3. TABS PRINCIPALES (PARCIALES)
function openParcial(evt, parcialName) {
    var i, tabcontent, tablinks;

    // Ocultar todo el contenido con clase "tab-content"
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Quitar la clase "active" de todos los botones
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar el parcial actual y agregar clase "active" al boton presionado
    document.getElementById(parcialName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 4. TABS SECUNDARIAS (LABORATORIOS ACT 8 ANTIGUOS)
function openLab(evt, grupoName) {
    var i, labcontent, lablinks;
    
    // Ocultar todos los contenidos de laboratorios
    labcontent = document.getElementsByClassName("lab-content");
    for (i = 0; i < labcontent.length; i++) {
        labcontent[i].style.display = "none";
    }
    
    // Quitar clase activa de los botones de laboratorios
    lablinks = document.getElementsByClassName("lab-btn");
    for (i = 0; i < lablinks.length; i++) {
        lablinks[i].className = lablinks[i].className.replace(" active", "");
    }
    
    // Mostrar grupo actual y marcar el botón como activo
    document.getElementById(grupoName).style.display = "block";
    evt.currentTarget.className += " active";
}

// --- LÓGICA DE ACORDEÓN (SOLO UNO ABIERTO A LA VEZ) ---
function toggleAccordion(btn) {
    // 1. Guardamos el estado actual del botón al que le hicimos clic
    var isActive = btn.classList.contains("active");
    
    // 2. Buscamos todos los botones y contenidos del acordeón en la página
    var allBtns = document.querySelectorAll('.accordion-btn');
    var allContents = document.querySelectorAll('.accordion-content');
    
    // 3. Cerramos TODOS los laboratorios por defecto
    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove("active");
        allContents[i].style.display = "none";
    }
    
    // 4. Si el laboratorio al que le hicimos clic estaba cerrado, lo abrimos.
    // (Si ya estaba abierto, el paso 3 lo cerró y así se queda)
    if (!isActive) {
        btn.classList.add("active");
        btn.nextElementSibling.style.display = "block";
    }
}