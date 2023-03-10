import { useEffect, useState } from "react";

import * as S from "./styles";
import { movement, checkGameOver } from "./logic";
import {
  initBoard,
  cellWidth,
  cellHeight,
  boardWidth,
  boardHeight,
} from "./constants";

export function App() {
  const [board, setBoard] = useState(initBoard);
  const [isGameOver, setIsGameOver] = useState(false);

  function handleKeyDown(event) {
    if (movement[event.key]) {
      setBoard((board) => movement[event.key](board));
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (checkGameOver(board)) {
      setIsGameOver((state) => !state);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]);

  return (
    <S.Wrapper
      cellSizes={[cellWidth, cellHeight]}
      boardSizes={[boardWidth, boardHeight]}
    >
      <S.Rows>
        {board.map((line) => (
          <S.Row>
            {line.map((cell) =>
              cell === 0 ? (
                <S.EmptyCell cellSizes={[cellWidth, cellHeight]} />
              ) : (
                <S.NumberCell count={cell}>{cell}</S.NumberCell>
              )
            )}
          </S.Row>
        ))}
      </S.Rows>
      {isGameOver && <S.GameOver>Game Over</S.GameOver>}
    </S.Wrapper>
  );
}
