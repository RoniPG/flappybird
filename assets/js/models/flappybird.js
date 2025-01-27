class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 70;
    this.vy = 3;

    this.sprite = new Image();
    this.sprite.src = 'assets/img/bird.png';
    // sprite setup
    this.sprite.isReady = false;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWith;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;
  }

  onKeyEvent(event) {
    const isJumping = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_UP:
        // iteration 2: jump! if necessary =D
      if (!isJumping) {
        this.y -= this.jumpImpulse;
      }
    }
  }

  draw() {
    // draw sprite
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWith,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWith,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height,
      )
      this.drawCount++;
      // animate sprite
      this.animate();
    }
  }

  animate() {
    // iteration 2: configure frame animation
    this.animateFrame(0, 2, 3, 10);
  }

  animateFrame(initVerticalFrame, initHorizontalFrame, segments, frequency) {
    // Paso 1: Verifica si el índice de fotograma vertical actual es diferente del inicial proporcionado.
    if (this.sprite.verticalFrameIndex !== initVerticalFrame) {
      // Si es diferente, establece el índice vertical al valor inicial proporcionado
      this.sprite.verticalFrameIndex = initVerticalFrame;
      // También establece el índice de fotograma horizontal al valor inicial proporcionado
      this.sprite.horizontalFrameIndex = initHorizontalFrame;
    }
    // Paso 2: Si el índice vertical ya es el inicial, verifica si debe actualizarse el fotograma horizontal
    else if (this.drawCount % frequency === 0) {
      // Actualiza el índice horizontal al siguiente fotograma, asegurándose de que se reinicie después de alcanzar el límite (uso de módulo %)
      this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % segments;
      // Reinicia el contador de dibujo para volver a contar los frames hasta el próximo cambio
      this.drawCount = 0;
    }
  }

  move() {
    // iteration 2: move the y
    this.y += this.vy
  }

  collides(element) {
    // iteration 3: check collisions (true|false)
  }
}
