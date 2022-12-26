import { Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import useLobby from '../hooks/useLobby';

const Lobby = () => {
  const { totalPlayers, totalGames, enterQueue, leaveQueue, isInQueue } =
    useLobby();

  return (
    <Container centerContent>
      <VStack align='center' spacing={5} height='100vh'>
        //TODO ** for some reason it's not centered vertically
        <HStack spacing={5}>
          <Text>Total players connected: {totalPlayers}</Text>
          <Text>Total game sessions: {totalGames}</Text>
        </HStack>
        <Button
          colorScheme='purple'
          size='lg'
          onClick={isInQueue ? leaveQueue : enterQueue}
        >
          {isInQueue ? 'Leave' : 'Enter'} Queue
        </Button>
      </VStack>
    </Container>
  );
};

export default Lobby;
