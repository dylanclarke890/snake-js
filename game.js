function new2dCanvas(id, width, height) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}

const [canvas, ctx] = new2dCanvas("play-area", 800, 500);

class Snake {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.w = 10;
    this.h = 10;
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    if (pressingKeys.up) this.y -= this.speed;
    if (pressingKeys.down) this.y += this.speed;
    if (pressingKeys.left) this.x -= this.speed;
    if (pressingKeys.right) this.x += this.speed;
    if (this.y <= 0) this.y = 0;
    if (this.y + this.h >= canvas.height) this.y = canvas.height - this.h;
    if (this.x <= 0) this.x = 0;
    if (this.x + this.w >= canvas.width) this.x = canvas.width - this.w;
  }
}

const state = {
  snake: new Snake(),
  over: false,
};

const pressingKeys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowup":
      pressingKeys.up = true;
      break;
    case "arrowdown":
      pressingKeys.down = true;
      break;
    case "arrowleft":
      pressingKeys.left = true;
      break;
    case "arrowright":
      pressingKeys.right = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowup":
      pressingKeys.up = false;
      break;
    case "arrowdown":
      pressingKeys.down = false;
      break;
    case "arrowleft":
      pressingKeys.left = false;
      break;
    case "arrowright":
      pressingKeys.right = false;
      break;
  }
});

function handlePlayerSquare() {
  state.snake.draw();
  state.snake.update();
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handlePlayerSquare();
  if (!state.over) requestAnimationFrame(animate);
})();
