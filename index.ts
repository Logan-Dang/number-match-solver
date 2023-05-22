import { Cell, ValidMove, collectAllValidMoves } from "./src/index.js";

const nums = [
  [5, 8, 9, 4, 2, 3, 5, 6, 1],
  [4, 1, 7, 5, 7, 6, 9, 7, 2],
  [3, 5, 8, 6, 9, 5, 2, 6, 9],
  [4, 9, 3, 5, 3],
];

const board: Cell[][] = nums.map((arr) =>
  arr.map((num) => ({ num, active: true }))
);

const map: { [key: string]: boolean } = {};

const makeMoke = ({ origin, target }: ValidMove, board: Cell[][]) => {
  const [oRow, oCol] = origin;
  const [tRow, tCol] = target;
  const newBoard: Cell[][] = JSON.parse(JSON.stringify(board));
  newBoard[oRow][oCol].active = false;
  newBoard[tRow][tCol].active = false;

  if (newBoard[oRow].every((cell) => !cell.active)) {
    newBoard.splice(oRow, 1);
  }
  if (tRow != oRow) {
    const tRowAdjust = tRow < oRow ? tRow : tRow - 1;
    if (newBoard[tRowAdjust].every((cell) => !cell.active)) {
      newBoard.splice(tRowAdjust, 1);
    }
  }
  return newBoard;
};

const calculate = (
  board: Cell[][],
  prevMoves: ValidMove[],
  appends: number
): boolean => {
  if (board.length === 0) {
    console.log(prevMoves);
    return true;
  }

  const boardString = JSON.stringify(board);
  if (boardString in map) {
    process.stdout.write(board.length.toString());
    return map[boardString];
  }
  const newState: Cell[][] = JSON.parse(boardString);
  const moves = collectAllValidMoves(newState);
  for (const move of moves) {
    prevMoves.push(move);
    if (calculate(makeMoke(move, newState), prevMoves, appends)) {
      return true;
    }
    prevMoves.pop();
  }

  if (appends === 0) {
    map[boardString] = false;
    return false;
  }

  const newerState: Cell[][] = JSON.parse(JSON.stringify(newState));
  let lastRow = newerState[newerState.length - 1];
  for (let row = 0; row < newState.length; row++) {
    for (let col = 0; col < newState[row].length; col++) {
      if (!newState[row][col].active) continue;
      if (lastRow.length === 9) {
        lastRow = [];
        newerState.push(lastRow);
      }
      lastRow.push({ num: newState[row][col].num, active: true });
    }
  }
  prevMoves.push("append" as any);
  return calculate(newerState, prevMoves, appends - 1);
};

calculate(board, [], 5);
