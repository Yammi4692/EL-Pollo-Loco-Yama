class Player {
  constructor(src, x, y, w, h) {
    this.img = new Image();
    this.img.src = src;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;
  }

  moveRight() {
    this.x += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
