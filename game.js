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
  }

  dealDeck() {
    while (this.centralPile.length > 0) {
      var i = this.getRandomIndex(this.centralPile);
      var card = this.centralPile.splice(i, 1);
      this.players[this.playerTurn].hand.push(card[0]);
      (this.playerTurn === 1) ? this.playerTurn = 0 : this.playerTurn = 1;
    }
  }

  checkSlap(player) {
    if (this.centralPile.length > 2) var thirdCard = this.centralPile[2].charAt(0);
    if (this.centralPile.length > 1) var secCard = this.centralPile[1].charAt(0);
    if (this.centralPile.length > 0) var topCard = this.centralPile[0].charAt(0);
    if (topCard === 'J' ||topCard === 'W' || topCard === secCard || topCard === thirdCard) {
      var shuffleCards = this.centralPile.concat(this.players[player].hand)
      this.shuffleDeck(shuffleCards, player);
    } else this.penalize(player);
  }

  penalize(player) {
    var penaltyCard = this.players[player].hand.shift();
    (player === 0) ? player = 1 : player = 0;
    this.players[player].hand.push(penaltyCard);
    console.log(`Player ${player} penalized ${penaltyCard}!`);
  }

  // resetGame(){
  //   this.dealDeck();
  // }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}
