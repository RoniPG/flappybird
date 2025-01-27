window.addEventListener('load', () => {
  // iteration - 1: create & start the game
    const game = new Game('canvas-game');

    game.start();

  // iteration - 2: add key listeners to the game

  document.addEventListener('keydown', () => {
    game.onKeyEvent(event);
  });
  
  document.addEventListener('keyup', () => {
    game.onKeyEvent(event);
  });

});
