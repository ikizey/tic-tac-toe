import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config';
import { PlayerContext } from '../store/playerContext';

const SERVER_EVENT = Object.freeze({
  NO_NAME: 'noName',
  TOTAL_PLAYERS: 'totalPlayers',
  TOTAL_GAMES: 'totalGames',
  IN_QUEUE: 'inQueue',
  QUEUE_ERROR: 'queueError',
  OPPONENT_FOUND: 'opponentFound',
});

const CLIENT_EVENT = Object.freeze({
  IN_LOBBY: 'inLobby',
  ENTER_QUEUE: 'enterQueue',
  LEAVE_QUEUE: 'leaveQueue',
  OPPONENT_OK: 'opponentOK',
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

  const opponentOK = () => {
    socket.emit(CLIENT_EVENT.OPPONENT_OK, {});
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
      setTotalGames(totalGames);
    });

    socket.on(SERVER_EVENT.IN_QUEUE, () => {
      setIsInQueue(true);
    });

    socket.on(SERVER_EVENT.QUEUE_ERROR, () => {
      setIsInQueue(false);
      //TODO! show some message
    });
    socket.on(SERVER_EVENT.OPPONENT_FOUND, () => {
      opponentOK();
    });

    return () => {
      socket.off(SERVER_EVENT.NO_NAME);
      socket.off(SERVER_EVENT.TOTAL_PLAYERS);
      socket.off(SERVER_EVENT.TOTAL_GAMES);
      socket.off(SERVER_EVENT.IN_QUEUE);
      socket.off(SERVER_EVENT.QUEUE_ERROR);
      socket.off(SERVER_EVENT.OPPONENT_FOUND);
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
