// 1. RELOJ ESTILO NIXIE
function updateClock() {
    const clockElement = document.getElementById('clock');
    
    // VALIDACIÓN: Si no hay reloj en la página actual, detiene esta función para evitar errores
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

// VALIDACIÓN: Solo ejecuta el evento si el formulario existe en la página actual
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

// --- LOGICA DE PESTAÑAS (TABS) PARA PARCIALES Y PROYECTOS ---
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

    // Mostrar el parcial (o proyecto) actual y agregar clase "active" al boton presionado
    document.getElementById(parcialName).style.display = "block";
    evt.currentTarget.className += " active";
}

const questions = [
            {
                type: "outlook",
                senderName: "Soporte IT",
                senderEmail: "admin@it-supp0rt-update.com",
                subject: "URGENTE: Su cuenta será suspendida en 2 horas",
                bodyHTML: "<p>Estimado usuario,</p><p>Hemos detectado actividad inusual en su cuenta corporativa. Para evitar el bloqueo y la pérdida de datos, por favor valide su identidad de inmediato ingresando al portal seguro de Microsoft:</p><a href='#' class='fake-btn-blue'>Validar Identidad Ahora</a><br><br><p style='color:#666; font-size:0.8rem;'>Link directo: <span class='fake-link'>http://portal-seguro.update-empresa.net/auth</span></p><hr style='border:0; border-top:1px solid #eee;'><p style='font-size:0.8rem; color:#888;'>Microsoft Corporation | Equipo de Soporte Empresarial</p>",
                isPhishing: true,
                explanation: "URGENCIA + DOMINIO FALSO. El atacante crea urgencia amenazando con bloquear la cuenta. Fíjate en el remitente ('supp0rt' con un cero) y el enlace inseguro (http)."
            },
            {
                type: "gmail",
                senderName: "Recursos Humanos",
                senderEmail: "hr@empresa.com",
                subject: "Boletín mensual y días festivos de este mes",
                bodyHTML: "<p>Hola equipo,</p><p>Les compartimos el boletín mensual de la empresa. Además, les recordamos que el próximo viernes es día festivo oficial y las oficinas permanecerán cerradas.</p><p>Pueden consultar el calendario completo en la intranet corporativa: <span class='fake-link'>https://intranet.empresa.com/calendario</span>.</p><br><p>Atentamente,<br><strong>Departamento de Recursos Humanos</strong></p>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Remitente interno conocido, dominio corporativo seguro (https) y ausencia de tácticas de presión o urgencia."
            },
            {
                type: "gmail",
                senderName: "Netflix Security",
                senderEmail: "no-reply@netfIix-security-alert.com",
                subject: "Actualice su método de pago",
                bodyHTML: "<div style='text-align:center; background:#111; padding: 30px; color:#fff; border-radius: 8px;'><h1 style='color:#e50914; margin-top:0;'>NETFLIX</h1><p style='font-size:1.1rem;'>Estimado Cliente,</p><p>Su último pago ha sido declinado. Su suscripción ha sido pausada temporalmente.</p><p>Por favor, actualice sus datos bancarios descargando y ejecutando el formulario adjunto de actualización segura.</p><a href='#' class='fake-btn-red'>ACTUALIZAR MÉTODO DE PAGO</a><p style='font-size:0.75rem; color:#888; margin-top:20px;'><i class='fas fa-paperclip'></i> Archivo adjunto: Formulario_Actualizacion.pdf.exe (1.2 MB)</p></div>",
                isPhishing: true,
                explanation: "ARCHIVOS PELIGROSOS Y TYPOSQUATTING. El dominio dice 'netfIix' (con una 'I' mayúscula). Además, pide descargar un archivo '.exe' disfrazado de PDF, una técnica clásica de malware."
            },
            {
                type: "sms",
                senderName: "Correos de Mexico",
                senderPhone: "+52 555 123 4567",
                subject: "",
                bodyHTML: "Tu paquete esta retenido en aduanas por falta de pago de impuestos ($35.00 MXN). Paga ahora para liberar tu paquete:<br><br><span style='text-decoration:underline;'>http://aduanas-rastreo-pago-mx.com/pay</span>",
                isPhishing: true,
                explanation: "SMISHING (Phishing por SMS). Usan una estafa común de paquetería para robar datos de tarjetas de crédito. El enlace no pertenece a ninguna entidad gubernamental."
            },
            {
                type: "outlook",
                senderName: "Jefe de Proyecto",
                senderEmail: "director.proyecto@empresa.com",
                subject: "Revisión de avances - Sprint 3",
                bodyHTML: "<p>Hola,</p><p>Adjunto el documento de Excel con los avances de este Sprint para que lo revisemos en la junta de las 4:00 PM.</p><div style='border:1px solid #ccc; padding:10px; display:inline-block; margin-top:10px;'><i class='fas fa-file-excel' style='color:green;'></i> <span class='fake-link'>Reporte_Sprint3.xlsx</span></div><br><br><p>Saludos cordiales,<br><strong>Director de Proyectos</strong></p>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Es una comunicación normal de trabajo, el remitente es interno y el adjunto coincide con el contexto operativo."
            },
            {
                type: "gmail",
                senderName: "CEO Empresa",
                senderEmail: "ceo.empresa.director@gmail.com",
                subject: "Transferencia confidencial requerida",
                bodyHTML: "<p>Estoy en una reunión muy importante y no puedo hablar. Necesito que hagas una transferencia bancaria urgente a un nuevo proveedor en el extranjero antes de que cierre el banco.</p><p>Es confidencial, no le digas a nadie. Te paso los datos de la cuenta en cuanto me respondas.</p><p>Confírmame que recibiste esto de inmediato.</p><p>Enviado desde mi iPhone</p>",
                isPhishing: true,
                explanation: "FRAUDE DEL CEO (BEC). El correo proviene de un servicio gratuito (gmail.com). Apela a la autoridad (CEO) y exige saltarse los protocolos normales bajo excusa de confidencialidad."
            },
            {
                type: "outlook",
                senderName: "IT-Alerts",
                senderEmail: "alerts@empresa.com",
                subject: "Mantenimiento programado de servidores",
                bodyHTML: "<p>Aviso a todo el personal:</p><p>El día sábado de 2:00 AM a 4:00 AM realizaremos mantenimiento a los servidores principales. El acceso a la intranet estará temporalmente suspendido.</p><p><strong>No se requiere ninguna acción por su parte.</strong></p><hr><p style='font-size:0.8rem; color:#666;'>Infraestructura y Redes</p>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Notificación informativa sin enlaces externos, sin peticiones de contraseñas y sin exigir acciones urgentes."
            },
            {
                type: "outlook",
                senderName: "Microsoft Security",
                senderEmail: "security@micros0ft-alerts.com",
                subject: "Actividad inusual detectada en su cuenta",
                bodyHTML: "<p><strong>Alerta de Seguridad</strong></p><p>Alguien intentó iniciar sesión en su cuenta corporativa desde Moscú, Rusia (IP: 45.12.33.11).</p><p>Si no fue usted, haga clic en el botón de abajo para cambiar su contraseña y proteger su cuenta inmediatamente.</p><a href='#' class='fake-btn-blue'>Proteger Mi Cuenta</a><p style='color:#777; font-size: 0.8rem;'>URL: <span class='fake-link'>https://login.micros0ft-alerts.com/recover</span></p>",
                isPhishing: true,
                explanation: "TYPOSQUATTING. Usa un '0' en lugar de una 'o' en 'Microsoft'. Juega con el miedo del usuario (inicio de sesión en Rusia) para robar credenciales."
            },
            {
                type: "gmail",
                senderName: "Sistema de Nóminas",
                senderEmail: "nomina@empresa.com",
                subject: "Recibo de pago disponible (Quincena 2)",
                bodyHTML: "<p>Estimado colaborador,</p><p>Tu recibo de nómina correspondiente a la segunda quincena ya está disponible en el portal oficial de empleados:</p><p><span class='fake-link'>https://portal.empresa.com/nomina</span></p><p>Si tienes dudas, contacta a tu representante de RH local.</p>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Comunicación interna habitual, dominio correcto y no hay tácticas coercitivas."
            },
            {
                type: "gmail",
                senderName: "Amazon Support",
                senderEmail: "support@amazon-refunds-24.com",
                subject: "Reembolso procesado (Acción requerida)",
                bodyHTML: "<div style='text-align:center;'><img src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' width='100' alt='Amazon'><p style='font-size:1.2rem;'><strong>¡Tienes un reembolso pendiente!</strong></p><p>Hemos procesado un reembolso de $1,499.00 a su favor por una compra facturada doblemente por error.</p><p>Para que el dinero sea depositado, debe verificar su tarjeta de crédito aquí:</p><a href='#' class='fake-btn-blue' style='background:#f0c14b; color:#111;'>Reclamar Reembolso</a><p style='color:red; font-size:0.9rem;'>Tiene 24 horas antes de que el dinero sea cancelado.</p></div>",
                isPhishing: true,
                explanation: "CEBO FINANCIERO + URGENCIA. Promete dinero gratis (reembolso) pero pone un límite de tiempo (24h) y usa un dominio falso no relacionado con Amazon."
            },
            {
                type: "gmail",
                senderName: "Hacker Anónimo",
                senderEmail: "hacker123@darkweb.net",
                subject: "Tengo tu contraseña y videos tuyos",
                bodyHTML: "<p>He infectado tu computadora con un troyano Pegasus. Sé que tu contraseña actual es 'Contraseña123!'.</p><p>También tengo videos tuyos comprometedores grabados desde tu cámara web mientras visitabas sitios para adultos.</p><p>Si no quieres que le envíe el video a todos tus contactos, transfiere $500 USD en Bitcoin a esta cartera:</p><p style='font-family:monospace; background:#eee; padding:5px; display:inline-block;'>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p><p>Tienes 48 horas.</p>",
                isPhishing: true,
                explanation: "SEXTORSIÓN/EXTORSIÓN. Es una campaña masiva. Obtienen una contraseña vieja tuya de alguna filtración de datos pública para asustarte, pero realmente no tienen tu cámara hackeada."
            },
            {
                type: "outlook",
                senderName: "Compañero de equipo",
                senderEmail: "compañero@empresa.com",
                subject: "Notas de la reunión de hoy",
                bodyHTML: "<p>Hola,</p><p>Te comparto el enlace seguro de SharePoint con la minuta de lo que platicamos hoy en la junta para que lo revises cuando tengas tiempo.</p><p><i class='fas fa-link'></i> <span class='fake-link'>https://empresa.sharepoint.com/docs/minuta.docx</span></p><p>Saludos.</p>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Contexto normal, URL oficial de SharePoint corporativo y sin sentido de urgencia irreal."
            },
            {
                type: "outlook",
                senderName: "Facturación Legal",
                senderEmail: "facturas@proveedor-falso.com",
                subject: "FACTURA VENCIDA - Pago Inmediato o Demanda Legal",
                bodyHTML: "<p style='color:red; font-weight:bold;'>AVISO DE DEMANDA PREVIA</p><p>Su empresa tiene un saldo vencido de $15,000 USD con nosotros. Adjuntamos la factura detallada y los documentos de penalización.</p><p>Si no recibimos el pago HOY MISMO, procederemos con una demanda legal a través de nuestro bufete de abogados.</p><div style='border:1px solid #ccc; padding:10px; display:inline-block;'><i class='fas fa-file-archive' style='color:#ff4500;'></i> <span class='fake-link'>FACTURA_LEGAL.zip</span></div>",
                isPhishing: true,
                explanation: "COERCIÓN LEGAL + ARCHIVO PELIGROSO. Usa amenazas severas (demandas) para que la víctima entre en pánico y abra el archivo .zip que seguramente contiene Ransomware."
            },
            {
                type: "gmail",
                senderName: "LinkedIn",
                senderEmail: "messages-noreply@linkedin.com",
                subject: "Tienes 3 nuevas visualizaciones de perfil",
                bodyHTML: "<div style='background:#f3f2ef; padding:20px;'><div style='background:#fff; padding:20px; text-align:center; border-top: 4px solid #0077b5;'><h2 style='color:#0077b5; margin-top:0;'>in</h2><p>Hola,</p><p>Tu perfil está siendo notado. <strong>3 personas</strong> han visto tu perfil esta semana.</p><p>Inicia sesión en la aplicación oficial para ver quién te está buscando y ampliar tu red profesional.</p><a href='#' class='fake-btn-blue' style='background:#0a66c2;'>Ver mis visualizaciones</a></div></div>",
                isPhishing: false,
                explanation: "LEGÍTIMO. Es un correo automatizado real de LinkedIn. El dominio es oficial y correcto, el diseño encaja con las notificaciones de la red social."
            },
            {
                type: "outlook",
                senderName: "Equipo de Seguridad",
                senderEmail: "sec-admin@empresa-it-auth.com",
                subject: "Verificación de MFA Requerida (Autenticador)",
                bodyHTML: "<p>Estamos actualizando nuestras políticas de seguridad Zero Trust en la infraestructura.</p><p>Debes re-sincronizar tu aplicación de Microsoft Authenticator (MFA) haciendo clic en el siguiente enlace. De lo contrario, perderás acceso a tu correo corporativo al finalizar el día.</p><a href='#' class='fake-btn-blue'>Sincronizar MFA Ahora</a><br><br><p style='color:#888; font-size:0.8rem;'>Destino: <span class='fake-link'>https://auth-empresa.proxy-login.com/</span></p>",
                isPhishing: true,
                explanation: "MFA FATIGUE / PROXY INVERSO. Intentan robar no solo tu contraseña, sino interceptar tu código de Doble Factor (MFA) enviándote a un sitio proxy falso. El dominio no es el corporativo."
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let playerName = "";
        let playerEmail = "";

        // Funciones de control de UI
        function showQuizMenu() {
            document.getElementById('quiz-menu').style.display = 'block';
            document.getElementById('quiz-register').style.display = 'none';
            document.getElementById('quiz-game').style.display = 'none';
            document.getElementById('quiz-ranking').style.display = 'none';
        }

        function showQuizRegister() {
            document.getElementById('quiz-menu').style.display = 'none';
            document.getElementById('quiz-register').style.display = 'block';
        }

        function startQuiz() {
            const nameInput = document.getElementById('playerName').value.trim();
            const emailInput = document.getElementById('playerEmail').value.trim();

            if(nameInput === "" || emailInput === "") {
                alert("[!] ERROR: Debes ingresar un Alias y un Correo para la simulación.");
                return;
            }

            playerName = nameInput;
            playerEmail = emailInput;
            currentQuestion = 0;
            score = 0;

            document.getElementById('quiz-register').style.display = 'none';
            document.getElementById('quiz-game').style.display = 'block';
            loadQuestion();
        }

        function getInitials(name) {
            return name.charAt(0).toUpperCase();
        }

        function loadQuestion() {
            document.getElementById('q-feedback').style.display = 'none';
            document.getElementById('q-options').style.display = 'flex';

            const q = questions[currentQuestion];
            document.getElementById('q-level').innerText = (currentQuestion + 1) + " / 15";
            document.getElementById('q-score').innerText = score;
            
            const contentArea = document.getElementById('q-content-area');
            let htmlToInject = "";

            if(q.type === "gmail") {
                htmlToInject = `
                    <div class="ui-gmail">
                        <div class="g-subject">${q.subject}</div>
                        <div class="g-header">
                            <div class="g-avatar">${getInitials(q.senderName)}</div>
                            <div class="g-sender-info">
                                <div class="g-name">${q.senderName} <span class="g-email">&lt;${q.senderEmail}&gt;</span></div>
                                <div class="g-to">Para: mí <i class="fas fa-caret-down"></i></div>
                            </div>
                        </div>
                        <div class="g-body">${q.bodyHTML}</div>
                    </div>
                `;
            } else if(q.type === "outlook") {
                htmlToInject = `
                    <div class="ui-outlook">
                        <div class="o-header">
                            <div class="o-avatar">${getInitials(q.senderName)}</div>
                            <div class="o-sender-info">
                                <div class="o-name">${q.senderName}</div>
                                <div class="o-email">${q.senderEmail}</div>
                            </div>
                        </div>
                        <div class="o-subject">${q.subject}</div>
                        <div class="o-body">${q.bodyHTML}</div>
                    </div>
                `;
            } else if(q.type === "sms") {
                htmlToInject = `
                    <div class="ui-sms-wrapper">
                        <div class="ui-sms">
                            <div class="s-notch"></div>
                            <div class="s-header">
                                <div class="s-sender"><i class="fas fa-user-circle" style="color:#ccc; font-size:1.5rem; display:block; margin-bottom:5px;"></i> ${q.senderName}</div>
                                <div class="s-phone">${q.senderPhone}</div>
                            </div>
                            <div class="s-time">Hoy 14:23</div>
                            <div class="s-bubble">${q.bodyHTML}</div>
                        </div>
                    </div>
                `;
            }

            contentArea.innerHTML = htmlToInject;
        }

        function checkAnswer(userSaysPhishing) {
            const q = questions[currentQuestion];
            const isCorrect = (userSaysPhishing === q.isPhishing);
            
            document.getElementById('q-options').style.display = 'none';
            const fbBox = document.getElementById('q-feedback');
            const fbTitle = document.getElementById('feedback-title');
            
            fbBox.style.display = 'block';

            if(isCorrect) {
                score++;
                fbTitle.innerText = ">> ¡CORRECTO! 🟢";
                fbTitle.style.color = "#27c93f";
                fbBox.style.borderColor = "#27c93f";
            } else {
                fbTitle.innerText = ">> ¡INCORRECTO! 🔴";
                fbTitle.style.color = "#ff4500";
                fbBox.style.borderColor = "#ff4500";
            }

            document.getElementById('feedback-text').innerHTML = "<strong>Análisis del SOC:</strong> " + q.explanation;
            document.getElementById('q-score').innerText = score;
        }

        function nextQuestion() {
            currentQuestion++;
            if(currentQuestion < questions.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        }

        function finishQuiz() {
            document.getElementById('quiz-game').style.display = 'none';
            document.getElementById('quiz-ranking').style.display = 'block';
            document.getElementById('final-score').innerText = score;

            saveRanking();
            loadRanking();
        }

        function saveRanking() {
            let ranking = JSON.parse(localStorage.getItem('phishingRanking')) || [];
            ranking.push({ name: playerName, email: playerEmail, score: score });
            ranking.sort((a, b) => b.score - a.score);
            localStorage.setItem('phishingRanking', JSON.stringify(ranking));
        }

        function loadRanking() {
            let ranking = JSON.parse(localStorage.getItem('phishingRanking')) || [];
            let tbody = document.getElementById('ranking-body');
            tbody.innerHTML = "";

            let limit = ranking.length > 10 ? 10 : ranking.length;
            
            for(let i = 0; i < limit; i++) {
                let row = `<tr>
                    <td>${i + 1}</td>
                    <td>${ranking[i].name}</td>
                    <td>${ranking[i].email}</td>
                    <td style="color: var(--terminal-green); font-weight: bold;">${ranking[i].score} / 15</td>
                </tr>`;
                tbody.innerHTML += row;
            }
        }

        function showQuizRanking() {
            document.getElementById('quiz-menu').style.display = 'none';
            document.getElementById('quiz-ranking').style.display = 'block';
            document.getElementById('final-score').innerText = "-";
            loadRanking();
        }
        