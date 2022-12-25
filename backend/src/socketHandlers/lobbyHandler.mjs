import { clientController } from '../controllers/ClientController.mjs';

const LOBBY_CLIENT_EVENT = Object.freeze({
  IN_LOBBY: 'inLobby',
  IN_QUEUE: 'inQueue',
  OPPONENT_OK: 'opponentOK',
});

const LOBBY_SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  TOTAL_PLAYERS: 'totalPlayers',
  TOTAL_GAMES: 'totalGames',
  IN_QUEUE: 'inQueue',
  QUEUE_ERROR: 'queueError', //
  OPPONENT_FOUND: 'opponentFound',
});

const playerHasValidName = (name) => {
  const len = name.length;
  return len >= 3 && len <= 20;
};

export const lobbyHandler = (client, io) => {
  client.on(LOBBY_CLIENT_EVENT.IN_LOBBY, ({ playerUid, playerName }) => {
    if (!playerHasValidName(playerName)) {
      client.emit(LOBBY_SERVER_EVENT.NO_NAME, {});
      return;
    }
    client.name = playerName;
    client.uid = playerUid;
    clientController.addClient(client);
    io.emit(LOBBY_SERVER_EVENT.TOTAL_PLAYERS, {
      totalPlayers: clientController.totalPlayers,
    });
  });

  client.on(LOBBY_CLIENT_EVENT.IN_QUEUE, ({ playerUid, playerName }) => {
    if (!clientController.isPlayer(playerUid)) {
      client.emit(LOBBY_SERVER_EVENT.NO_NAME, {});
      return;
    }
    client.emit(LOBBY_SERVER_EVENT.IN_QUEUE, {});
  });

  client.on(LOBBY_CLIENT_EVENT.OPPONENT_OK, () => {});
};
