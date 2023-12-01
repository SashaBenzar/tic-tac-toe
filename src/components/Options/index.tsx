import { UOptions } from '../../types';

export const Options: React.FC<UOptions> = ({ newGame, select, setSelect, stats, turn }) => {
  return (
    <div className="ttt__options">
      <div className="ttt__new-game">
        <button className="ttt__restart" onClick={newGame}>
          Нова гра
        </button>
        <select
          className="ttt__selector"
          id="lang"
          value={select}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelect(Number(e.target.value))}>
          {[3, 4, 5, 6, 7, 8, 9].map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div className="ttt__sum">кількість зіграних ігор: {stats.matches}</div>
      <div className="ttt__turn">ходить - {turn ? 'ГРАВЕЦЬ 1' : 'ГРАВЕЦЬ 2'}</div>
    </div>
  );
};
