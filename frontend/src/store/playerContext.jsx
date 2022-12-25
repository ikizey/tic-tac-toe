import React, { createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export const PlayerContext = createContext();

const PLAYER = Object.freeze({
  UID: 'playerUid',
  NAME: 'playerName',
});

const PlayerContextProvider = ({ children }) => {
  const [playerUid, setPlayerUid] = useState('');
  const [playerName, setPlayerName] = useState('');

  const changePlayerName = (name) => {
    setPlayerName(name);
    localStorage.setItem(PLAYER.NAME, name);
  };

  const playerHasValidName = () => {
    const len = playerName.length;
    return len >= 3 && len <= 20;
  };

  useEffect(() => {
    const playerId = localStorage.getItem(PLAYER.UID);
    if (playerId) {
      const nano = nanoid();
      localStorage.setItem(PLAYER.UID, nano);
      setPlayerUid(nano);
    }
    setPlayerName(localStorage.getItem(PLAYER.NAME) || '');
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playerUid,
        playerName,
        changePlayerName,
        playerHasValidName,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
