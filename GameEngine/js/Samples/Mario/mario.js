// Obtén una referencia al lienzo (canvas)
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Definir las propiedades de Mario
const marioWidth = 30;
const marioHeight = 20;
let marioX = canvas.width - marioWidth;
let marioY = canvas.height - marioHeight;
let marioColor = "red";

// Definir las propiedades de la columna
const columnWidth = 70;
const columnHeight = 50;
const columnX = canvas.width / 2 - columnWidth / 2;
const columnY = canvas.height - columnHeight;
const columnColor = "green";
//Columna nuvel 2
const columnWidth2 = 100;
const columnHeight2 = 50;
const columnX2 = canvas.width / 5 - columnWidth2 / 1;
const columnY2 = canvas.height / 4 - columnHeight2 / 2;
const columnColor2 = "green";

// Variables de control de movimiento de Mario
let isMovingLeft = false;
let isMovingRight = false;
let isJumping = false;
let jumpForce = 12;
let jumpSpeed = 0;
let jumpCount = 0;

// Función para dibujar Mario
function drawMario() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = marioColor;
  context.fillRect(marioX, marioY, marioWidth, marioHeight);
}

// Función para dibujar la columna
function drawColumn() {
  context.fillStyle = columnColor;
  context.fillRect(columnX, columnY, columnWidth, columnHeight);
}
function drawColumn2() {
    context.fillStyle = columnColor;
    context.fillRect(columnX2, columnY2, columnWidth2, columnHeight2);
  }

// Función para actualizar la posición de Mario
function updateMarioPosition() {
  if (isMovingLeft) {
    if (marioX > 0) {
      marioX -= 5;
    }
  }

  if (isMovingRight) {
    if (marioX + marioWidth < canvas.width) {
      marioX += 5;
    }
  }

  // Aplicar gravedad y salto
  if (isJumping) {
    marioY -= jumpSpeed;
    jumpSpeed -= 0.5;

    if (jumpSpeed <= 0) {
      isJumping = false;
      jumpSpeed = jumpForce;
      jumpCount++;

      // Regenerar saltos después del segundo salto
      if (jumpCount >= 2) {
        jumpCount = 0;
      }
    }
  } else {
    if (marioY < canvas.height - marioHeight) {
      marioY += 2;
    }
  }

  // Comprobar colisiones con la columna
  if (
    marioY + marioHeight >= columnY &&
    marioY <= columnY + columnHeight &&
    marioX + marioWidth >= columnX &&
    marioX <= columnX + columnWidth

    
  )
   {
    //Restaurar la posición anterior en caso de colisión
    if (marioX + marioWidth > columnX + columnWidth / 2) {
      marioX = columnX - columnWidth;
    } else {
      marioX = columnX - marioWidth;
    }
    
  }
  if(
    marioY + marioHeight >= columnY2 &&
    marioY <= columnY2 + columnHeight2 &&
    marioX + marioWidth >= columnX2 &&
    marioX <= columnX2 + columnWidth2
  )
    

  // Comprobar colisiones con el suelo
  if (marioY >= canvas.height - marioHeight) {
    marioY = canvas.height - marioHeight;
    jumpCount = 0;
  }

  drawMario();
  drawColumn();
  drawColumn2();

  requestAnimationFrame(updateMarioPosition);
}

// Eventos de teclado para controlar el movimiento de Mario
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37) {
    isMovingLeft = true;
  }

  if (event.keyCode === 39) {
    isMovingRight = true;
  }

  if (event.keyCode === 32 && !isJumping && jumpCount < 2) {
    isJumping = true;
    jumpSpeed = jumpForce;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 37) {
    isMovingLeft = false;
  }

  if (event.keyCode === 39) {
    isMovingRight = false;
  }
});

// Dibujar Mario y la columna inicialmente
drawMario();
drawColumn();
drawColumn2();

// Iniciar la actualización de la posición de Mario
updateMarioPosition();
