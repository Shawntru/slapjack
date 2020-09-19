var currentGame;

window.onload = function() {
  currentGame = new Game;
  // currentGame.resetGame();
}

document.onkeydown = keyPress;

function keyPress(key) {
  if (key.code === 'KeyQ') player0.playCard('KeyQ');
}
