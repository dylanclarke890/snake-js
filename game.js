const state = {
  over: false,
};

const pressingKeys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

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
