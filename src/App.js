import { useEffect, useState } from "react";
import styled from "styled-components";

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

const width = 4;
const height = 4;
const initBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 4],
  [2, 0, 2, 0],
  [8, 4, 2, 2],
];

function moveLeft(oldBoard) {
  const board = oldBoard.map((line) => line.map((cell) => cell));
  for (let y = 0; y < height; y++) {
    const values = board[y].filter((cell) => cell !== 0);
    values.push(...Array.from({ length: width }, () => 0));

    for (let i = 0; i < width - 1; i++) {
      if (values[i] !== 0 && values[i] === values[i + 1]) {
        values[i] = values[i] * 2;

        for (let t = i + 1; t < width; t++) {
          values[t] = values[t + 1];
        }
      }
    }

    values.length = width;
    board[y] = values;
  }
  return board;
}

function moveRight(oldBoard) {}

function moveUp(oldBoard) {}

function moveDown(oldBoard) {}

function getMovement(board) {
  return {
    left: () => moveLeft(board),
    right: () => moveRight(board),
    up: () => moveUp(board),
    down: () => moveDown(board),
  };
}

export function App() {
  const [board, setBoard] = useState(initBoard);

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case "ArrowLeft": {
          setBoard(getMovement(board).left());
          break;
        }
        case "ArrowRight": {
          setBoard(getMovement(board).right());
          break;
        }
        case "ArrowDown": {
          setBoard(getMovement(board).down());
          break;
        }
        case "ArrowUp": {
          setBoard(getMovement(board).up());
          break;
        }
        default: {
          break;
        }
      }
    }

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
