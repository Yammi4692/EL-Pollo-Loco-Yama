let canvas;
let ctx;
let bg;
let player;
let right = false;
let left = false;


function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  bg = new Background('img/img/5_background/first_half_background.png');
  player = new Player(
    'img/img/2_character_pepe/1_idle/idle/I-1.png',
    40, 210, 160, 210
  );

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') right = true;
    if (e.code === 'ArrowLeft') left = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') right = false;
    if (e.code === 'ArrowLeft') left = false;
  });

  bg.img.onload = () => {
    bgReady = true;
    if (playerReady) gameLoop();
  };

  player.img.onload = () => {
    playerReady = true;
    if (bgReady) gameLoop();
  };
}

function update() {
  if (right) player.moveRight();
  if (left) player.moveLeft();
}

function draw() {
  bg.draw(ctx, canvas);
  player.draw(ctx);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

init();
