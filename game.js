class Game {
  constructor() {
    this.centralPile = fullDeck;
    this.playerTurn = 0;
    this.players = [new Player('0'), new Player('1')];
    this.isRunning = true;
    this.dealDeck();
  }

  shuffle(cards, player) {
    var i = Math.floor(Math.random() * cards.length);;
    var card = cards.splice(i, 1);
    this.players[player].hand.push(card[0])
  }

  shufflePlayerDeck(shuffleCards, player) {
    this.centralPile = [];
    this.players[player].hand = [];
    while (shuffleCards.length > 0) {
      this.shuffle(shuffleCards, player);
    }
  }

  dealDeck() {
    while (this.centralPile.length > 0) {
      this.shuffle(this.centralPile, this.playerTurn);
      this.playerTurn = other(this.playerTurn);
    }
  }

  flipCard(player) {
    var playedCard = this.players[player].playCard();
    this.centralPile.unshift(playedCard);
    if (!this.players[other(player)].hand.length) return;
    this.playerTurn = other(player);
  }

  checkSlap(player) {
    var thirdCard = (this.centralPile.length > 2) ? this.centralPile[2].charAt(0) : undefined;
    var secCard = (this.centralPile.length > 1) ? this.centralPile[1].charAt(0) : undefined;
    var topCard = (this.centralPile.length > 0) ? this.centralPile[0].charAt(0) : undefined;
    var cardMatch = this.matchConditions(topCard, secCard, thirdCard);
    var isJack = (topCard === 'J') ? true : false;
    if (this.jacksOnly() && !isJack) this.awardCenterPile(other(player));
    else if (!isJack && !cardMatch) this.penalize(player);
    else if (topCard === 'J' || cardMatch) this.awardCenterPile(player);
  }

  awardCenterPile(player) {
    var shuffleCards = this.centralPile.concat(this.players[player].hand)
    this.shufflePlayerDeck(shuffleCards, player);
  }

  matchConditions(topCard, secCard, thirdCard) {
    if (topCard === 'W' ||
        topCard === secCard ||
        topCard === thirdCard)
      return true;
  }

  jacksOnly() {
    for (var i = 0; i < 2; i++) {
      if (!this.players[i].hand.length) return true;
    }
  }

  endGame(winner) {
    this.winner = winner;
    this.players[winner].updateWinCount();
    this.isRunning = false;
  }

  penalize(player) {
    var playerHand = this.players[player].hand;
    if (!playerHand.length) this.endGame(other(player));
    var penaltyCard = playerHand.shift();
    this.players[other(player)].hand.push(penaltyCard);
    if (!playerHand.length) this.playerTurn = other(player);
  }

  checkBothEmpty() {
    if (!this.centralPile.length) return;
    var emptyHands = 0;
    var thisGame = this;
    var topCard = this.centralPile[0].charAt(0);
    for (var i = 0; i < 2; i++) {
      if (!this.players[i].hand.length) emptyHands ++;
    }
    if (emptyHands === 2 && !(topCard === 'J')) {
      window.setTimeout(function() {
        thisGame.shufflePlayerDeck(thisGame.centralPile, thisGame.playerTurn);
      }, 1500);
      return true;
    };
  }
}
