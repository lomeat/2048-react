import { useEffect, useState } from "react";

import * as S from "./styles";
import { movement, initBoard } from "./logic";

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
    <S.Rows>
      {board.map((line) => (
        <S.Row>
          {line.map((cell) =>
            cell === 0 ? <S.EmptyCell /> : <S.NumberCell>{cell}</S.NumberCell>
          )}
        </S.Row>
      ))}
    </S.Rows>
  );
}
