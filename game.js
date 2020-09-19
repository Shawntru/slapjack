class Game {
  constructor() {
    this.centralPile = [];
    this.playerTurn = 0;
    this.players = [];
    this.resetGame();
  }

  shuffleDeck() {

  }

  dealDeck() {
    while (this.centralPile.length > 0) {
      var i = this.getRandomIndex(this.centralPile);
      var card = this.centralPile.splice(i, 1);
      (this.playerTurn === 1) ? this.playerTurn = 0 : this.playerTurn = 1;
      this.players[this.playerTurn].hand.push(card[0]);
    }
  }

  checkSlap() {

  }

  resetGame(){
    this.centralPile = fullDeck;
    var player0 = new Player('player0');
    var player1 = new Player('player1');
    this.players.push(player0);
    this.players.push(player1);
    this.playerTurn = 0;
    this.dealDeck();
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}
