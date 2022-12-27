import { Text } from '@chakra-ui/react';

const InQueue = ({ isInQueue }) => {
  return (
    isInQueue && (
      <Text color='purple' size='md'>
        Waiting for opponent...
      </Text>
    )
  );
};

export default InQueue;
