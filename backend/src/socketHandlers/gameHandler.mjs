const CLIENT_EVENT = Object.freeze({
  IN_GAME: 'inGame',
  MOVE: 'move',
  CONCEDE: 'concede',
});

export const gameHandler = (client) => {
  client.on(CLIENT_EVENT.IN_GAME, () => {
    client.gameController.onInGame(client.uid);
  });

  client.on(CLIENT_EVENT.MOVE, ({ index }) => {
    client.gameController.makeMove(client, index);
  });

  client.on(CLIENT_EVENT.CONCEDE, () => client.gameController.concede(client));
};
