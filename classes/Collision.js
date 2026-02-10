/**
 * collision helper
 */
class Collision {
  /**
   * @param {object} a
   * @param {object} b
   * @returns {boolean}
   */
  static hitBox(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  /**
   * @param {object} player
   * @param {object} chicken
   * @returns {boolean}
   */
  static jumpHit(player, chicken) {
    return player.vy > 0 && (player.y + player.h) < (chicken.y + chicken.h * 0.6);
  }
}
