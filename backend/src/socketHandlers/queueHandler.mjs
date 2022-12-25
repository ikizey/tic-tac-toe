import { queueController } from '../controllers/QueueController.mjs';

const QUEUE_EVENTS = Object.freeze({
  ENTER_QUEUE: 'enter-queue',
  LEAVE_QUEUE: 'leave-queue',
});

export const queueHandler = (client) => {
  const onEnterQueue = () => {
    const opponent = queueController.takeFirst(queue);
    if (!opponent) {
      queueController.add(client, queue);
      return;
    }

    //TODO! START GAME
  };

  const onLeaveQueue = () => {
    queueController.remove(client);
  };

  client.on(QUEUE_EVENTS.ENTER_QUEUE, onEnterQueue);
  client.on(QUEUE_EVENTS.LEAVE_QUEUE, onLeaveQueue);
};
