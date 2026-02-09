let canvas;
let ctx;
let bg;
let player;

function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  bg = new Background('img/img/5_background/first_half_background.png');
  player = new Player(
    'img/img/2_character_pepe/1_idle/idle/I-1.png',
    40, 210, 160, 210
  );

  bg.img.onload = () => {
    draw();
  };
}

function draw() {
  bg.draw(ctx, canvas);
  player.draw(ctx);
}

init();
