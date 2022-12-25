import { Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import useLobby from '../hooks/useLobby';

const Lobby = () => {
  const { totalPlayers, totalGames, goQueue } = useLobby();

  return (
    <Container centerContent>
      <VStack spacing={5}>
        <HStack spacing={5}>
          <Text>Total players connected: {totalPlayers}</Text>
          <Text>Total game sessions: {totalGames}</Text>
        </HStack>
        <Button colorScheme='purple' size='lg' onClick={goQueue}>
          Enter Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Lobby;
