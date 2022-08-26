function new2dCanvas(id, width, height) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}

function drawText(text, font, fillStyle, x, y, maxWidth = undefined) {
  if (font) ctx.font = font;
  if (fillStyle) ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y, maxWidth);
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
    this.speed = 10;
    this.segments = [];
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
    const { moving, movementDelay, frame } = state;
    if (frame % movementDelay !== 0) return;
    switch (moving) {
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
    if (
      this.y <= 0 ||
      this.y + this.h >= canvas.height ||
      this.x <= 0 ||
      this.x + this.w >= canvas.width
    )
      state.over = true;
    // if (this.y <= 0) this.y = 0;
    // if (this.y + this.h >= canvas.height) this.y = canvas.height - this.h;
    // if (this.x <= 0) this.x = 0;
    // if (this.x + this.w >= canvas.width) this.x = canvas.width - this.w;
  }
}

class Objective {
  constructor() {
    this.x =
      Math.floor((Math.random() * canvas.width) / 10) * state.segmentSize;
    this.y =
      Math.floor((Math.random() * canvas.height) / 10) * state.segmentSize;
    this.w = state.dropSize;
    this.h = state.dropSize;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
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
  segmentSize: 10,
  over: false,
  moving: DIRECTIONS.RIGHT,
  movementDelay: 20,
  pickupDropInterval: 40,
  dropSize: 5,
  frame: 0,
  objective: null,
  score: 0,
};

window.addEventListener("keydown", (e) => {
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

function handleSnake() {
  state.snake.update();
  state.snake.draw();
}

function handleObjective() {
  if (state.objective === null) state.objective = new Objective();
  state.objective.draw();
  if (
    state.objective.y === state.snake.y &&
    state.objective.x === state.snake.x
  ) {
    state.objective = null;
    state.score++;
  }
}

function handleScore() {
  drawText(state.score, "30px Arial", "darkgreen", canvas.width / 2 - 20, 40);
}

function handleGameOver() {
  drawText(
    "GAME OVER",
    "60px Arial",
    "darkgreen",
    canvas.width / 2 - 200,
    canvas.height / 2
  );
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleSnake();
  handleObjective();
  handleScore();
  state.frame++;
  if (!state.over) requestAnimationFrame(animate);
  else handleGameOver();
})();
