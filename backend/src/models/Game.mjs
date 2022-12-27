import { grid } from './grid.mjs';
/*
0|1|2
-----
3|4|5
-----
6|7|8
*/

const winPositions = [
  new Set([0, 1, 2]),
  new Set([3, 4, 5]),
  new Set([6, 7, 8]),
  new Set([0, 3, 6]),
  new Set([1, 4, 7]),
  new Set([2, 5, 8]),
  new Set([0, 4, 8]),
  new Set([2, 4, 6]),
];

const isSuperset = (set, subset) => {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
};

const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export class Game {
  #players = new Map();
  #p1uid;
  #p2uid;
  #p1moves = new Set();
  #p2moves = new Set();
  #winnerUid = null;

  constructor(...clients) {
    clients.forEach((client) => this.#players.set(client.uid, client));
    const p1uid = getRandomItem(clients).uid;
    const p2uid = clients.filter((player) => player.uid !== p1uid)[0].uid;
    this.#p1uid = p1uid;
    this.#p2uid = p2uid;
  }

  get orderedPlayers() {
    return [this.#players.get(this.#p1uid), this.#players.get(this.#p2uid)];
  }

  get #currentPlayerMoves() {
    return this.currentPlayer.uid === this.#p1uid
      ? this.#p1moves
      : this.#p2moves;
  }

  get #opponentMoves() {
    return this.currentPlayer.uid === this.#p1uid
      ? this.#p2moves
      : this.#p1moves;
  }

  get #allMoves() {
    return new Set([...this.#p1moves, ...this.#p2moves]);
  }

  get #hasWinner() {
    return this.#winnerUid !== null;
  }

  #checkWinner = () => {
    // we check after move is made, so player, who just made a move is opponent now.
    if (this.#opponentMoves.length < 3) return;

    winPositions.forEach((position) => {
      if (isSuperset(this.#opponentMoves, position)) {
        this.#winnerUid = this.opponent;
        return;
      }
    });

    if (this.#allMoves.size === 9) {
      this.#winnerUid = undefined;
      return;
    }
  };

  #getOppositePlayerUid = (playerUid) => {
    return (oppositePlayerUid = this.#players
      .map((player) => player.uid)
      .filter((uid) => uid !== playerUid));
  };

  get gameIsOver() {
    if (this.#hasWinner) return true;

    return false;
  }

  get winner() {
    return this.#players.get(this.#winnerUid);
  }

  get currentPlayer() {
    const movesTotal = this.#allMoves.size;
    console.log(`moves total: ${movesTotal}`);
    const uid = movesTotal % 2 === 0 ? this.#p1uid : this.#p2uid;
    return this.#players.get(uid);
  }

  get opponent() {
    const movesTotal = this.moves.length;
    const uid = movesTotal % 2 !== 0 ? this.#p1uid : this.#p2uid;
    return this.#players.get(uid);
  }

  get moves() {
    return { p1: this.#p1moves, p2: this.#p2moves };
  }

  makeMove = (index) => {
    if (this.#allMoves.has(index)) return;
    if (!grid.includes(index)) return;
    if (this.#hasWinner) return;

    this.#currentPlayerMoves.add(index);
    this.#checkWinner();
  };

  concede = (playerUid) => {
    this.#winnerUid = this.#getOppositePlayerUid(playerUid);
  };
}
