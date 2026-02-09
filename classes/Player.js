class Player {
  constructor(src, x, y, w, h) {
    this.img = new Image();
    this.img.src = src;
    this.idleImg = this.img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;

    this.walkFrames = [];
    this.walkImages = [];
    this.walkIndex = 0;
    this.walkTimer = 0;
    this.isWalking = false;
  }

  setWalkFrames(frames) {
    this.walkFrames = frames;
    this.walkImages = [];
    frames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.walkImages.push(img);
    });
  }

  moveRight() {
    this.x += this.speed;
    this.isWalking = true;
    this.animateWalk();
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
