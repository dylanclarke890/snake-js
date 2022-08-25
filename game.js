function new2dCanvas(id, width, height) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}

const [canvas, ctx] = new2dCanvas("play-area", 800, 500);

class Segment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.w = 10;
    this.h = 10;
    this.speed = 5;
    this.segments = [];
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    switch (state.moving) {
      case DIRECTIONS.LEFT:
        this.x -= this.speed;
        break;
      case DIRECTIONS.RIGHT:
        this.x += this.speed;
        break;
      case DIRECTIONS.UP:
        this.y -= this.speed;
        break;
      case DIRECTIONS.DOWN:
        this.y += this.speed;
        break;
      default:
        break;
    }
    if (this.y <= 0) this.y = 0;
    if (this.y + this.h >= canvas.height) this.y = canvas.height - this.h;
    if (this.x <= 0) this.x = 0;
    if (this.x + this.w >= canvas.width) this.x = canvas.width - this.w;
  }
}

const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

const state = {
  snake: new Snake(),
  over: false,
  moving: DIRECTIONS.RIGHT,
};

window.addEventListener("keydown", (e) => {
  console.log(state.moving);
  switch (e.key.toLowerCase()) {
    case "arrowup":
      state.moving = DIRECTIONS.UP;
      break;
    case "arrowdown":
      state.moving = DIRECTIONS.DOWN;
      break;
    case "arrowleft":
      state.moving = DIRECTIONS.LEFT;
      break;
    case "arrowright":
      state.moving = DIRECTIONS.RIGHT;
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
