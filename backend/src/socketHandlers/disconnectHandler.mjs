import { clientController } from '../controllers/ClientController.mjs';

export const disconnectHandler = (client) => {
  client.on('disconnect', () => {
    clientController.removeClient(client.uid);
    client.gameController = null; //* maybe set timeout, let him reconnect to game, invalidate timer then.

    console.info('client disconnected: ' + client.uid);
  });
};
