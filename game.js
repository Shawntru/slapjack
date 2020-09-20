class Game {
  constructor() {
    this.centralPile = fullDeck;
    this.playerTurn = 0;
    this.players = [new Player('player0'), new Player('player1')];
    this.dealDeck();
  }

  shuffleDeck(shuffleCards, player) {
    this.centralPile = [];
    this.players[player].hand = [];
    while (shuffleCards.length > 0) {
      var i = this.getRandomIndex(shuffleCards);
      var card = shuffleCards.splice(i, 1);
      this.players[player].hand.push(card[0]);
    }
    if (this.players[player].hand.length === 54) this.endGame();
  }

  flipCard(player) {
    var playedCard = this.players[player].playCard();
    this.centralPile.unshift(playedCard);
    if (!this.players[other(player)].hand.length) return;
    this.playerTurn = other(player);
  }

  dealDeck() {
    while (this.centralPile.length > 0) {
      var i = this.getRandomIndex(this.centralPile);
      var card = this.centralPile.splice(i, 1);
      this.players[this.playerTurn].hand.push(card[0]);
      this.playerTurn = other(this.playerTurn);
    }
  }

  checkSlap(player) {
    if (this.centralPile.length > 2) var thirdCard = this.centralPile[2].charAt(0);
    if (this.centralPile.length > 1) var secCard = this.centralPile[1].charAt(0);
    if (this.centralPile.length > 0) var topCard = this.centralPile[0].charAt(0);
    if (this.cantSlap(topCard, player)) return this.endGame();
    if (topCard === 'J' ||topCard === 'W' || topCard === secCard || topCard === thirdCard) {
      var shuffleCards = this.centralPile.concat(this.players[player].hand)
      this.shuffleDeck(shuffleCards, player);
    } else this.penalize(player);
  }

  endGame() {
    var winner = (this.players[0].hand.length) ? 0 : 1;
    this.players[winner].updateWinCount();
    console.log(`WInner is ${this.players[winner].id}!`);
  }

  cantSlap(topCard, player) {
    var handQuantity = this.players[player].hand.length;
    if (handQuantity > 0) return false;
    else if (handQuantity === 0 && topCard === 'J') return false;
    else return true;
  }

  penalize(player) {
    var playerHand = this.players[player].hand;
    if (!playerHand.length) this.endGame();
    var penaltyCard = playerHand.shift();
    this.players[other(player)].hand.push(penaltyCard);
    if (!playerHand.length) this.playerTurn = other(player);
  }

  // resetGame(){
  //   this.dealDeck();
  // }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}
