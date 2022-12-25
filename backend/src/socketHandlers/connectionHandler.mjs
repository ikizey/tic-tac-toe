import { queueHandler } from './queueHandler.mjs';
import { lobbyHandler } from './lobbyHandler.mjs';

export const connectionHandler = (client, io) => {
  console.info('client connected: ' + client.id);
  client.emit('welcome', {});

  queueHandler(client);
  lobbyHandler(client, io);
};
