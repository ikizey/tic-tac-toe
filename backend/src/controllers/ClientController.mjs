class ClientController {
  #clients = new Map(); //* uid : {client, name, status}

  get clients() {
    return [...this.#clients].map((client) => client[1]);
  }

  get players() {
    return [...this.clients.entries()].map((client) => ({
      id: client[1].uid,
      name: client[1].name,
    }));
  }

  addClient = (client) => {
    this.#clients.set(client.uid, client);
  };

  removeClient = (clientUid) => {
    this.#clients.delete(clientUid);
  };

  get totalPlayers() {
    return this.#clients.size;
  }

  isPlayer(playerUid) {
    return !!this.#clients.get(playerUid);
  }
}

export const clientController = new ClientController();
