// 1. RELOJ ESTILO NIXIE
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');
    
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // Si h es 0, mostrar 12
    h = h.toString().padStart(2, '0');
    
    document.getElementById('clock').innerText = `${h}:${m}:${s} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. SIMULACIÓN DE FORMULARIO Y AUTORESPUESTA
document.getElementById('contactForm').addEventListener('submit', function(e) {    
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
        document.getElementById('contactForm').reset();
    }, 1500);
});

console.log("SYSTEM SECURE... HTTPS ENABLED.");

// --- AGREGAR AL FINAL DE script.js ---

// 3. LOGICA DE PESTANAS (TABS)
function openParcial(evt, parcialName) {
    // Declarar variables
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