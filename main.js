var game;

window.onload = function() {
  game = new Game;
}

document.onkeydown = keyPress;

function keyPress(key) {
  if (key.code === 'KeyQ' && game.playerTurn === 0) flipCard(0);
  if (key.code === 'KeyP' && game.playerTurn === 1) flipCard(1);
  if (key.code === 'KeyF') game.checkSlap(0);
  if (key.code === 'KeyJ') game.checkSlap(1);
}

function flipCard(player) {
  var playedCard = game.players[player].playCard();
  game.centralPile.unshift(playedCard);
  upgradeGraphic(playedCard, player);
  if (!game.players[other(player)].hand.length) return;
  game.playerTurn = other(player);
}

function upgradeGraphic(card, player) {
  var image = document.getElementById('center');
  image.src = `./assets/${card}.png`;
  image.classList.remove(`player-${other(player)}`);
  image.classList.add(`player-${player}`);
}




function other(player) {
  return (player === 0) ? 1 : 0;
}
