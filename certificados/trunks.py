import keyboard
import pyautogui
import easyocr
import tkinter as tk
import threading
import numpy as np
import time
import google.generativeai as genai

# Inicializar el lector de OCR
reader = easyocr.Reader(['es', 'en'])

# ─────────────────────────────────────────────
# CONFIGURACION  <- Cambia esto
API_KEY = "AIzaSyBYiy4APcLYo9NdPA-iyjgFOhlFXwshbDo"
MODELO  = "gemini-2.5-flash"
# ─────────────────────────────────────────────

genai.configure(api_key=API_KEY)
modelo_gemini = genai.GenerativeModel(MODELO)

# Variables globales
ventana_captura  = None
pixel_ventana    = None   # ventana Toplevel del pixel (controlada desde el hilo principal)
programa_visible = True
root             = None   # ventana raiz tkinter (hilo principal)

# Coordenadas de la zona de captura
zona_captura = {'x': 0, 'y': 0, 'ancho': 400, 'alto': 300}


# ─── Gemini ───────────────────────────────────────────────────────────────────

def enviar_pregunta(texto):
    try:
        prompt = (
            "Analiza el siguiente texto extraido de una pantalla por OCR.\n\n"
            "TEXTO:\n'''\n" + texto + "\n'''\n\n"
            "Instrucciones:\n"
            "1. Identifica la pregunta y sus opciones (A/B/C/D, numeros, bullets, etc.).\n"
            "2. Determina cual es la respuesta correcta.\n"
            "3. Responde UNICAMENTE con 1 o 2 palabras clave de esa opcion, "
            "copiadas EXACTAMENTE como aparecen en el texto (respeta mayusculas/minusculas).\n"
            "   Ej: si la opcion correcta es 'B) Fotosintesis' -> responde: Fotosintesis\n"
            "   Ej: si la opcion es '3. Nueva York'            -> responde: Nueva York\n\n"
            "Solo esas palabras, sin explicacion ni puntuacion extra."
        )
        resp = modelo_gemini.generate_content(prompt)
        return resp.text.strip()
    except Exception as e:
        print(f"[ERROR Gemini] {e}")
        return None


# ─── Control del pixel (siempre desde el hilo principal via root.after) ───────

def _mostrar_pixel_en_hilo_principal(cx, cy):
    """Crea o reemplaza el pixel. Llamar SIEMPRE con root.after()."""
    global pixel_ventana

    # Destruir pixel anterior si existe
    if pixel_ventana is not None:
        try:
            pixel_ventana.destroy()
        except Exception:
            pass
        pixel_ventana = None

    if not programa_visible:
        return

    tam = 4
    v = tk.Toplevel(root)
    v.overrideredirect(True)
    v.attributes("-topmost", True)
    v.geometry(f"{tam}x{tam}+{cx - tam // 2}+{cy - tam // 2}")
    v.configure(bg="black")
    pixel_ventana = v

    # Programar autodestruccion a los 2 segundos
    root.after(2000, _ocultar_pixel)


def _ocultar_pixel():
    """Destruye el pixel. Llamar SIEMPRE con root.after()."""
    global pixel_ventana
    if pixel_ventana is not None:
        try:
            pixel_ventana.destroy()
        except Exception:
            pass
        pixel_ventana = None


def mostrar_pixel(cx, cy):
    """Punto de entrada seguro: encola la creacion del pixel en el hilo de tkinter."""
    root.after(0, lambda: _mostrar_pixel_en_hilo_principal(cx, cy))


def ocultar_pixel():
    """Punto de entrada seguro: encola la destruccion del pixel en el hilo de tkinter."""
    root.after(0, _ocultar_pixel)


# ─── Buscar coordenadas OCR ───────────────────────────────────────────────────

