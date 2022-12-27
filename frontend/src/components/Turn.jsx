import { Text } from '@chakra-ui/react';

const Turn = ({ isPlayerTurn, playerName, opponentName }) => {
  const name = isPlayerTurn ? playerName : opponentName;
  const color = isPlayerTurn ? 'green' : 'red';
  return <Text color={color}>{name}'s turn</Text>;
};

export default Turn;
