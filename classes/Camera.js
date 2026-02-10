/**
 * simple camera
 */
class Camera {
  constructor() {
    this.x = 0;
  }

  /**
   * @param {Player} player
   * @param {HTMLCanvasElement} canvas
   * @param {number} worldWidth
   */
  follow(player, canvas, worldWidth) {
    const target = player.x - canvas.width / 3;
    const maxX = Math.max(0, worldWidth - canvas.width);
    this.x = Math.max(0, Math.min(target, maxX));
  }
}
