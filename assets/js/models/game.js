class Game {

  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 384;
    this.canvas.height = 498;
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;

    // iteration 1: setup the background
    this.background = new Background(this.ctx);

    // iteration 2: setup the flappy
    this.flappyBird = new FlappyBird(
      this.ctx,
      70,
      this.canvas.height / 2,
    );

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;

    // bonus: setup the score
  }


  onKeyEvent(event) {
    // iteration 2: link flappy key events
    this.flappyBird.onKeyEvent(event)
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        // Iteration 1: each 60f clear - move - draw - [next iterations: addPipes - checkCollisions - checkScore]
        this.clear();
        this.draw();
        this.move();
        this.addPipes();
        this.checkCollisions();
      }, this.fps);
    }
  }

  stop() {
    // Iteration 1: stop the game
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  restart() {
    // Bonus: restart on demand
  }

  end() {
    // Iteration 4: stop the game and setup score
  }

  clear() {
    // Iteration 1: clean the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width >= 0);
  }

  move() {
    // Iteration 1: move the background
    this.background.move();
    // Iteration 2: move the flappy
    this.flappyBird.move();
    // Iteration 3: move the pipes
    this.pipes.forEach(pipe => pipe.move())
  }

  addPipes() {
    // Iteration 3: each draw pipes frequency cycles concat a pair of pipes to the pipes array and reset the draw cycle
    if (this.flappyBird.sprite.isReady && (this.drawPipesCount % this.pipesFrequency === 0)) {
      this.pipes = this.pipes.concat(this.randPairOfPipes());
      this.drawPipesCount = 0;
    }
  }

  randPairOfPipes() {
    const space = this.canvas.height - this.background.footerImg.height;
    const gap = (this.flappyBird.height * 2) + this.flappyBird.jumpImpulse;
    const topSize = Math.floor(Math.random() * (space - gap) * 0.75)
    const bottomSize = space - topSize - gap;
    // Iteration 3: return two new pipes one at the top and other at the bottom
    return [
      new Pipe(
        this.ctx,
        this.canvas.width,
        0,
        topSize,
        'top'
      ),
      new Pipe(
        this.ctx,
        this.canvas.width,
        this.canvas.height - this.background.footerImg.height - bottomSize,
        bottomSize,
        'bottom'
      ),
    ]
  }

  checkCollisions() {
    // Iteration 4: check pipes collisions among flappy and end game if any pipe collides with the bird
    const pipeCollides = this.pipes.some(pipe => this.flappyBird.collides(pipe));

    if (pipeCollides || this.flappyBird.y + this.flappyBird.height >= this.canvas.height - this.background.footerImg.height) {
      this.stop();
    }
  }

  checkScore() {
    // Bonus
  }

  draw() {
    // Iteration 1: draw the background
    this.background.draw();
    // Iteration 2: draw the flappy
    this.flappyBird.draw();
    // Iteration 3: draw the pipes
    this.pipes.forEach(pipe => pipe.draw());
    // Bonus: draw the score

    this.drawPipesCount++;
  }
}
