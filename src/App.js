import React from "react";
import styled from "styled-components";

export function App() {
  const gridWidth = 400;
  const cellWidth = 100;

  const [gridState, setGridState] = React.useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  React.useEffect(() => {
    // addCell(3, 0, 6);
    addCell(3, 3, 2);
    addCell(2, 3, 2);
    // addCell(0, 3, 4);
    addCell(0, 3, 4);
  }, []);

  function addCell(x, y, count) {
    setGridState((state) =>
      state.map((row, ri) =>
        row.map((col, ci) => (ri === y && ci === x ? count : col))
      )
    );
  }

  function handleLeft(e) {
    if (e.key === "a") {
      // setGridState((state) => state.map((row) => row.map((cell) => 2)));

      // setGridState((state) =>
      //   state.map((row) =>
      //     row.reduce((prev, curr, index) => {
      //       const res = [+prev + +curr];
      //       console.log(res);
      //       return [...res, 0, 0, 0];
      //     }, [])
      //   )
      // );

      setGridState((state) =>
        state.map((row) => {
          console.log(row);

          for (let x = 0; x < row.length; x++) {
            if (row[x] && row[x] === row[x + 1]) {
              if (!row[0]) {
                row[0] = row[x] * 2;
                row[x] = 0;
                row[x + 1] = 0;
              }
              row[x - 1] = row[x] * 2;
            }
          }

          return row;

          // let [a0, a1, a2, a3] = row;

          // if (a2 === a3) {
          //   a0 = a2 * 2;
          //   a2 = 0;
          //   a3 = 0;
          // }

          // return [a0, a1, a2, a3];
        })
      );
    }
    //   setGridState((state) => {
    //     const newState = state.map((row) => row.map((cell) => cell));

    //     for (let y = 0; y < newState.length; y++) {
    //       for (let x = 0; x < newState[y].length; x++) {
    //         if (newState[y][x] === newState[y][x + 1]) {
    //           newState[y][0] = newState[y][x] * 2;
    //           newState[y][x] = 0;
    //           newState[y][x + 1] = 0;
    //         }
    //       }
    //     }

    //     console.log(newState);

    //     state[0][0] = 2;

    //     return state;
    //   });
    // }
  }

  console.log(gridState);

  document.addEventListener("keypress", (e) => handleLeft(e));

  return (
    <Wrapper>
      <Grid width={gridWidth}>
        {gridState?.map((row, ri) =>
          row.map((col, ci) => (
            <Cell count={col} key={`${ci}-${ri}`} position={[ci, ri]} />
          ))
        )}
      </Grid>
    </Wrapper>
  );
}

function Cell({ width = 100, count, position }) {
  const cellRef = React.useRef(null);

  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  React.useLayoutEffect(() => {
    setX(position[0] * width);
    setY(position[1] * width);
  }, [position, width]);

  return (
    <CellWrapper ref={cellRef} width={width} x={x} y={y} count={count}>
      {count}
    </CellWrapper>
  );
}

const Wrapper = styled.div`
  margin: 100px auto;
  width: 400px;
  display: flex;
`;

const Grid = styled.div`
  background: brown;
  width: ${({ width }) => width ?? 400}px;
  height: ${({ width }) => width ?? 400}px;
  position: relative;
`;

const CellWrapper = styled.div`
  background: ${({ count }) => (count === 0 ? "transparent" : "yellow")};
  color: ${({ count }) => (count === 0 ? "transparent" : "black")};

  width: ${({ width }) => width ?? 100}px;
  height: ${({ width }) => width ?? 100}px;
  border: 1px solid black;
  box-sizing: border-box;

  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  font-size: 24px;
  font-family: "Fira Code", sans;
  text-align: center;
  line-height: ${({ width }) => width ?? 100}px;
`;
