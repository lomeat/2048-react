import { boardWidth, boardHeight } from "./constants";

// Movement Overall

export const movement = {
  ArrowLeft: (board) => moveLeft(board),
  ArrowRight: (board) => moveRight(board),
  ArrowUp: (board) => moveUp(board),
  ArrowDown: (board) => moveDown(board),
};

// Spawn new cell's logic

export function spawn(board) {
  const emptyCells = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (emptyCells.length === 0) {
    return board;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { x, y } = emptyCells[randomIndex];

  const newValue = Math.random() < 0.9 ? 2 : 4;

  board[x][y] = newValue;

  return board;
}

// Check gameover conditions

export function checkGameOver(board) {
  const emptyCells = board.filter(
    (row) => row.filter((cell) => cell === 0).length
  );

  return emptyCells.length === 0;
}

// Movement Methods

function moveLeft(oldBoard) {
  const board = oldBoard.map((row) => row.map((cell) => cell));

  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      if (board[i][j] !== 0) {
        for (let k = j - 1; k >= 0; k--) {
          if (board[i][k] === 0) {
            board[i][k] = board[i][k + 1];
            board[i][k + 1] = 0;
          } else if (board[i][k] === board[i][k + 1]) {
            board[i][k] *= 2;
            board[i][k + 1] = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  const newBoard = spawn(board);

  return newBoard;
}

function moveRight(oldBoard) {
  const board = oldBoard.map((row) => row.map((cell) => cell));

  for (let i = 0; i < boardHeight; i++) {
    for (let j = boardWidth - 1; j >= 0; j--) {
      if (board[i][j] !== 0) {
        for (let k = j + 1; k < boardWidth; k++) {
          if (board[i][k] === 0) {
            board[i][k] = board[i][k - 1];
            board[i][k - 1] = 0;
          } else if (board[i][k] === board[i][k - 1]) {
            board[i][k] *= 2;
            board[i][k - 1] = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  const newBoard = spawn(board);

  return newBoard;
}

function moveUp(oldBoard) {
  const board = oldBoard.map((row) => row.map((cell) => cell));

  for (let j = 0; j < boardWidth; j++) {
    for (let i = 0; i < boardHeight; i++) {
      if (board[i][j] !== 0) {
        for (let k = i - 1; k >= 0; k--) {
          if (board[k][j] === 0) {
            board[k][j] = board[k + 1][j];
            board[k + 1][j] = 0;
          } else if (board[k][j] === board[k + 1][j]) {
            board[k][j] *= 2;
            board[k + 1][j] = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  const newBoard = spawn(board);

  return newBoard;
}

function moveDown(oldBoard) {
  const board = oldBoard.map((row) => row.map((cell) => cell));

  for (let j = 0; j < boardWidth; j++) {
    for (let i = boardHeight - 2; i >= 0; i--) {
      if (board[i][j] !== 0) {
        for (let k = i + 1; k < boardHeight; k++) {
          if (board[k][j] === 0) {
            board[k][j] = board[k - 1][j];
            board[k - 1][j] = 0;
          } else if (board[k][j] === board[k - 1][j]) {
            board[k][j] *= 2;
            board[k - 1][j] = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }

  const newBoard = spawn(board);

  return newBoard;
}
