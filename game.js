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
    this.w = settings.segmentSize;
    this.h = settings.segmentSize;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Snake {
  constructor() {
    this.speed = settings.segmentSize;
    this.segments = [new Segment(canvas.width / 2, canvas.height / 2)];
  }

  draw() {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].draw();
    }
  }

  update() {
    const { moving, frame } = state;
    if (frame % settings.movementDelay !== 0) return;

    const move = {
      x: 0,
      y: 0,
    };
    switch (moving) {
      case DIRECTIONS.LEFT:
        move.x -= this.speed;
        break;
      case DIRECTIONS.RIGHT:
        move.x += this.speed;
        break;
      case DIRECTIONS.UP:
        move.y -= this.speed;
        break;
      case DIRECTIONS.DOWN:
        move.y += this.speed;
        break;
      default:
        break;
    }

    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].x += move.x;
      this.segments[i].y += move.y;
    }

    // if (
    //   this.y <= 0 ||
    //   this.y + this.h >= canvas.height ||
    //   this.x <= 0 ||
    //   this.x + this.w >= canvas.width
    // )
    //   state.over = true;
  }

  addSegment() {
    const lastSegment = this.segments[this.segments.length - 1];
    this.segments.push(
      new Segment(
        lastSegment.x + settings.segmentSize,
        lastSegment.y + settings.segmentSize
      )
    );
  }
}

class Objective {
  constructor() {
    this.x =
      Math.floor((Math.random() * canvas.width) / 10) * settings.segmentSize;
    this.y =
      Math.floor((Math.random() * canvas.height) / 10) * settings.segmentSize;
    this.w = settings.dropSize;
    this.h = settings.dropSize;
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

const settings = {
  segmentSize: 10,
  movementDelay: 20,
  dropSize: 5,
};

const state = {
  snake: new Snake(),
  over: false,
  moving: DIRECTIONS.RIGHT,
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
    state.snake.segments.some(
      (segment) =>
        state.objective.y === segment.y && state.objective.x === segment.x
    )
  ) {
    state.objective = null;
    state.snake.addSegment();
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
