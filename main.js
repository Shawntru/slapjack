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
  if (game.checkBothEmpty())
    window.setTimeout(function() {updateGraphics();}, 1500);
  updateGraphics();
  checkEndGame();
}

function updateGraphics() {
  updateCardCount();
  checkEmptyPlayer();
  updateStackEffect();
  if (checkEmptyCenter()) return;
  updateCentralPile();
}

function checkEndGame() {
  for (var i = 0; i < 2; i++) {
    if (game.players[i].hand.length === 54) game.endGame(i);
  }
  if (game.isRunning === false)
    document.getElementById('title').innerText = `Player ${game.winner + 1} Wins!`;
}

function animate(element, animation) {
  element.classList.toggle(animation);
  setTimeout(function() {
    element.classList.toggle(animation);
  }, 500);
}

function updateCardCount() {
  var countDisplay;
  var handSize;
  var animation;
  for (var i = 0; i < 2; i++) {
    countDisplay = document.getElementById(`${game.players[i].id}-count`);
    handSize = game.players[i].hand.length;
    animation = (countDisplay.innerText > handSize) ? 'big-slap' : 'bump';
    if (!(countDisplay.innerText == handSize)) animate(countDisplay, animation);
    countDisplay.innerText = handSize;
  }
}

function updateStackEffect() {
  var handSize;
  var stackDepth;
  var playerDecklayer;
  for (var i = 0; i < 2; i++) {
    clearStackEffect(i);
    handSize = game.players[i].hand.length;
    stackDepth = Math.floor(handSize * .1);
    playerDeck = document.getElementById(`player-${i}`);
    playerDeck.classList.add(`p${i}-stack-${stackDepth}`);
  }
}

function clearStackEffect(player) {
  var playerDeck = document.getElementById(`player-${player}`);
  for (var i = 0; i < 6; i++) {
    playerDeck.classList.remove(`p${player}-stack-${i}`);
  }
}

function updateWins() {
  var winDisplay;
  var winCount;
  for (var i = 0; i < 2; i++) {
    winDisplay = document.getElementById(`${i}-wins`);
    winCount = localStorage.getItem([i]);
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
  var playerDeck;
  for (var i = 0; i < 2; i++) {
    playerDeck = document.getElementById(`player-${i}`);
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
