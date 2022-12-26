import { grid } from './grid.mjs';
/*
0|1|2
-----
3|4|5
-----
6|7|8
*/

const winPositions = [
  Set([0, 1, 2]),
  Set([3, 4, 5]),
  Set([6, 7, 8]),
  Set([0, 3, 6]),
  Set([1, 4, 7]),
  Set([2, 5, 8]),
  Set([0, 4, 8]),
  Set([2, 4, 6]),
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

  #checkWinner = () => {
    // we check after move is made, so player, who just made a move is opponent now.
    if (this.#opponentMoves.length < 3) return;

    winPositions.forEach((position) => {
      if (isSuperset(this.#opponentMoves, position)) {
        this.#winnerUid = this.opponent;
        return;
      }
    });

    if (this.#allMoves.length === 9) {
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
    if (this.#winnerUid !== null) return true;

    return false;
  }

  get winner() {
    return this.#players.get(this.#winnerUid);
  }

  get currentPlayer() {
    const movesTotal = this.moves.length;
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
    if (!grid.contains(index)) return;
    if (this.#winnerUid !== null) return;

    this.#currentPlayerMoves.add(index);
    this.#checkWinner();
  };

  concede = (playerUid) => {
    this.#winnerUid = this.#getOppositePlayerUid(playerUid);
  };
}
