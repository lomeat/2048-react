import { useEffect, useState } from "react";
import styled from "styled-components";

// [init]

const initBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 4],
  [2, 0, 2, 0],
  [8, 4, 2, 2],
];
const width = initBoard.length;
const height = initBoard[0].length;

// [movement]

function moveLeft(oldBoard) {
  const board = oldBoard.map((row) => row.map((cell) => cell));

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
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

  for (let i = 0; i < height; i++) {
    for (let j = width - 1; j >= 0; j--) {
      if (board[i][j] !== 0) {
        for (let k = j + 1; k < width; k++) {
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

  for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
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

  for (let j = 0; j < width; j++) {
    for (let i = height - 2; i >= 0; i--) {
      if (board[i][j] !== 0) {
        for (let k = i + 1; k < height; k++) {
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

function spawn(board) {
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

const movement = {
  ArrowLeft: (board) => moveLeft(board),
  ArrowRight: (board) => moveRight(board),
  ArrowUp: (board) => moveUp(board),
  ArrowDown: (board) => moveDown(board),
};

// [app]

export function App() {
  const [board, setBoard] = useState(initBoard);

  function handleKeyDown(event) {
    if (movement[event.key]) {
      setBoard((board) => movement[event.key](board));
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]);

  return (
    <Rows>
      {board.map((line) => (
        <Row>
          {line.map((cell) =>
            cell === 0 ? <EmptyCell /> : <NumberCell>{cell}</NumberCell>
          )}
        </Row>
      ))}
    </Rows>
  );
}

// [styles]

const EmptyCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  margin: 2px;
`;

const NumberCell = styled(EmptyCell)`
  background-color: #fc9;
  color: white;
  font-family: monospace;
  font-size: 2em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;
