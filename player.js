class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {

  }

  updateWinCount() {

  }
}
