var game;

var centerImage = document.getElementById('center');

window.onload = function() {
  game = new Game;
}

document.onkeydown = keyPress;

function keyPress(key) {
  if (key.code === 'KeyQ' && game.playerTurn === 0) playerFlip(0);
  if (key.code === 'KeyP' && game.playerTurn === 1) playerFlip(1);
  if (key.code === 'KeyF') playerSlap(0);
  if (key.code === 'KeyJ') playerSlap(1);
}

function playerFlip(player) {
  game.flipCard(player);
  updateGraphic(player);
  console.log(`Player ${player} hand size:  ${game.players[player].hand.length}`);
}

function playerSlap(player) {
  game.checkSlap(player);
  updateGraphic(player);
  console.log(`Player ${player} hand size:  ${game.players[player].hand.length}`);
}

function updateGraphic(player) {
  updateCardCount();
  if (checkEmptyPiles(player)) return;
  toggleHighlight(player);
}

function updateCardCount(){
  for (var i = 0; i < 2; i++) {
    var countDisplay = document.getElementById(`${game.players[i].id}-count`);
    countDisplay.innerText = game.players[i].hand.length;
  }
}

function toggleHighlight(player) {
  var card = game.centralPile[0];
  centerImage.src = `./assets/${card}.png`;
  centerImage.classList.remove(`player-${other(player)}`);
  centerImage.classList.add(`player-${player}`);
}

function checkEmptyPiles() {
  for (var i = 0; i < 2; i++) {
    var playerDeck = document.getElementById(`player-${i}`);
    if (!game.players[i].hand.length) {
      playerDeck.classList.add('empty-stack');
      console.log(playerDeck);
    }
    else playerDeck.classList.remove('empty-stack');
  }
  if (!game.centralPile.length) {
    centerImage.src = `./assets/back.png`;
    centerImage.classList.add('empty-stack');
    return true;
  } else centerImage.classList.remove('empty-stack');

}

function other(player) {
  return (player === 0) ? 1 : 0;
}
