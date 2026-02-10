/**
 * small enemy that walks left
 */
class SmallChicken extends MovableObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super('img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png', x, y, 60, 60);
    this.speed = 0.6;
    this.walkFrames = [
      'img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      'img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      'img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    this.walkImages = [];
    this.walkIndex = 0;
    this.walkTimer = 0;
    this.walkFrames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.walkImages.push(img);
    });
  }

  /**
   * move left
   */
  moveLeft() {
    this.x -= this.speed;
    this.animateWalk();
  }

  /**
   * small walk animation
   */
  animateWalk() {
    if (this.walkImages.length === 0) return;
    this.walkTimer++;
    if (this.walkTimer > 8) {
      this.walkTimer = 0;
      this.walkIndex = (this.walkIndex + 1) % this.walkImages.length;
      this.img = this.walkImages[this.walkIndex];
    }
  }
}
