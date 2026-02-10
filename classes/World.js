/**
 * game world
 */
class World {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bgReady = false;

    this.bg = new Background('img/img/5_background/first_half_background.png');
    this.player = new Player(
      'img/img/2_character_pepe/1_idle/idle/I-1.png',
      40, 210, 160, 210
    );
    this.player.setWalkFrames([
      'img/img/2_character_pepe/2_walk/W-21.png',
      'img/img/2_character_pepe/2_walk/W-22.png',
      'img/img/2_character_pepe/2_walk/W-23.png',
      'img/img/2_character_pepe/2_walk/W-24.png',
      'img/img/2_character_pepe/2_walk/W-25.png',
      'img/img/2_character_pepe/2_walk/W-26.png'
    ]);
    this.player.setJumpFrames([
      'img/img/2_character_pepe/3_jump/J-31.png',
      'img/img/2_character_pepe/3_jump/J-32.png',
      'img/img/2_character_pepe/3_jump/J-33.png',
      'img/img/2_character_pepe/3_jump/J-34.png',
      'img/img/2_character_pepe/3_jump/J-35.png',
      'img/img/2_character_pepe/3_jump/J-36.png',
      'img/img/2_character_pepe/3_jump/J-37.png',
      'img/img/2_character_pepe/3_jump/J-38.png',
      'img/img/2_character_pepe/3_jump/J-39.png'
    ]);
    this.player.setHurtFrames([
      'img/img/2_character_pepe/4_hurt/H-41.png',
      'img/img/2_character_pepe/4_hurt/H-42.png',
      'img/img/2_character_pepe/4_hurt/H-43.png'
    ]);
    this.player.setSleepFrames([
      'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/img/2_character_pepe/1_idle/long_idle/I-16.png'
    ]);

    this.chickens = [
      new SmallChicken(520, 360),
      new SmallChicken(720, 360),
      new SmallChicken(940, 360),
      new SmallChicken(1180, 360)
    ];

    this.input = new Input();

    this.bg.img.onload = () => {
      this.bgReady = true;
      this.waitUntilReady();
    };
  }

  /**
   * wait until images are ready
   */
  waitUntilReady() {
    if (!this.bgReady || !this.player.ready) {
      requestAnimationFrame(() => this.waitUntilReady());
      return;
    }
    this.gameLoop();
  }

  /**
   * handle player vs chicken
   * @param {SmallChicken} chicken
   */
  handleChickenHit(chicken) {
    if (chicken.dead) return;
    if (!Collision.hitBox(this.player, chicken)) return;

    if (Collision.jumpHit(this.player, chicken)) {
      chicken.die();
      this.player.vy = -6;
      this.player.jumping = true;
    } else {
      this.player.hurt();
    }
  }

  /**
   * update every frame
   */
  update() {
    if (this.input.right) this.player.moveRight();
    if (this.input.left) this.player.moveLeft();
    if (!this.input.left && !this.input.right && !this.player.jumping) this.player.stopWalk();
    if (this.input.jump) this.player.jump();
    this.player.updateJump();
    this.player.updateHurt();
    this.player.updateIdle(this.input.left || this.input.right || this.player.jumping);
    this.chickens.forEach((ch) => {
      ch.moveLeft();
      this.handleChickenHit(ch);
    });
  }

  /**
   * draw stuff
   */
  draw() {
    this.bg.draw(this.ctx, this.canvas);
    this.player.draw(this.ctx);
    this.chickens.forEach((ch) => ch.draw(this.ctx));
  }

  /**
   * loop
   */
  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}
