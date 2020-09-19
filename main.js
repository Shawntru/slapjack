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
  console.log(playedCard);
  game.centralPile.unshift(playedCard);
  game.playerTurn = swapPlayer(game.playerTurn);
  // (game.playerTurn === 1) ? game.playerTurn = 0 : game.playerTurn = 1;}
}

function swapPlayer(player) {
  return (player === 0) ? 1 : 0;
}
