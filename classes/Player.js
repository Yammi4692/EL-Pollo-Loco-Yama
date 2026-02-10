class Player {
  constructor(src, x, y, w, h) {
    super(src, x, y, w, h);
    this.idleImg = this.img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 3;

    this.vy = 0;
    this.gravity = 0.5;
    this.ground = y;
    this.jumping = false;

    this.walkFrames = [];
    this.walkImages = [];
    this.walkIndex = 0;
    this.walkTimer = 0;
    this.isWalking = false;
    this.facing = 'right';
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
    this.facing = 'right';
    this.animateWalk();
  }

  draw(ctx) {
    if (this.facing === 'left') {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, -this.x - this.w, this.y, this.w, this.h);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }
}

