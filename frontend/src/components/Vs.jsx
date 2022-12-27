import { HStack, Text } from '@chakra-ui/react';

const Vs = ({ player1, player2 }) => {
  return (
    <HStack>
      <Text color='purple' size='md'>
        {player1}
      </Text>
      <Text color='black' size='md'>
        {` vs. `}
      </Text>
      <Text color='red' size='md'>
        {player2}
      </Text>
    </HStack>
  );
};

export default Vs;
