const SERVER_EVENT = Object.freeze({
  LEFT_GAME: 'leftGame',
});

const CLIENT_EVENT = Object.freeze({
  IN_GAME: 'inGame',
  MOVE: 'move',
  LEAVE: 'leave',
  CONCEDE: 'concede',
});

export const gameHandler = (client) => {
  client.on(CLIENT_EVENT.IN_GAME, () => {
    if (!client.gameController) {
      client.emit(SERVER_EVENT.LEFT_GAME, {});
      return;
    }
    client.gameController.onInGame(client.uid);
  });

  client.on(CLIENT_EVENT.MOVE, ({ index }) => {
    if (!client.gameController) {
      client.emit(SERVER_EVENT.LEFT_GAME, {});
      return;
    }
    client.gameController.makeMove(client, index);
  });

  client.on(CLIENT_EVENT.CONCEDE, () => {
    if (!client.gameController) {
      client.emit(SERVER_EVENT.LEFT_GAME, {});
      return;
    }
    client.gameController.concede(client);
  });

  client.on(CLIENT_EVENT.LEAVE, () => {
    client.gameController = null;
    client.emit(SERVER_EVENT.LEFT_GAME, {});
  });
};
