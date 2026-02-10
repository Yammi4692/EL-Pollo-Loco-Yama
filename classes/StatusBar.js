/**
 * simple status bar
 */
class StatusBar {
  /**
   * @param {string[]} images
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   */
  constructor(images, x, y, w, h) {
    this.images = images;
    this.imgs = [];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.percentage = 100;
    this._loadImages();
  }

  _loadImages() {
    this.images.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.imgs.push(img);
    });
  }

  set(percentage) {
    this.percentage = Math.max(0, Math.min(100, percentage));
  }

  _index() {
    if (this.percentage <= 0) return 0;
    if (this.percentage <= 20) return 1;
    if (this.percentage <= 40) return 2;
    if (this.percentage <= 60) return 3;
    if (this.percentage <= 80) return 4;
    return 5;
  }

  draw(ctx) {
    const img = this.imgs[this._index()];
    if (!img) return;
    ctx.drawImage(img, this.x, this.y, this.w, this.h);
  }
}