def buscar_coordenadas(resultados_ocr, palabras_clave, offset_x, offset_y):
    tokens = [t.lower() for t in palabras_clave.split() if len(t) > 1]
    if not tokens:
        return None, None

    mejor_score = 0
    mejor_box   = None

    for resultado in resultados_ocr:
        box   = resultado[0]
        texto = resultado[1].lower()
        score = sum(1 for t in tokens if t in texto)
        if score > mejor_score:
            mejor_score = score
            mejor_box   = box

    if mejor_box is None or mejor_score == 0:
        return None, None

    xs = [p[0] for p in mejor_box]
    ys = [p[1] for p in mejor_box]
    cx = offset_x + int(sum(xs) / len(xs))
    cy = offset_y + int(sum(ys) / len(ys))
    return cx, cy


# ─── Flujo principal ──────────────────────────────────────────────────────────

def capturar_y_procesar():
    """Corre en hilo secundario (llamado por el hotkey)."""
    print("[1/3] Capturando region...")

    ox    = zona_captura['x']
    oy    = zona_captura['y']
    ancho = zona_captura['ancho']
    alto  = zona_captura['alto']

    screenshot       = pyautogui.screenshot(region=(ox, oy, ancho, alto))
    screenshot_array = np.array(screenshot)
    resultados       = reader.readtext(screenshot_array)

    print(f"[OCR] {len(resultados)} textos detectados:")
    for i, r in enumerate(resultados):
        print(f"  {i+1}. '{r[1]}'  confianza:{r[2]:.0%}")

    texto_completo = '\n'.join([r[1] for r in resultados])
    if not texto_completo.strip():
        print("[INFO] No se detecto texto.")
        return

    print("[2/3] Consultando Gemini...")
    palabras_clave = enviar_pregunta(texto_completo)
    if not palabras_clave:
        print("[INFO] Gemini no devolvio respuesta.")
        return

    print(f"[Gemini] Palabras clave: '{palabras_clave}'")

    cx, cy = buscar_coordenadas(resultados, palabras_clave, ox, oy)
    if cx is not None:
        print(f"[3/3] Marcando posicion ({cx}, {cy})")
        mostrar_pixel(cx, cy)
    else:
        print("[AVISO] No se encontro la opcion en pantalla.")


def _thread_captura():
    """Lanza capturar_y_procesar en un hilo para no bloquear tkinter."""
    threading.Thread(target=capturar_y_procesar, daemon=True).start()


# ─── Visibilidad ──────────────────────────────────────────────────────────────

def _toggle_visibilidad():
    global programa_visible
    programa_visible = not programa_visible

    if programa_visible:
        if ventana_captura:
            ventana_captura.deiconify()
        print("Programa visible")
    else:
        if ventana_captura:
            ventana_captura.withdraw()
        # Ocultar pixel si esta visible
        _ocultar_pixel()
        print("Programa oculto (Alt+M para mostrar)")


def alternar_visibilidad():
    """Llamado desde hotkey (hilo secundario) -> encola en tkinter."""
    root.after(0, _toggle_visibilidad)


# ─── Ventana de seleccion de zona ─────────────────────────────────────────────

