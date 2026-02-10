/**
 * simple coin
 */
class Coin extends MovableObject {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super('img/img/8_coin/coin_1.png', x, y, 90, 90);
    this.frames = [
      'img/img/8_coin/coin_1.png',
      'img/img/8_coin/coin_2.png'
    ];
    this.images = [];
    this.index = 0;
    this.timer = 0;
    this.collected = false;
    this._load();
  }

  _load() {
    this.frames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.images.push(img);
    });
  }

  animate() {
    if (this.collected) return;
    this.timer++;
    if (this.timer > 8) {
      this.timer = 0;
      this.index = (this.index + 1) % this.images.length;
      this.img = this.images[this.index];
    }
  }

  collect() {
    this.collected = true;
  }
}
