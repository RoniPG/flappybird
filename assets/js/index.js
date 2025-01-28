window.addEventListener('load', () => {
  const startBtn = document.getElementById('restart-btn')

  // iteration - 1: create & start the game
  const game = new Game('canvas-game', () => {
    startBtn.classList.toggle('hidden');
  });

  game.start();

  // iteration - 2: add key listeners to the game

  startBtn.addEventListener('click', () => {
    game.restart();
    startBtn.classList.toggle('hidden');
  })

  document.addEventListener('keydown', () => {
    if (game.drawIntervalId) {
      game.onKeyEvent(event)
    } else {
      startBtn.classList.toggle('hidden');
      game.restart()
    }
  });

  document.addEventListener('keyup', () => {
    game.onKeyEvent(event);
  });

});