def crear_ventana_captura():
    global ventana_captura

    ventana_captura = tk.Toplevel(root)
    ventana_captura.title("")
    ventana_captura.geometry(
        f"{zona_captura['ancho']}x{zona_captura['alto']}+{zona_captura['x']}+{zona_captura['y']}"
    )
    ventana_captura.wm_attributes("-topmost", True)
    ventana_captura.overrideredirect(True)
    ventana_captura.wm_attributes("-toolwindow", True)
    ventana_captura.configure(bg='white')
    ventana_captura.wm_attributes("-transparentcolor", "white")

    canvas = tk.Canvas(ventana_captura, bg='white', highlightthickness=0, borderwidth=0)
    canvas.pack(fill=tk.BOTH, expand=True)

    pixel_size     = 3
    color_gris     = '#d3d3d3'
    edge_tolerance = 10
    drag_data      = {"x": 0, "y": 0, "mode": None}

    def dibujar_esquinas():
        canvas.delete("all")
        w = ventana_captura.winfo_width()
        h = ventana_captura.winfo_height()
        canvas.create_rectangle(0, 0, pixel_size, pixel_size, fill=color_gris, outline='')
        canvas.create_rectangle(w-pixel_size, 0, w, pixel_size, fill=color_gris, outline='')
        canvas.create_rectangle(0, h-pixel_size, pixel_size, h, fill=color_gris, outline='')
        canvas.create_rectangle(w-pixel_size, h-pixel_size, w, h, fill=color_gris, outline='')

    def detectar_zona(event):
        w, h = ventana_captura.winfo_width(), ventana_captura.winfo_height()
        x, y = event.x, event.y
        ei = x < edge_tolerance;  ed = x > w - edge_tolerance
        ea = y < edge_tolerance;  eb = y > h - edge_tolerance
        if ea and ei: return "nw"
        if ea and ed: return "ne"
        if eb and ei: return "sw"
        if eb and ed: return "se"
        if ea: return "n"
        if eb: return "s"
        if ei: return "w"
        if ed: return "e"
        return "move"

    def on_press(event):
        drag_data.update(x=event.x_root, y=event.y_root, mode=detectar_zona(event))

    def on_motion(event):
        if not drag_data["mode"]: return
        dx = event.x_root - drag_data["x"]
        dy = event.y_root - drag_data["y"]
        x  = ventana_captura.winfo_x();  y = ventana_captura.winfo_y()
        w  = ventana_captura.winfo_width(); h = ventana_captura.winfo_height()
        m  = drag_data["mode"]
        if   m == "move": ventana_captura.geometry(f"+{x+dx}+{y+dy}")
        elif m == "nw":   ventana_captura.geometry(f"{w-dx}x{h-dy}+{x+dx}+{y+dy}")
        elif m == "ne":   ventana_captura.geometry(f"{w+dx}x{h-dy}+{x}+{y+dy}")
        elif m == "sw":   ventana_captura.geometry(f"{w-dx}x{h+dy}+{x+dx}+{y}")
        elif m == "se":   ventana_captura.geometry(f"{w+dx}x{h+dy}+{x}+{y}")
        elif m == "n":    ventana_captura.geometry(f"{w}x{h-dy}+{x}+{y+dy}")
        elif m == "s":    ventana_captura.geometry(f"{w}x{h+dy}+{x}+{y}")
        elif m == "w":    ventana_captura.geometry(f"{w-dx}x{h}+{x+dx}+{y}")
        elif m == "e":    ventana_captura.geometry(f"{w+dx}x{h}+{x}+{y}")
        drag_data.update(x=event.x_root, y=event.y_root)

    def on_release(event):
        drag_data["mode"] = None

    def actualizar_zona(event=None):
        zona_captura.update(
            x=ventana_captura.winfo_x(),
            y=ventana_captura.winfo_y(),
            ancho=ventana_captura.winfo_width(),
            alto=ventana_captura.winfo_height()
        )
        dibujar_esquinas()

    canvas.bind('<Button-1>', on_press)
    canvas.bind('<B1-Motion>', on_motion)
    canvas.bind('<ButtonRelease-1>', on_release)
    ventana_captura.bind('<Configure>', actualizar_zona)
    ventana_captura.after(100, dibujar_esquinas)


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    global root

    if API_KEY == "TU_API_KEY_AQUI":
        print("Configura tu API key de Gemini en el archivo.")
        print("https://aistudio.google.com/app/apikey")
        return

    root = tk.Tk()
    root.withdraw()   # ventana raiz invisible

    crear_ventana_captura()

    print("=" * 45)
    print("  Asistente listo")
    print("  Alt+C -> Capturar y analizar zona")
    print("  Alt+M -> Mostrar / Ocultar")
    print("  Esc   -> Cerrar programa")
    print("=" * 45)

    keyboard.add_hotkey('alt+c', _thread_captura)
    keyboard.add_hotkey('alt+m', alternar_visibilidad)

    def _esperar_esc():
        keyboard.wait('esc')
        root.after(0, root.quit)

    threading.Thread(target=_esperar_esc, daemon=True).start()

    root.mainloop()


if __name__ == "__main__":
    main()