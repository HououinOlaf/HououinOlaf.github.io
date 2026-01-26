function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // El 0 debe ser 12

    // Añadir ceros a la izquierda si es necesario
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockElement.innerText = timeString;
}

// Actualizar cada segundo
setInterval(updateClock, 1000);

// Ejecutar inmediatamente al cargar
updateClock();

console.log("%c SYSTEM READY ", "background: #33ff33; color: #000; font-weight: bold;");