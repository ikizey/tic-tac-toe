import { Text } from '@chakra-ui/react';

const Mark = ({ move }) => {
  const color = move === 'X' ? 'purple' : 'green';
  return <Text colorScheme={color}>mark</Text>;
};

export default Mark;
