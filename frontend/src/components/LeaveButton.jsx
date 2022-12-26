import { Button } from '@chakra-ui/react';

const LeaveButton = ({ leave }) => {
  return (
    <Button colorScheme='purple' onClick={leave}>
      Leave
    </Button>
  );
};
export default LeaveButton;
