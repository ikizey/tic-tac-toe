import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config';
import { default_moves } from '../models/grid';
import { PlayerContext } from '../store/playerContext';

const CLIENT_EVENT = Object.freeze({
  MOVE: 'move',
  CONCEDE: 'concede',
  LEAVE: 'leave',
  IN_GAME: 'inGame',
});

const SERVER_EVENT = Object.freeze({
  INTRODUCTION: 'introduction',
  TURN: 'turn',
  MOVES: 'moves',
  GAME_OVER: 'gameOver',
  LEFT_GAME: 'leftGame',
});

export const useGame = () => {
  const { playerUid } = useContext(PlayerContext);

  const [opponentName, setOpponentName] = useState('unknown');
  const [opponentID, setOpponentID] = useState('unknown');
  const [isWinner, setIsWinner] = useState(null);
  const [moves, setMoves] = useState(default_moves);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const navigate = useNavigate();

  const makeMove = (index) => {
    socket.emit(CLIENT_EVENT.MOVE, { index });
  };

  const concede = () => {
    socket.emit(CLIENT_EVENT.CONCEDE, {});
  };

  const leave = () => {
    socket.emit(CLIENT_EVENT.LEAVE, {});
  };

  useEffect(() => {
    socket.emit(CLIENT_EVENT.IN_GAME, {});

    socket.on(
      SERVER_EVENT.INTRODUCTION,
      ({ player1Uid, player1Name, player2Uid, player2Name }) => {
        if (player1Uid === playerUid) {
          setIsPlayerTurn(true);
          setOpponentName(player2Name);
          setOpponentID(player2Uid);
        } else {
          setOpponentName(player1Name);
          setOpponentID(player1Uid);
        }
      }
    );

    socket.on(SERVER_EVENT.TURN, ({ playerUid: pUid }) => {
      setIsPlayerTurn(pUid === playerUid);
    });

    socket.on(SERVER_EVENT.MOVES, ({ moves }) => {
      setMoves(moves);
    });

    socket.on(SERVER_EVENT.GAME_OVER, ({ playerUid: pUid }) => {
      setIsWinner(pUid === undefined ? pUid : pUid === playerUid);
    });

    socket.on(SERVER_EVENT.LEFT_GAME, () => {
      navigate('/lobby');
    });

    return () => {
      socket.off(SERVER_EVENT.INTRODUCTION);
      socket.off(SERVER_EVENT.TURN);
      socket.off(SERVER_EVENT.MOVES);
      socket.off(SERVER_EVENT.GAME_OVER);
    };
  }, []);

  return {
    opponentName,
    opponentID,
    isWinner,
    moves,
    isPlayerTurn,
    concede,
    leave,
    makeMove,
  };
};
