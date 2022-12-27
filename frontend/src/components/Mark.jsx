import { Text } from '@chakra-ui/react';

const Mark = ({ move }) => {
  const color = move === 'X' ? 'purple' : 'green';
  return (
    <Text color={color} fontSize='4xl'>
      {move}
    </Text>
  );
};

export default Mark;
