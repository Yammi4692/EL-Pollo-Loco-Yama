/**
 * main character
 */
class Player extends MovableObject {
  /**
   * @param {string} src
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   */
  constructor(src, x, y, w, h) {
    super(src, x, y, w, h);
    this.idleImg = this.img;
    this.ready = false;
    this._readyCount = 0;
    this._readyNeeded = 3;
    this.img.onload = () => this._markReady();
    this.speed = 3;

    this.vy = 0;
    this.gravity = 0.5;
    this.ground = y;
    this.jumping = false;

    this.walkFrames = [];
    this.walkImages = [];
    this.walkIndex = 0;
    this.walkTimer = 0;
    this.isWalking = false;
    this.facing = 'right';

    this.jumpFrames = [];
    this.jumpImages = [];
    this.jumpIndex = 0;
    this.jumpTimer = 0;

    this.hurtFrames = [];
    this.hurtImages = [];
    this.hurtIndex = 0;
    this.hurtTimer = 0;
    this.hurting = false;
    this.hurtCooldown = 0;
    this.hurtFlash = 0;

    this.sleepFrames = [];
    this.sleepImages = [];
    this.sleepIndex = 0;
    this.sleepTimer = 0;
    this.idleCounter = 0;
    this.isSleeping = false;
  }

  /**
   * @param {string[]} frames
   */
  setWalkFrames(frames) {
    this.walkFrames = frames;
    this.walkImages = [];
    frames.forEach((src, i) => {
      let img = new Image();
      img.src = src;
      if (i === 0) img.onload = () => this._markReady();
      this.walkImages.push(img);
    });
  }

  /**
   * @param {string[]} frames
   */
  setJumpFrames(frames) {
    this.jumpFrames = frames;
    this.jumpImages = [];
    frames.forEach((src, i) => {
      let img = new Image();
      img.src = src;
      if (i === 0) img.onload = () => this._markReady();
      this.jumpImages.push(img);
    });
  }

  /**
   * @param {string[]} frames
   */
  setHurtFrames(frames) {
    this.hurtFrames = frames;
    this.hurtImages = [];
    frames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.hurtImages.push(img);
    });
  }

  /**
   * @param {string[]} frames
   */
  setSleepFrames(frames) {
    this.sleepFrames = frames;
    this.sleepImages = [];
    frames.forEach((src) => {
      let img = new Image();
      img.src = src;
      this.sleepImages.push(img);
    });
  }

  /**
   * internal ready counter
   */
  _markReady() {
    this._readyCount++;
    if (this._readyCount >= this._readyNeeded) this.ready = true;
  }

  /**
   * move right
   */
  moveRight() {
    this.x += this.speed;
    this.isWalking = true;
    this.facing = 'right';
    if (!this.jumping && !this.hurting) this.animateWalk();
  }

  /**
   * move left
   */
  moveLeft() {
    this.x -= this.speed;
    this.isWalking = true;
    this.facing = 'left';
    if (!this.jumping && !this.hurting) this.animateWalk();
  }

  /**
   * jump
   */
  jump() {
    if (this.jumping) return;
    this.vy = -10;
    this.jumping = true;
    if (this.jumpImages[0]) this.img = this.jumpImages[0];
  }

  /**
   * start hurt animation
   */
  hurt() {
    if (this.hurtCooldown > 0) return;
    if (this.hurtImages.length === 0) return;
    this.hurting = true;
    this.hurtIndex = 0;
    this.hurtTimer = 0;
    this.hurtCooldown = 40;
    this.img = this.hurtImages[0];
  }

  /**
   * stop walking
   */
  stopWalk() {
    if (this.isSleeping || this.hurting) return;
    this.isWalking = false;
    this.walkIndex = 0;
    this.walkTimer = 0;
    this.img = this.idleImg;
  }

  /**
   * update jump physics
   */
  updateJump() {
    if (!this.jumping) return;
    this.y += this.vy;
    this.vy += this.gravity;

    this.jumpTimer++;
    if (this.jumpTimer > 6 && this.jumpImages.length > 0) {
      this.jumpTimer = 0;
      this.jumpIndex = (this.jumpIndex + 1) % this.jumpImages.length;
      this.img = this.jumpImages[this.jumpIndex];
    }

    if (this.y >= this.ground) {
      this.y = this.ground;
      this.vy = 0;
      this.jumping = false;
      this.jumpIndex = 0;
      this.jumpTimer = 0;
      if (!this.isWalking) this.img = this.idleImg;
    }
  }

  /**
   * update hurt animation
   */
  updateHurt() {
    if (this.hurtCooldown > 0) this.hurtCooldown--;
    if (!this.hurting) return;
    this.hurtFlash++;

    this.hurtTimer++;
    if (this.hurtTimer > 6 && this.hurtImages.length > 0) {
      this.hurtTimer = 0;
      this.hurtIndex++;
      if (this.hurtIndex >= this.hurtImages.length) {
        this.hurting = false;
        this.hurtIndex = 0;
        this.hurtFlash = 0;
        if (!this.isWalking && !this.jumping) this.img = this.idleImg;
        return;
      }
      this.img = this.hurtImages[this.hurtIndex];
    }
  }

  /**
   * idle + sleep logic
   * @param {boolean} isMoving
   */
  updateIdle(isMoving) {
    if (this.hurting) return;
    if (isMoving) {
      this.idleCounter = 0;
      this.sleepIndex = 0;
      this.sleepTimer = 0;
      this.isSleeping = false;
      return;
    }

    this.idleCounter++;
    if (this.idleCounter > 300) {
      this.isSleeping = true;
      this.animateSleep();
    }
  }

  /**
   * sleep animation
   */
  animateSleep() {
    if (this.sleepImages.length === 0) return;
    this.sleepTimer++;
    if (this.sleepTimer > 6) {
      this.sleepTimer = 0;
      this.sleepIndex = (this.sleepIndex + 1) % this.sleepImages.length;
      this.img = this.sleepImages[this.sleepIndex];
    }
  }

  /**
   * walk animation
   */
  animateWalk() {
    if (this.walkImages.length === 0) return;
    this.walkTimer++;
    if (this.walkTimer > 6) {
      this.walkTimer = 0;
      this.walkIndex = (this.walkIndex + 1) % this.walkImages.length;
      this.img = this.walkImages[this.walkIndex];
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.facing === 'left') {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, -this.x - this.w, this.y, this.w, this.h);
      ctx.restore();
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }
}
