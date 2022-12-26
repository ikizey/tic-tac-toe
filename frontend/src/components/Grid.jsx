import { Grid as cGrid, GridItem } from '@chakra-ui/react';
import Mark from './Mark';

const Grid = ({ moves, makeMove }) => {
  return (
    <cGrid templateColumns='repeat(3, 1fr)' gap={6}>
      {moves.map((move, index) => (
        <GridItem
          key={index}
          w='100%'
          h='20'
          bg='grey.100'
          onClick={() => {
            move === '' && makeMove(index);
          }}
        >
          <Mark move={move} />
        </GridItem>
      ))}
    </cGrid>
  );
};

export default Grid;
