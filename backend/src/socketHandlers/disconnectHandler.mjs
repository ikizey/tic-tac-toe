import { clientController } from '../controllers/ClientController.mjs';

export const disconnectHandler = (client) => {
  client.on('disconnect', () => {
    //* maybe set timeout, let him reconnect to game, invalidate timer then.
    if (!!client.gameController) {
      client.gameController.concede(client);
    }
    client.gameController = null;

    clientController.removeClient(client.uid);

    console.info('client disconnected: ' + client.uid);
  });
};
