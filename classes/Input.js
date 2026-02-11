/**
 * simple input handler
 */
class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.jump = false;
    this.throw = false;
    this._bind();
  }

  _bind() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowRight') this.right = true;
      if (e.code === 'ArrowLeft') this.left = true;
      if (e.code === 'Space') this.jump = true;
      if (e.code === 'KeyD') this.throw = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowRight') this.right = false;
      if (e.code === 'ArrowLeft') this.left = false;
      if (e.code === 'Space') this.jump = false;
      if (e.code === 'KeyD') this.throw = false;
    });
  }
}
