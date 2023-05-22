import { Cell, ValidMove, Validator } from "./types";

export const collectAllValidMoves = (board: Cell[][]) => {
  const validMoves: Set<ValidMove> = new Set();
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      getValidMoves(row, col, board).forEach((arr) => validMoves.add(arr));
    }
  }
  return validMoves;
};

const getValidMoves = (
  row: number,
  col: number,
  board: Cell[][]
): ValidMove[] => {
  const validMoves: ValidMove[] = [];
  const args = { row, col, validMoves, board };
  if (!board[row][col].active) return [];
  checkRight(args);
  checkBottom(args);
  checkBottomLeft(args);
  checkBottomRight(args);
  return validMoves;
};

const checkRight: Validator = ({ row, col, validMoves, board }) => {
  const original = [row, col] as const;
  const val = board[row][col].num;
  do {
    col++;
    if (col >= board[row].length) {
      row++;
      if (row >= board.length) {
        return;
      }
      col = 0;
    }
  } while (!board[row][col].active);
  const targetVal = board[row][col].num;
  if (val === targetVal || val + targetVal === 10) {
    validMoves.push({
      origin: [...original, val],
      target: [row, col, targetVal],
    });
  }
};

const checkBottom: Validator = ({ row, col, validMoves, board }) => {
  const original = [row, col] as const;
  const val = board[row][col].num;
  do {
    row++;
    if (row >= board.length || col >= board[row].length) return;
  } while (!board[row][col].active);
  const targetVal = board[row][col].num;
  if (val === targetVal || val + targetVal === 10) {
    validMoves.push({
      origin: [...original, val],
      target: [row, col, targetVal],
    });
  }
};

const checkBottomLeft: Validator = ({ row, col, validMoves, board }) => {
  const original = [row, col] as const;
  const val = board[row][col].num;
  do {
    row++;
    col--;
    if (row >= board.length || col < 0 || col >= board[row].length) return;
  } while (!board[row][col].active);
  const targetVal = board[row][col].num;
  if (val === targetVal || val + targetVal === 10) {
    validMoves.push({
      origin: [...original, val],
      target: [row, col, targetVal],
    });
  }
};

const checkBottomRight: Validator = ({ row, col, validMoves, board }) => {
  const original = [row, col] as const;
  const val = board[row][col].num;
  do {
    row++;
    col++;
    if (row >= board.length || col >= board[row].length) return;
  } while (!board[row][col].active);
  const targetVal = board[row][col].num;
  if (val === targetVal || val + targetVal === 10) {
    validMoves.push({
      origin: [...original, val],
      target: [row, col, targetVal],
    });
  }
};
