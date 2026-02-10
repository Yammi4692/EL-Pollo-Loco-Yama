let canvas;
let ctx;
let bg;
let player;
let right = false;
let left = false;
let jump = false;
let chickens = [];
let bgReady = false;

/**
 * start setup
 */
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
  player.setHurtFrames([
    'img/img/2_character_pepe/4_hurt/H-41.png',
    'img/img/2_character_pepe/4_hurt/H-42.png',
    'img/img/2_character_pepe/4_hurt/H-43.png'
  ]);
  player.setSleepFrames([
    'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/img/2_character_pepe/1_idle/long_idle/I-16.png'
  ]);
  chickens = [
    new SmallChicken(520, 360),
    new SmallChicken(720, 360),
    new SmallChicken(940, 360),
    new SmallChicken(1180, 360)
  ];

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

/**
 * wait until images are ready
 */
function waitUntilReady() {
  if (!bgReady || !player.ready) {
    requestAnimationFrame(waitUntilReady);
    return;
  }
  gameLoop();
}

/**
 * handle player vs chicken
 */
function handleChickenHit(chicken) {
  if (chicken.dead) return;
  if (!Collision.hitBox(player, chicken)) return;

  if (Collision.jumpHit(player, chicken)) {
    chicken.die();
    player.vy = -6;
    player.jumping = true;
  } else {
    player.hurt();
  }
}

/**
 * update every frame
 */
function update() {
  if (right) player.moveRight();
  if (left) player.moveLeft();
  if (!left && !right && !player.jumping) player.stopWalk();
  if (jump) player.jump();
  player.updateJump();
  player.updateHurt();
  player.updateIdle(left || right || player.jumping);
  chickens.forEach((ch) => {
    ch.moveLeft();
    handleChickenHit(ch);
  });
}

/**
 * draw stuff
 */
function draw() {
  bg.draw(ctx, canvas);
  player.draw(ctx);
  chickens.forEach((ch) => ch.draw(ctx));
}

/**
 * loop
 */
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

init();
