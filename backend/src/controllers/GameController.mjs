import { Game } from '../models/Game.mjs';
import { grid } from '../models/grid.mjs';
import { clientController } from './ClientController.mjs';

const SERVER_EVENT = Object.freeze({
  GAME_BEGINS: 'gameBegins',
  INTRODUCTION: 'introduction',
  TURN: 'turn',
  MOVES: 'moves',
  GAME_OVER: 'gameOver',
});

const MARK = Object.freeze({
  P1: 'X',
  P2: 'O',
  NONE: '',
});

export class GameController {
  #game;
  #players;
  #ready = 0;

  constructor(...clients) {
    if (clients.length !== 2) {
      throw new Error(`wrong amount of clients: ${clients.length}`);
    }
    const game = new Game(...clients);
    this.#game = game;
    this.#players = this.#game.orderedPlayers;
    this.#announce(SERVER_EVENT.GAME_BEGINS, {});
  }

  #announce = (type, data) => {
    this.#players.forEach((player) => {
      player.emit(type, data);
    });
  };

  #isCurrentPlayer = (client) => {
    return client.uid === this.#game.currentPlayer.uid;
  };

  #killGame = () => {
    this.#game = null;
  };

  onInGame = () => {
    //TODO! VERY BAD SOLUTION; REDO
    this.#ready += 1;
    if (this.#ready === 2) {
      this.#startGame();
    }
  };

  #startGame = () => {
    this.#announce(SERVER_EVENT.INTRODUCTION, {
      player1Uid: this.#players[0].uid,
      player1Name: this.#players[0].name,
      player2Uid: this.#players[1].uid,
      player2Name: this.#players[1].name,
    });

    this.#announce(SERVER_EVENT.TURN, {
      playerUid: this.#game.currentPlayer.uid,
    });
  };

  makeMove = (client, index) => {
    if (!this.#isCurrentPlayer(client)) return;
    if (this.#game.gameIsOver) return;

    this.#game.makeMove(index);
    const { p1, p2 } = this.#game.moves;
    const p1moves = [...p1];
    const p2moves = [...p2];
    const moves = [...grid].map((cell) => {
      if (p1moves.includes(cell)) return MARK.P1;
      if (p2moves.includes(cell)) return MARK.P2;
      return MARK.NONE;
    });
    this.#announce(SERVER_EVENT.MOVES, { moves });

    if (this.#game.gameIsOver) {
      this.#announce(SERVER_EVENT.GAME_OVER, {
        playerUid: this.#game.winnerUid,
      });
      this.#killGame();
      return;
    }

    this.#announce(SERVER_EVENT.TURN, {
      playerUid: this.#game.currentPlayer.uid,
    });
  };

  concede = (client) => {
    if (this.#game?.gameIsOver) return;
    this.#game?.concede(client);
    this.#announce(SERVER_EVENT.GAME_OVER, { playerUid: this.#game.winnerUid });
    this.#killGame();
  };
}
