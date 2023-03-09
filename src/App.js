import React from "react";
import styled from "styled-components";

export function App() {
  const gridWidth = 400;
  const cellWidth = 100;

  const [gridState, setGridState] = React.useState([
    "....",
    "....",
    "....",
    "....",
  ]);

  React.useEffect(() => {
    addCell(3, 0, 6);
  }, []);

  // console.log(state);

  function addCell(x, y, count) {
    setGridState((state) => {
      console.log(state);

      return state.map((row, ri) =>
        row.split("").map((col, ci) => (ri === y && ci === x ? count : col))
      );
    });
  }

  return (
    <Wrapper>
      <Grid width={gridWidth}>
        <Cell width={cellWidth} count={2} position={[0, 3]} />
        <Cell width={cellWidth} count={4} position={[3, 0]} />
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
    <CellWrapper ref={cellRef} width={width} x={x} y={y}>
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
  background: yellow;
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
