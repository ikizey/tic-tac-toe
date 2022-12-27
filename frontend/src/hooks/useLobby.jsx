import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config';
import { PlayerContext } from '../store/playerContext';

const SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  TOTAL_PLAYERS: 'totalPlayers',
  TOTAL_GAMES: 'totalGames',
  IN_QUEUE: 'inQueue',
  OUT_QUEUE: 'outQueue',
  QUEUE_ERROR: 'queueError',
  GAME_BEGINS: 'gameBegins',
});

const CLIENT_EVENT = Object.freeze({
  IN_LOBBY: 'inLobby',
  ENTER_QUEUE: 'enterQueue',
  LEAVE_QUEUE: 'leaveQueue',
});

const useLobby = () => {
  const { playerUid, playerName } = useContext(PlayerContext);

  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [isInQueue, setIsInQueue] = useState(false);

  const navigate = useNavigate();

  const enterQueue = () => {
    socket.emit(CLIENT_EVENT.ENTER_QUEUE, { playerUid, playerName });
  };

  const leaveQueue = () => {
    socket.emit(CLIENT_EVENT.LEAVE_QUEUE, { playerUid, playerName });
  };

  useEffect(() => {
    socket.emit(CLIENT_EVENT.IN_LOBBY, { playerUid, playerName });

    socket.on(SERVER_EVENT.NO_NAME, () => {
      navigate('/');
    });

    socket.on(SERVER_EVENT.TOTAL_PLAYERS, ({ totalPlayers }) => {
      setTotalPlayers(totalPlayers);
    });

    socket.on(SERVER_EVENT.TOTAL_GAMES, ({ totalGames }) => {
      setTotalGames(Math.floor(totalGames));
    });

    socket.on(SERVER_EVENT.IN_QUEUE, () => {
      setIsInQueue(true);
    });

    socket.on(SERVER_EVENT.QUEUE_ERROR, () => {
      setIsInQueue(false);
      //TODO! show some message
    });

    socket.on(SERVER_EVENT.OUT_QUEUE, () => {
      setIsInQueue(false);
    });

    socket.on(SERVER_EVENT.GAME_BEGINS, () => {
      navigate('/game');
    });

    return () => {
      socket.off(SERVER_EVENT.NO_NAME);
      socket.off(SERVER_EVENT.TOTAL_PLAYERS);
      socket.off(SERVER_EVENT.TOTAL_GAMES);
      socket.off(SERVER_EVENT.IN_QUEUE);
      socket.off(SERVER_EVENT.QUEUE_ERROR);
      socket.off(SERVER_EVENT.OUT_QUEUE);
      socket.off(SERVER_EVENT.GAME_BEGINS);
    };
  }, []);

  return {
    totalPlayers,
    totalGames,
    enterQueue,
    leaveQueue,
    isInQueue,
  };
};

export default useLobby;
