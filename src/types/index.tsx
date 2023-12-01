export type Stats = {
  player1: number;
  player2: number;
  matches: number;
};

export type UPlayer = {
  stats: Stats;
  time1: number;
  time2: number;
};

export type UOptions = {
  newGame: () => void;
  select: number;
  setSelect: (value: React.SetStateAction<number>) => void;
  stats: Stats;
  turn: boolean;
};

export type UModal = {
  modalRef: React.MutableRefObject<HTMLDivElement>;
  textRef: React.MutableRefObject<HTMLDivElement>;
};
