export const connectionHandler = (client, io) => {
  console.info('client connected: ' + client.id);

  client.emit('welcome', {});
};
