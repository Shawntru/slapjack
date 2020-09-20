class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = localStorage.getItem(this.id) || 0;
    this.hand = [];
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    var wins = this.wins.toString();
    localStorage.setItem(this.id, wins);
  }

  updateWinCount() {
    this.wins ++;
    this.saveWinsToStorage();
  }
}
