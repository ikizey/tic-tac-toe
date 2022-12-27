import { Box, Grid as CGrid, GridItem } from '@chakra-ui/react';
import Mark from './Mark';

const Grid = ({ moves, makeMove }) => {
  return (
    <CGrid templateColumns='repeat(3, 1fr)' gap={0}>
      {moves.map((move, index) => (
        <GridItem
          key={index}
          onClick={() => {
            move === '' && makeMove(index);
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='1px'
            borderWidth='1'
            borderColor='purple'
            w='20'
            h='20'
            color='white'
          >
            <Mark move={move} />
          </Box>
        </GridItem>
      ))}
    </CGrid>
  );
};

export default Grid;
