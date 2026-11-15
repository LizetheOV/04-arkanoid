const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const state = {
  mode: 'ready',               // 'ready' | 'playing' | 'gameover' | 'won'
  score: 0,
  lives: LIVES,
};

function update() {
  // La lógica del juego se agrega en los pasos siguientes.
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// El bucle arranca solo cuando el atlas ya está cargado.
loadSpritesheet(function () {
  requestAnimationFrame(loop);
});
