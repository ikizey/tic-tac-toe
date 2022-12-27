import ConcedeButton from './ConcedeButton';
import LeaveButton from './LeaveButton';

const EndGame = ({ isWinner, concede, leave }) => {
  return isWinner === null ? (
    <ConcedeButton concede={concede} />
  ) : (
    <LeaveButton leave={leave} />
  );
};

export default EndGame;
