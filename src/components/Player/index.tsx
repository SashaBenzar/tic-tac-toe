import { UPlayer } from '../../types';

export const Player: React.FC<UPlayer> = ({ stats, time1, time2 }) => {
  return (
    <div className="ttt__players">
      <div className="ttt__player-info">
        ГРАВЕЦЬ 1: ● символ - Х ● кількість виграшів - {stats.player1} ● {time1} сек.
      </div>
      <div className="ttt__player-info">
        ГРАВЕЦЬ 2: ● символ - О ● кількість виграшів - {stats.player2} ● {time2} сек.
      </div>
    </div>
  );
};
