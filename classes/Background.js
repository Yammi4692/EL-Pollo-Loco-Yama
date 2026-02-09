class Background {
  constructor(src) {
    this.img = new Image();
    this.img.src = src;
  }

  draw(ctx, canvas) {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
}
