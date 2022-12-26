import { Text } from '@chakra-ui/react';

const Vs = ({ player1, player2 }) => {
  return (
    <>
      <Text colorScheme='purple' size='md'>
        {player1}
      </Text>
      <Text colorScheme={'black'} size='md'>
        {` vs. `}
      </Text>
      <Text colorScheme='red' size='md'>
        {player2}
      </Text>
    </>
  );
};

export default Vs;
