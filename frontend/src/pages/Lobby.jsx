import React from 'react';
import { Button, Container, VStack } from '@chakra-ui/react';
import useLobby from '../hooks/useLobby';
import InQueue from '../components/InQueue';
import OnlineStats from '../components/OnlineStats';

const Lobby = () => {
  const { totalPlayers, totalGames, enterQueue, leaveQueue, isInQueue } =
    useLobby();

  return (
    <Container centerContent>
      <VStack justify='center' spacing={5} height='100vh'>
        <InQueue isInQueue={isInQueue} />
        <OnlineStats totalGames={totalGames} totalPlayers={totalPlayers} />
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
