class Game {
  constructor() {
    this.centralPile = fullDeck;
    this.playerTurn = 0;
    this.players = [new Player('player0'), new Player('player1')];
    this.dealDeck();
  }

  shuffleDeck(shuffleCards, player) {
    console.log(`Player ${player} gets ${this.centralPile.length} cards!`)
    this.centralPile = [];
    this.players[player].hand = [];
    while (shuffleCards.length > 0) {
      var i = this.getRandomIndex(shuffleCards);
      var card = shuffleCards.splice(i, 1);
      this.players[player].hand.push(card[0]);
    }
    if (this.players[player].hand.length === 54) endGame();
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
    if (!this.canSlap(topCard, player)) return this.endGame();
    if (topCard === 'J' ||topCard === 'W' || topCard === secCard || topCard === thirdCard) {
      var shuffleCards = this.centralPile.concat(this.players[player].hand)
      this.shuffleDeck(shuffleCards, player);
    } else this.penalize(player);
  }

  endGame() {
    var winner;
    (this.players[0].hand.length === 54) ? winner = this.players[0] : winner = this.players[1];
    console.log(`WInner is Player ${winner.id}!`);
  }

  canSlap(topCard, player) {
    var handQuantity = this.players[player].hand.length;
    if (handQuantity > 0) return true;
    else if (handQuantity === 0 && topCard === 'J') return true;
    else return false;
  }

  penalize(player) {
    if (!this.players[player].hand.length) this.endGame();
    var penaltyCard = this.players[player].hand.shift();
    this.players[other(player)].hand.push(penaltyCard);
    console.log(`Player ${player} penalized ${penaltyCard}!`);
  }

  // resetGame(){
  //   this.dealDeck();
  // }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  other(player) {
    return (player === 0) ? 1 : 0;
  }

}
