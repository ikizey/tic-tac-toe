import { HStack, Text } from '@chakra-ui/react';

const OnlineStats = (totalPlayers, totalGames) => {
  return (
    <HStack spacing={5}>
      <Text>Total players connected: {totalPlayers}</Text>
      <Text>Total game sessions: {totalGames}</Text>
    </HStack>
  );
};

export default OnlineStats;
