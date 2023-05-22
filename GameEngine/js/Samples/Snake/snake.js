// Obtén una referencia al lienzo (canvas)
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Definir las propiedades del juego de Snake
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;
const snake = [{ x: 0, y: 0 }];
let snakeDirection = "right";
let food = generateFood();
let isGameOver = false;


// Función para generar una posición aleatoria para la comida
function generateFood() {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight)
  };
}

// Función para dibujar el juego de Snake
function drawSnake() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "green";

  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }

  context.fillStyle = "red";
  context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Función para mover la serpiente
function moveSnake() {
  const head = { ...snake[0] };

  switch (snakeDirection) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  snake.unshift(head);

  // Verificar si la serpiente ha comido la comida
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  // Verificar colisiones con los bordes y consigo misma
  if (
    head.x < 0 ||
    head.x >= gridWidth ||
    head.y < 0 ||
    head.y >= gridHeight ||
    isSnakeColliding()
  ) {
    // Reiniciar el juego
    snake.length = 1;
    snakeDirection = "right";
    food = generateFood();
  }
}

// Función para verificar si la serpiente colisiona consigo misma
function isSnakeColliding() {
  const head = snake[0];

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
  
}



// Función para cambiar la dirección de la serpiente
function changeSnakeDirection(event) {
  const { keyCode } = event;

  if (keyCode === 37 && snakeDirection !== "right") {
    snakeDirection = "left";
  } else if (keyCode === 38 && snakeDirection !== "down") {
    snakeDirection = "up";
  } else if (keyCode === 39 && snakeDirection !== "left") {
    snakeDirection = "right";
  } else if (keyCode === 40 && snakeDirection !== "up") {
    snakeDirection = "down";
  }
}

// Evento para capturar las pulsaciones de teclas
document.addEventListener("keydown", changeSnakeDirection);

// Función de bucle principal del juego
// Función de bucle principal del juego
function gameLoop() {
    moveSnake();
    drawSnake();

  
    // Esperar 100 milisegundos antes de ejecutar la siguiente iteración
    setTimeout(function() {
      requestAnimationFrame(gameLoop);
    }, 100);
  }

  
  // Iniciar el bucle principal del juego
  gameLoop();
