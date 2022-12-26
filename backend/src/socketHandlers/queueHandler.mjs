import { queueController } from '../controllers/QueueController.mjs';
import { GameController } from '../controllers/GameController.mjs';
import { clientController } from '../controllers/ClientController.mjs';

const CLIENT_EVENT = Object.freeze({
  ENTER_QUEUE: 'enterQueue',
  LEAVE_QUEUE: 'leaveQueue',
});

const SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  IN_QUEUE: 'inQueue',
  OUT_QUEUE: 'outQueue',
  ERROR: 'error',
});

export const queueHandler = (client) => {
  const onEnterQueue = ({ playerUid, playerName }) => {
    if (!clientController.isPlayer(playerUid)) {
      client.emit(SERVER_EVENT.NO_NAME, {});
      return;
    }

    const opponent = queueController.takeFirst();
    if (!opponent) {
      queueController.add(client);
      client.emit(SERVER_EVENT.IN_QUEUE, {});
      return;
    }

    try {
      const gameController = new GameController(client, opponent);
      [client, opponent].forEach((player) => {
        player.gameController = gameController;
      });
      gameController.startGame();
    } catch (error) {
      client.emit(SERVER_EVENT.ERROR, { error: error.message });
    } finally {
      client.emit(SERVER_EVENT.OUT_QUEUE, {});
      opponent.emit(SERVER_EVENT.OUT_QUEUE, {});
    }
  };

  const onLeaveQueue = (client) => {
    queueController.remove(client);
    client.emit(SERVER_EVENT.OUT_QUEUE, {});
  };

  client.on(CLIENT_EVENT.ENTER_QUEUE, ({ playerUid, playerName }) => {
    if (!clientController.isPlayer(playerUid)) {
      client.emit(SERVER_EVENT.NO_NAME, {});
      return;
    }
    onEnterQueue(playerUid, playerName);
  });
  client.on(CLIENT_EVENT.LEAVE_QUEUE, ({ playerUid, playerName }) => {
    if (!clientController.isPlayer(playerUid)) {
      client.emit(SERVER_EVENT.NO_NAME, {});
      return;
    }
    onLeaveQueue(client);
  });
};
