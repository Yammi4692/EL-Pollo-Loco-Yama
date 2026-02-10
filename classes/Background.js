/**
 * background image
 */
class Background {
  /**
   * @param {string} src
   */
  constructor(src) {
    this.img = new Image();
    this.img.src = src;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLCanvasElement} canvas
   */
  draw(ctx, canvas) {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
}
