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
    this.health = 100;
    this.healthBar = new StatusBar([
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
      'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ], 20, 20, 180, 50);
    this.gameOver = false;
    this.gameOverImg = new Image();
    this.gameOverImg.src = 'img/img/9_intro_outro_screens/game_over/game over.png';
    this.jumpHeld = false;
    this.jumpSound = new Audio('assets/audio/character_jumping.mp3');
    this.chickenDieSound = new Audio('assets/audio/dying_chicken.mp3');

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
      this.chickenDieSound.currentTime = 0;
      this.chickenDieSound.play();
    } else {
      if (this.player.hurtCooldown === 0) {
        this.player.hurt();
        this.health -= 20;
        this.healthBar.set(this.health);
        if (this.health <= 0) this.gameOver = true;
      }
    }
  }

  /**
   * update every frame
   */
  update() {
    if (this.gameOver) return;
    if (this.input.right) this.player.moveRight();
    if (this.input.left) this.player.moveLeft();
    if (!this.input.left && !this.input.right && !this.player.jumping) this.player.stopWalk();
    if (this.input.jump && !this.jumpHeld) {
      this.player.jump();
      this.jumpSound.currentTime = 0;
      this.jumpSound.play();
    }
    this.jumpHeld = this.input.jump;
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
    this.healthBar.draw(this.ctx);
    this.player.draw(this.ctx);
    this.chickens.forEach((ch) => ch.draw(this.ctx));
    if (this.gameOver) {
      this.ctx.drawImage(this.gameOverImg, 120, 140, 480, 200);
    }
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
