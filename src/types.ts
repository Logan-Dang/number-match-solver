export type ValidMove = {
  origin: readonly [number, number, number];
  target: readonly [number, number, number];
};

export type ValidatorArgs = {
  row: number;
  col: number;
  validMoves: ValidMove[];
  board: Cell[][];
};

export type Validator = (validatorArgs: ValidatorArgs) => void;

export type Cell = {
  num: number;
  active: boolean;
};
