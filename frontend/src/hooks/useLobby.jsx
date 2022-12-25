import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config';
import { PlayerContext } from '../store/playerContext';

const LOBBY_EVENT = Object.freeze({
  NO_NAME: 'noName',
  TOTAL_PLAYERS: 'totalPlayers',
  TOTAL_GAMES: 'totalGames',
  IN_QUEUE: 'inQueue',
  QUEUE_ERROR: 'queueError',
  OPPONENT_FOUND: 'opponentFound',
});

const EMIT = Object.freeze({
  IN_LOBBY: 'inLobby',
  IN_QUEUE: 'inQueue',
  OPPONENT_OK: 'opponentOK',
});

const useLobby = () => {
  const { playerUid, playerName } = useContext(PlayerContext);

  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [isInQueue, setIsInQueue] = useState(false);

  const navigate = useNavigate();

  const inLobby = () => {
    socket.emit(EMIT.IN_LOBBY, { playerUid, playerName });
  };

  const goQueue = () => {
    socket.emit(EMIT.IN_QUEUE, { playerUid, playerName });
  };

  const opponentOK = () => {
    socket.emit(EMIT.OPPONENT_OK, {});
  };

  useEffect(() => {
    socket.on(LOBBY_EVENT.NO_NAME, () => {
      navigate('/');
    });

    socket.on(LOBBY_EVENT.TOTAL_PLAYERS, ({ totalPlayers }) => {
      setTotalPlayers(totalPlayers);
    });

    socket.on(LOBBY_EVENT.TOTAL_GAMES, ({ totalGames }) => {
      setTotalGames(totalGames);
    });

    socket.on(LOBBY_EVENT.IN_QUEUE, () => {
      setIsInQueue(true);
    });

    socket.on(LOBBY_EVENT.QUEUE_ERROR, () => {
      setIsInQueue(false);
      //TODO! show some message
    });
    socket.on(LOBBY_EVENT.OPPONENT_FOUND, () => {
      opponentOK();
    });

    return () => {
      socket.off(LOBBY_EVENT.NO_NAME);
      socket.off(LOBBY_EVENT.TOTAL_PLAYERS);
      socket.off(LOBBY_EVENT.TOTAL_GAMES);
      socket.off(LOBBY_EVENT.IN_QUEUE);
      socket.off(LOBBY_EVENT.QUEUE_ERROR);
      socket.off(LOBBY_EVENT.OPPONENT_FOUND);
    };
  }, []);

  return {
    totalPlayers,
    totalGames,
    goQueue,
    isInQueue,
  };
};

export default useLobby;
