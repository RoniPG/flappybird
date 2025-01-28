class Pipe {

  constructor(ctx, x, y, height, mode) {
    this.ctx = ctx;
    this.x = x;
    this.vx = 3;
    this.y = y;
    this.height = height;
    this.mode = mode;

    this.img = new Image();
    // iteration 3: load the source checking the mode and setup this.with (must be the image with)
    this.img.src = `assets/img/pipe-${mode}.png`;
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
      this.width = this.img.width;
    }
  }

  draw() {
    if (this.img.isReady) {
      let ySeek = 0;
      // Ajustar la posición vertical de recorte según el modo
      if (this.mode === 'top') {
        ySeek = (this.height > this.img.height) ? 0 : this.img.height - this.height;
      }
      this.ctx.drawImage(
        this.img,
        0,                // Coordenada x de inicio en la imagen
        ySeek,            // Coordenada y de inicio en la imagen
        Math.min(this.img.width, this.width),   // Ancho de recorte de la imagen
        Math.min(this.img.height, this.height), // Alto de recorte de la imagen
        this.x,           // Coordenada x en el canvas
        this.y,           // Coordenada y en el canvas
        this.width,       // Ancho en el canvas
        this.height       // Alto en el canvas
      );
    }
  }

  move() {
    // iteration 3: move the pipe
    this.x -= this.vx;
  }
}
