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
    this.speed = 0;
  }

  /**
   * move left
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
