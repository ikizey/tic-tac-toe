class QueueController {
  #queue = [];

  add = (player) => {
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
