import Defeat from './Defeat';
import Draw from './Draw';
import GameIsOn from './GameIsOn';
import Victory from './Victory';

const GameStatus = ({ isWinner }) => {
  if (isWinner === null) {
    return <GameIsOn />;
  } else if (isWinner === undefined) {
    return <Draw />;
  } else if (isWinner) {
    return <Victory />;
  } else {
    return <Defeat />;
  }
};

export default GameStatus;
