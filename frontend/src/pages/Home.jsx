import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { PlayerContext } from '../store/playerContext';

const Home = () => {
  const { playerName, changePlayerName, playerHasValidName } =
    useContext(PlayerContext);
  const navigate = useNavigate();

  const goQueue = () => {
    navigate('/queue');
  };

  return (
    <Container centerContent>
      <VStack spacing={5}>
        <Heading as='h2' size='xl' noOfLines={1}>
          Welcome to Tic Tac Toe game!
        </Heading>
        <FormControl isInvalid={!playerHasValidName()} isRequired>
          <FormLabel as='legend'>Enter your name</FormLabel>
          <Input
            placeholder='enter your name'
            size='lg'
            value={playerName}
            onChange={({ target }) => changePlayerName(target.value)}
          />
          {playerHasValidName() ? (
            <FormHelperText>
              name should be between 3 to 20 characters.
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              name should be between 3 to 20 characters.
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          isDisabled={!playerHasValidName()}
          colorScheme='purple'
          size='lg'
          onClick={goQueue}
        >
          Enter Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Home;
