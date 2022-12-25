import { clientController } from '../controllers/ClientController.mjs';

export const disconnectHandler = (client) => {
  client.on('disconnect', () => {
    clientController.removeClient(client.uid);

    console.info('client disconnected: ' + client.uid);
  });
};
