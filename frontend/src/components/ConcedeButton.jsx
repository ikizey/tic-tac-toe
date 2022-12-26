import { Button } from '@chakra-ui/react';

const ConcedeButton = ({ concede }) => {
  return (
    <Button colorScheme='red' onClick={concede}>
      Concede
    </Button>
  );
};

export default ConcedeButton;
