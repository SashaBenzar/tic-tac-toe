import React from 'react';

import './App.css';
import { Modal, Options, Player } from './components';

const App: React.FC = () => {
  const [select, setSelect] = React.useState(3);
  const [board, setBoard] = React.useState(3);
  const [turn, setTurn] = React.useState(true);
  const [cells, setCells] = React.useState(Array(board * board).fill(null));
  const [stats, setStats] = React.useState({ player1: 0, player2: 0, matches: 0 });

  const modalRef = React.useRef<HTMLDivElement>(null!);
  const textRef = React.useRef<HTMLDivElement>(null!);

  const [isRunning, setIsRunning] = React.useState(true);
  const [time1, setTime1] = React.useState(0);
  const [time2, setTime2] = React.useState(0);

  React.useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        turn ? setTime1((prevTime) => prevTime + 1) : setTime2((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, turn]);

  function newGame() {
    setBoard(select);
    setCells(Array(select * select).fill(null));
    setTurn(true);
    setTime1(0);
    setTime2(0);
    setIsRunning(true);
  }
  function handleClick(index: number) {
    if (!cells[index] && !Winner(cells)) {
      let newCells = [...cells];
      newCells[index] = turn ? 'X' : 'O';
      setCells(newCells);

      if (Winner(newCells)) {
        setTimeout(() => {
          let modal = modalRef.current;
          let text = textRef.current;
          modal.style.display = 'flex';
          text.textContent = `${turn ? 'ГРАВЕЦЬ 1' : 'ГРАВЕЦЬ 2'} переміг за ${
            turn ? time1 : time2
          } сек. Вітаємо! `;
          turn
            ? setStats({ ...stats, player1: stats.player1 + 1, matches: stats.matches + 1 })
            : setStats({ ...stats, player2: stats.player2 + 1, matches: stats.matches + 1 });
        }, 2000);
        setIsRunning((prevIsRunning) => !prevIsRunning);
      } else if (!newCells.includes(null)) {
        setTimeout(() => {
          let modal = modalRef.current;
          let text = textRef.current;
          modal.style.display = 'flex';
          text.textContent = `Нічия! Спробуйте ще :) Загальний час на гру: ${time1 + time2} сек.`;
          setStats({ ...stats, matches: stats.matches + 1 });
        }, 2000);
        setIsRunning((prevIsRunning) => !prevIsRunning);
      } else {
        setTurn(!turn);
      }
    }
  }

  function Winner(squares: string[]) {
    const lines = [];
    const size = Math.sqrt(squares.length);

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, index) => i * size + index));
    }

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, index) => i + index * size));
    }

    lines.push(Array.from({ length: size }, (_, index) => index * (size + 1)));
    lines.push(Array.from({ length: size }, (_, index) => (index + 1) * (size - 1)));

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <div className="ttt">
        <Player stats={stats} time1={time1} time2={time2} />
        <Options
          newGame={newGame}
          select={select}
          setSelect={setSelect}
          stats={stats}
          turn={turn}
        />
        <div className="ttt__board" style={{ gridTemplateColumns: `repeat(${board}, auto)` }}>
          {cells.map((item, index) => (
            <div key={index} onClick={() => handleClick(index)} className="ttt__cell">
              {item}
            </div>
          ))}
        </div>
      </div>
      <Modal modalRef={modalRef} textRef={textRef} />
    </>
  );
};

export default App;
