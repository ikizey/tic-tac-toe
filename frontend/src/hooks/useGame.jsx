import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.config';
import { PlayerContext } from '../store/playerContext';

const CLIENT_EVENT = Object.freeze({
  MOVE: 'move',
  CONCEDE: 'concede',
});

const SERVER_EVENT = Object.freeze({
  INTRODUCTION: 'introduction',
  TURN: 'turn',
  MOVES: 'moves',
  GAME_OVER: 'gameOver',
});

export const useGame = () => {
  const { playerUid, playerName } = useContext(PlayerContext);

  const [opponentName, setOpponentName] = useState('unknown');
  const [opponentID, setOpponentID] = useState('unknown');
  const [isWinner, setIsWinner] = useState(null);
  const [moves, setMoves] = useState([''.repeat(8)]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const navigate = useNavigate();

  const reset = () => {
    setOpponentName('unknown');
    setOpponentID('unknown');
    setIsWinner(null);
    setMoves([''.repeat(8)]);
    setIsPlayerTurn(false);
  };

  const makeMove = (index) => {
    socket.emit(CLIENT_EVENT.MOVE, { index });
  };

  const concede = () => {
    socket.emit(CLIENT_EVENT.CONCEDE, {});
    navigate('/lobby');
  };

  useEffect(() => {
    socket.on(
      SERVER_EVENT.INTRODUCTION,
      ({ player1Uid, player1Name, player2Uid, player2Name }) => {
        reset();

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
      setIsPlayerTurn(false);
    });

    return () => {
      socket.off(SERVER_EVENT.INTRODUCTION);
      socket.off(SERVER_EVENT.TURN);
      socket.off(SERVER_EVENT.MOVES);
      socket.off(SERVER_EVENT.GAME_OVER);
    };
  });

  return {
    opponentName,
    opponentID,
    isWinner,
    moves,
    isPlayerTurn,
    concede,
    makeMove,
  };
};
