const state = {
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

function new2dCanvas(id, width, height) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}

const [canvas, ctx] = new2dCanvas("play-area", 800, 500);

function handlePlayerSquare() {
  ctx.fillStyle = "blue";
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 10, 10);
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handlePlayerSquare();
  if (!state.over) requestAnimationFrame(animate);
})();
