let canvas;
let ctx;
let bg;
let player;
let right = false;
let left = false;
let jump = false;

function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  bg = new Background('img/img/5_background/first_half_background.png');
  player = new Player(
    'img/img/2_character_pepe/1_idle/idle/I-1.png',
    40, 210, 160, 210
  );
  player.setWalkFrames([
    'img/img/2_character_pepe/2_walk/W-21.png',
    'img/img/2_character_pepe/2_walk/W-22.png',
    'img/img/2_character_pepe/2_walk/W-23.png',
    'img/img/2_character_pepe/2_walk/W-24.png',
    'img/img/2_character_pepe/2_walk/W-25.png',
    'img/img/2_character_pepe/2_walk/W-26.png'
  ]);
  player.setJumpFrames([
    'img/img/2_character_pepe/3_jump/J-31.png',
    'img/img/2_character_pepe/3_jump/J-32.png',
    'img/img/2_character_pepe/3_jump/J-33.png',
    'img/img/2_character_pepe/3_jump/J-34.png',
    'img/img/2_character_pepe/3_jump/J-35.png',
    'img/img/2_character_pepe/3_jump/J-36.png',
    'img/img/2_character_pepe/3_jump/J-37.png',
    'img/img/2_character_pepe/3_jump/J-38.png',
    'img/img/2_character_pepe/3_jump/J-39.png'
  ]);
  player.setSleepFrames([
    'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-16.png'
  ]);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') right = true;
    if (e.code === 'ArrowLeft') left = true;
    if (e.code === 'Space') jump = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') right = false;
    if (e.code === 'ArrowLeft') left = false;
    if (e.code === 'Space') jump = false;
  });

  bg.img.onload = () => {
    bgReady = true;
    waitUntilReady();
  };
}

function waitUntilReady() {
  if (!bgReady || !player.ready) {
    requestAnimationFrame(waitUntilReady);
    return;
  }
  gameLoop();
}

function update() {
  if (right) player.moveRight();
  if (left) player.moveLeft();
  if (!left && !right && !player.jumping) player.stopWalk();
  if (jump) player.jump();
  player.updateJump();
  player.updateIdle(left || right || player.jumping);
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
