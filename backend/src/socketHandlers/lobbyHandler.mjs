import { clientController } from '../controllers/ClientController.mjs';

const CLIENT_EVENT = Object.freeze({
  IN_LOBBY: 'inLobby',
});

const SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  TOTAL_PLAYERS: 'totalPlayers',
  TOTAL_GAMES: 'totalGames',
  QUEUE_ERROR: 'queueError', //
});

const playerHasValidName = (name) => {
  const len = name.length;
  return len >= 3 && len <= 20;
};

export const lobbyHandler = (client, io) => {
  client.on(CLIENT_EVENT.IN_LOBBY, ({ playerUid, playerName }) => {
    if (!playerHasValidName(playerName)) {
      client.emit(SERVER_EVENT.NO_NAME, {});
      return;
    }
    client.name = playerName;
    client.uid = playerUid;
    clientController.addClient(client);

    io.emit(SERVER_EVENT.TOTAL_PLAYERS, {
      totalPlayers: clientController.totalPlayers,
    });

    io.emit(SERVER_EVENT.TOTAL_GAMES, {
      totalGames: clientController.totalGames,
    });
  });
};
