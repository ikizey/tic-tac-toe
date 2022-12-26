const CLIENT_EVENT = Object.freeze({
  MOVE: 'move',
  CONCEDE: 'concede',
});

export const gameHandler = (client) => {
  client.on(CLIENT_EVENT.MOVE, ({ index }) => {
    client.gameController.makeMove(client, index);
  });

  client.on(CLIENT_EVENT.CONCEDE, () => client.gameController.concede(client));
};
