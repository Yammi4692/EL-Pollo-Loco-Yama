let canvas;
let ctx;
let bg;

function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  bg = new Background('img/img/5_background/first_half_background.png');

  bg.img.onload = () => {
    draw();
  };
}

function draw() {
  bg.draw(ctx, canvas);
}

init();
