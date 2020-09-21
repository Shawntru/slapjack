var game;

var centerImage = document.getElementById('center');

window.onload = function() {
  game = new Game;
  updateWins();
}

document.onkeydown = keyPress;

function keyPress(key) {
  if (!game.isRunning) return;
  if ((key.code === 'KeyQ' && game.playerTurn === 0) ||
      (key.code === 'KeyP' && game.playerTurn === 1)) updateGameState('flip');
  if (key.code === 'KeyF') updateGameState('slap', 0);
  if (key.code === 'KeyJ') updateGameState('slap', 1);
}

function updateGameState(action, player) {
  if (action === 'flip') game.flipCard(game.playerTurn);
  if (action === 'slap') {
    game.checkSlap(player);
    animate(centerImage, 'slap');
  }
  updateGraphics();
  checkEndGame();
}

function animate(element, animation) {
  element.classList.toggle(animation);
  setTimeout(function() {
    element.classList.toggle(animation);
  }, 333);
}

function checkEndGame() {
  for (var i = 0; i < 2; i++) {
    if (game.players[i].hand.length === 54) game.endGame([i]);
  }
  if (game.isRunning === false)
    document.getElementById('title').innerText = `Player ${game.winner + 1} Wins!`;
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
    var handSize = game.players[i].hand.length;
    var animation = (countDisplay.innerText > handSize) ? 'big-slap' : 'bump';
    if (!(countDisplay.innerText == handSize)) animate(countDisplay, animation);
    countDisplay.innerText = handSize;
  }
}

function updateWins() {
  for (var i = 0; i < 2; i++) {
    var winDisplay = document.getElementById(`${i}-wins`);
    var winCount = localStorage.getItem([i]);
    if (winCount) winDisplay.innerText = `Wins:  ${winCount}`;
  }
}

function updateCentralPile() {
  var card = game.centralPile[0];
  centerImage.src = `./assets/${card}.png`;
  centerImage.classList.add(`player-${other(game.playerTurn)}`);
  centerImage.classList.remove(`player-${game.playerTurn}`);
  var degrees = (Math.random() * 6 - 3);
  centerImage.style.transform = `scale(1.3) rotate(${degrees}deg)`;
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
    centerImage.style.transform = 'scale(1.3) rotate(0deg)';
    return true;
  } else centerImage.classList.remove('empty-stack');
}

function other(player) {
  return (player === 0) ? 1 : 0;
}
