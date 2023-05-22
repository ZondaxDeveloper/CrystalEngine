import pygame
from pygame.locals import *
from pygame_gui import UIManager
import pygame_gui
from assets.scripts.collision import *

# Inicialización
pygame.init()

# Dimensiones de la ventana
ANCHO = 640
ALTO = 480


# Colores
BLANCO = (255, 255, 255)

# Crear la ventana
pantalla_completa = False # Variable para indicar si el juego está en pantalla completa
if pantalla_completa:
    ventana = pygame.display.set_mode((ANCHO, ALTO), FULLSCREEN)
else:
    ventana = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption("Mi Juego")

ui_manager = UIManager((ANCHO, ALTO))

boton_salir = pygame_gui.elements.UIButton(relative_rect=pygame.Rect((ANCHO - 110, 10), (100, 30)),
                                           text='Salir',
                                           manager=ui_manager)
boton_cambiar_resolucion = pygame_gui.elements.UIButton(relative_rect=pygame.Rect((ANCHO - 230, 10), (100, 30)),
                                                        text='Pantalla Compltela',
                                                        manager=ui_manager)
boton_salir_ref = boton_salir


# Cargar la imagen del sprite
sprite = pygame.image.load("assets/sprite.png")

# Coordenadas y dimensiones del sprite
x = 50
y = 50
ancho = 50
alto = 50

# Rectángulo que representa los límites de la pantalla
pantalla_rect = pygame.Rect(0, 0, ANCHO, ALTO)

# Cargar otro objeto
otro_objeto = pygame.Rect(200, 200, 100, 100)  # Rectángulo para el otro objeto

# Velocidad de movimiento
velocidad = 2  # Velocidad reducida

# Framerate
framerate = 60

# Reloj del juego
reloj = pygame.time.Clock()

# Bucle principal del juego
jugando = True
while jugando:
    # Manejo de eventos
    for evento in pygame.event.get():
        if evento.type == QUIT:
            jugando = False
        if evento.type == pygame.USEREVENT:
            if evento.user_type == pygame_gui.UI_BUTTON_PRESSED:
                if evento.ui_element == boton_salir:
                    jugando = False
                elif evento.ui_element == boton_cambiar_resolucion:
                    pantalla_completa = not pantalla_completa
                    if pantalla_completa:
                        ventana = pygame.display.set_mode((ANCHO, ALTO), FULLSCREEN)
                    else:
                        ventana = pygame.display.set_mode((ANCHO, ALTO))
                    ui_manager = pygame_gui.UIManager((ANCHO, ALTO))
                    boton_salir = boton_salir_ref


        ui_manager.process_events(evento)


    # Obtener las teclas presionadas
    teclas = pygame.key.get_pressed()

    # Movimiento del sprite
    if teclas[K_LEFT]:
        x -= velocidad
    if teclas[K_RIGHT]:
        x += velocidad
    if teclas[K_UP]:
        y -= velocidad
    if teclas[K_DOWN]:
        y += velocidad

    # Crear rectángulo para el sprite
    sprite_rect = pygame.Rect(x, y, ancho, alto)

    # Verificar colisión con los límites de la pantalla
    if verificar_colision_pantalla(sprite_rect, pantalla_rect):
        # Revertir el movimiento para evitar que el sprite salga de la pantalla
        if x < 0:
            x = 0
        if x + ancho > ANCHO:
            x = ANCHO - ancho
        if y < 0:
            y = 0
        if y + alto > ALTO:
            y = ALTO - alto

    # Limpiar la ventana
    ventana.fill(BLANCO)

    # Dibujar el sprite con el ancho y alto especificados
    sprite_redimensionado = pygame.transform.scale(sprite, (ancho, alto))
    ventana.blit(sprite_redimensionado, (x, y))

    # Dibujar el otro objeto
    pygame.draw.rect(ventana, (255, 0, 0), otro_objeto)

    # Verificar colisión entre el sprite y el otro objeto
    colision, direccion_colision = verificar_colision(sprite_rect, otro_objeto)
    if colision:
        if direccion_colision == "top":
            y = otro_objeto.top - alto
        elif direccion_colision == "bottom":
            y = otro_objeto.bottom
        elif direccion_colision == "left":
            x = otro_objeto.left - ancho
        elif direccion_colision == "right":
            x = otro_objeto.right
    
    #Actualizar UI
    ui_manager.update(reloj.tick(framerate) / 1000.0)
    ui_manager.draw_ui(ventana)
    # Actualizar la pantalla
    pygame.display.flip()

    # Limitar el framerate
    reloj.tick(framerate)

# Finalizar el juego
pygame.quit()
