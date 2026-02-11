/**
 * flying bottle
 */
class BottleThrow extends MovableObject {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} dir
   */
  constructor(x, y, dir) {
    super('img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', x, y, 60, 60);
    this.dir = dir;
    this.speed = 4;
    this.vy = -6;
    this.gravity = 0.3;
    this.frames = [
      'img/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    this.images = [];
    this.index = 0;
    this.timer = 0;
    this._load();
  }

  _load() {
    this.frames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.images.push(img);
    });
  }

  update() {
    this.x += this.speed * this.dir;
    this.y += this.vy;
    this.vy += this.gravity;
    this.timer++;
    if (this.timer > 4) {
      this.timer = 0;
      this.index = (this.index + 1) % this.images.length;
      this.img = this.images[this.index];
    }
  }
}
