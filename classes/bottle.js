/**
 * bottle on the ground
 */
class Bottle extends MovableObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super('img/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', x, y, 60, 80);
    this.collected = false;
  }

  collect() {
    this.collected = true;
  }
}
