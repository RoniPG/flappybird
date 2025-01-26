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

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;

    // bonus: setup the score
  }
  

  onKeyEvent(event) {
    // iteration 2: link flappy key events
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        // Iteration 1: each 60f clear - move - draw - [next iterations: addPipes - checkCollisions - checkScore]
        this.clear();
        this.draw();
        this.move();
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
  }

  move() {
    // Iteration 1: move the background
    this.background.move();
    // Iteration 2: move the flappy
    // Iteration 3: move the pipes
  }

  addPipes() {
    // Iteration 3: each draw pipes frequency cycles concat a pair of pipes to the pipes array and reset the draw cycle
  }

  randPairOfPipes() {
    const space = this.canvas.height - this.background.footerImg.height;
    const gap = (this.flappybird.height * 2) + this.flappybird.jumpImpulse;
    const topSize = Math.floor(Math.random() * (space - gap) * 0.75)
    const bottomSize = space - topSize - gap;
    // Iteration 3: return two new pipes one at the top and other at the bottom
    return []
  }

  checkCollisions() {
    // Iteration 4: check pipes collisions among flappy and end game if any pipe collides with the bird
  }

  checkScore() {
    // Bonus
  }

  draw() {
    // Iteration 1: draw the background
    this.background.draw();
    // Iteration 2: draw the flappy
    // Iteration 2: draw the pipes
    // Bonus: draw the score

    this.drawPipesCount++;
  }
}
