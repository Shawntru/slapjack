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
  var other = otherPlayer(player);
  var playedCard = game.players[player].playCard();
  console.log(`Player ${player} flips:  ${playedCard}`);
  game.centralPile.unshift(playedCard);
  if (game.players[other].hand.length === 0) return;  
  game.playerTurn = otherPlayer(game.playerTurn);
}

function otherPlayer(player) {
  return (player === 0) ? 1 : 0;
}
