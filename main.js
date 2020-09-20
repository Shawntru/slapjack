var game;

window.onload = function() {
  game = new Game;
}

document.onkeydown = keyPress;

function keyPress(key) {
  if (!validKey(key)) return;
  if (key.code === 'KeyQ' && game.playerTurn === 0) game.flipCard(0);
  if (key.code === 'KeyP' && game.playerTurn === 1) game.flipCard(1);
  if (key.code === 'KeyF') game.checkSlap(0);
  if (key.code === 'KeyJ') game.checkSlap(1);
  updateGameState();
}

function validKey(key) {
  var validKeys = ['KeyQ', 'KeyP', 'KeyF', 'KeyJ'];
  return (validKeys.includes(key.code)) ? true : false;
}

function updateGameState() {
  updateGraphic();
//ADD Response here and update for checkSlap
}

function updateGraphic() {
  var image = document.getElementById('center');
  if (!game.centralPile.length) {
    image.src = `./assets/back.png`;
    return;
  }
  var player = game.playerTurn;
  var card = game.centralPile[0];
  image.src = `./assets/${card}.png`;
  image.classList.remove(`player-${player}`);
  image.classList.add(`player-${other(player)}`);
}

function other(player) {
  return (player === 0) ? 1 : 0;
}
