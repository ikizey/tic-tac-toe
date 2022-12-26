import ConcedeButton from './ConcedeButton';
import LeaveButton from './LeaveButton';

const EndGame = ({ isWinner, concede, leave }) => {
  return isWinner === undefined ? (
    <ConcedeButton concede={concede} />
  ) : (
    <LeaveButton leave={leave} />
  );
};

export default EndGame;
