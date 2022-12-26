import React, { useContext } from 'react';
import { Container, Grid, VStack } from '@chakra-ui/react';
import { useGame } from '../hooks/useGame';
import { PlayerContext } from '../store/playerContext';
import EndGame from '../components/EndGame';
import GameStatus from '../components/GameStatus';
import Grid from '../components/Grid';
import Turn from '../components/Turn';
import Vs from '../components/Vs';

const Game = () => {
  const { playerName } = useContext(PlayerContext);
  const {
    opponentName,
    isWinner,
    moves,
    isPlayerTurn,
    concede,
    leave,
    makeMove,
  } = useGame();
  return (
    <Container>
      <VStack>
        <GameStatus isWinner={isWinner} />
        <Vs player1={playerName} player2={opponentName} />
        <Turn
          isPlayerTurn={isPlayerTurn}
          playerName={playerName}
          opponentName={opponentName}
        />
        <Grid />
        <EndGame isWinner={isWinner} concede={concede} leave={leave} />
      </VStack>
    </Container>
  );
};

export default Game;
