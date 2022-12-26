import Defeat from './Defeat';
import Draw from './Defeat';
import GameIsOn from './Defeat';
import Victory from './Defeat';

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
