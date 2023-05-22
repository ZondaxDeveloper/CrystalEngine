def verificar_colision(rect1, rect2):
    """
    Verifica si dos rectángulos se superponen, lo que indica una colisión.
    Devuelve una tupla con el valor booleano de la colisión y la dirección de la colisión.
    """
    colision = rect1.colliderect(rect2)
    if colision:
        direccion_colision = ""
        if rect1.top < rect2.top:
            direccion_colision = "top"
        elif rect1.bottom > rect2.bottom:
            direccion_colision = "bottom"
        elif rect1.left < rect2.left:
            direccion_colision = "left"
        elif rect1.right > rect2.right:
            direccion_colision = "right"
        return colision, direccion_colision
    return colision, None
def verificar_colision_pantalla(rect, pantalla_rect):
    """
    Verifica si un rectángulo colisiona con los límites de la pantalla.
    """
    if not pantalla_rect.contains(rect):
        return True
    return False