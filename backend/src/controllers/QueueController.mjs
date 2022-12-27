class QueueController {
  #queue = [];

  inQueue = (player) =>
    this.#queue.filter((qPlayer) => qPlayer.uid === player.uid).length !== 0;

  add = (player) => {
    if (inQueue(player)) return;

    this.#queue.unshift(player);
  };

  takeFirst = () => {
    return this.#queue.pop();
  };

  remove = (playerUid) => {
    const index = this.#queue.findIndex((player) => player.uid === playerUid);
    if (index >= -1) {
      this.#queue.splice(index, 1);
    }
  };
}

export const queueController = new QueueController();
