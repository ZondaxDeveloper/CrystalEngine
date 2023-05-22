 // Obtén una referencia al lienzo (canvas)
 const canvas = document.getElementById("gameCanvas");
 const context = canvas.getContext("2d");

 // Definir las propiedades del cuadrado
 const squareSize = 50;
 let squareX = canvas.width / 2 - squareSize / 2;
 let squareY = canvas.height / 2 - squareSize / 2;
 let squareColor = "blue";

 // Variables de control de animación
 let animationFrameId;
 let isAnimating = false;

 // Función para dibujar el cuadrado
 function drawSquare() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.fillStyle = squareColor;
   context.fillRect(squareX, squareY, squareSize, squareSize);
 }

 // Función para actualizar la posición del cuadrado
 function updateSquarePosition(keyCode) {
   const speed = 5;

   // Guardar la posición actual del cuadrado en caso de colisión
   const prevX = squareX;
   const prevY = squareY;

   // Flecha izquierda
   if (keyCode === 37) {
     squareX -= speed;
   }

   // Flecha arriba
   if (keyCode === 38) {
     squareY -= speed;
   }

   // Flecha derecha
   if (keyCode === 39) {
     squareX += speed;
   }

   // Flecha abajo
   if (keyCode === 40) {
     squareY += speed;
   }

   // Comprobar colisiones con los bordes del lienzo
   if (
     squareX <= 0 ||
     squareX + squareSize >= canvas.width ||
     squareY <= 0 ||
     squareY + squareSize >= canvas.height
   ) {
     // Restaurar la posición anterior en caso de colisión
     squareX = prevX;
     squareY = prevY;
   }

   // Cambiar el color del cuadrado si colisiona
   if (
     squareX <= 0 ||
     squareX + squareSize >= canvas.width ||
     squareY <= 0 ||
     squareY + squareSize >= canvas.height
   ) {
     squareColor = "red";

     // Iniciar la animación de cambio de color
     if (!isAnimating) {
       animateColorChange();
     }
   } else {
     // Restaurar el color original del cuadrado
     squareColor = "blue";
     cancelAnimationFrame(animationFrameId);
     isAnimating = false;
   }
 }

 // Función para animar el cambio de color del cuadrado
 function animateColorChange() {
   isAnimating = true;
   let colorChange = 0;
   const colorStep = 1;

   function colorAnimationLoop() {
     colorChange += colorStep;
     squareColor = `rgb(${colorChange}, 0, 0)`;

     if (colorChange < 255) {
       animationFrameId = requestAnimationFrame(colorAnimationLoop);
     } else {
       isAnimating = false;
     }
   }

   animationFrameId = requestAnimationFrame(colorAnimationLoop);
 }

 // Evento para capturar las pulsaciones de teclas
 document.addEventListener("keydown", function(event) {
   updateSquarePosition(event.keyCode);
   drawSquare();
 });

 // Dibujar el cuadrado inicial
 drawSquare();