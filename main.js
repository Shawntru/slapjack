var game;

var centerImage = document.getElementById('center');

window.onload = function() {
  game = new Game;
  updateCardCount();
}

document.onkeydown = keyPress;

function keyPress(key) {
  if ((key.code === 'KeyQ' && game.playerTurn === 0) ||
      (key.code === 'KeyP' && game.playerTurn === 1)) updateGameState('flip');
  if (key.code === 'KeyF') updateGameState('slap', 0);
  if (key.code === 'KeyJ') updateGameState('slap', 1);
}

function updateGameState(action, player) {
  if (action === 'flip') game.flipCard(game.playerTurn);
  if (action === 'slap') game.checkSlap(player);
  updateGraphics();
}

function updateGraphics() {
  updateCardCount();
  checkEmptyPlayer();
  if (checkEmptyCenter()) return;
  updateCentralPile();
}

function updateCardCount(){
  for (var i = 0; i < 2; i++) {
    var countDisplay = document.getElementById(`${game.players[i].id}-count`);
    countDisplay.innerText = game.players[i].hand.length;
  }
}

function updateCentralPile() {
  var card = game.centralPile[0];
  centerImage.src = `./assets/${card}.png`;
  centerImage.classList.add(`player-${other(game.playerTurn)}`);
  centerImage.classList.remove(`player-${game.playerTurn}`);
}

function checkEmptyPlayer() {
  for (var i = 0; i < 2; i++) {
    var playerDeck = document.getElementById(`player-${i}`);
    if (!game.players[i].hand.length) playerDeck.classList.add('empty-stack');
    else playerDeck.classList.remove('empty-stack');
  }
}

function checkEmptyCenter() {
  if (!game.centralPile.length) {
    centerImage.src = `./assets/back.png`;
    centerImage.classList.add('empty-stack');
    return true;
  } else centerImage.classList.remove('empty-stack');
}

function other(player) {
  return (player === 0) ? 1 : 0;
}
