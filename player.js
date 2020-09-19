class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    var card = this.hand.shift();
    console.log(card);
    return card;
  }

  saveWinsToStorage() {

  }

  updateWinCount() {

  }
}
