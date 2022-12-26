import { disconnectHandler } from './disconnectHandler.mjs';
import { gameHandler } from './gameHandler.mjs';
import { lobbyHandler } from './lobbyHandler.mjs';
import { queueHandler } from './queueHandler.mjs';

export const connectionHandler = (client, io) => {
  console.info('client connected: ' + client.id);
  client.emit('welcome', {});

  disconnectHandler(client);
  gameHandler(client);
  lobbyHandler(client, io);
  queueHandler(client);
};
