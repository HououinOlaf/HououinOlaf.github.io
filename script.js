// 1. RELOJ ESTILO NIXIE
function updateClock() {
    const now = new Date();
    let h = now.getHours().toString().padStart(2, '0');
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}:${s}`;
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