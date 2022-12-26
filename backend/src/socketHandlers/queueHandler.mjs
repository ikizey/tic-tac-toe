import { queueController } from '../controllers/QueueController.mjs';

const CLIENT_EVENT = Object.freeze({
  ENTER_QUEUE: 'enterQueue',
  LEAVE_QUEUE: 'leaveQueue',
});

const SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  IN_QUEUE: 'inQueue',
  OUT_QUEUE: 'outQueue',
});

client.on(CLIENT_EVENT.IN_QUEUE, ({ playerUid, playerName }) => {
  if (!clientController.isPlayer(playerUid)) {
    client.emit(SERVER_EVENT.NO_NAME, {});
    return;
  }
  client.emit(SERVER_EVENT.IN_QUEUE, {});
});

export const queueHandler = (client) => {
  const onEnterQueue = ({ playerUid, playerName }) => {
    if (!clientController.isPlayer(playerUid)) {
      client.emit(SERVER_EVENT.NO_NAME, {});
      return;
    }
    const opponent = queueController.takeFirst(queue);
    if (!opponent) {
      queueController.add(client, queue);
      client.emit(SERVER_EVENT.IN_QUEUE, {});
      return;
    }

    //TODO! START GAME
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
