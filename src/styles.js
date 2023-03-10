import styled from "styled-components";

import { colors } from "./constants";

export const EmptyCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ cellSizes }) => `
    width: ${cellSizes?.[0] ?? 100}px;
    height: ${cellSizes?.[1] ?? 100}px;
  `}

  margin: 2px;
`;

export const NumberCell = styled(EmptyCell)`
  color: white;
  font-family: monospace;
  font-size: 2em;

  background: ${({ count }) => {
    if (count === 0) return "white";
    return colors[count];
  }};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  margin: 100px auto;
  position: relative;

  ${({ cellSizes, boardSizes }) => `
    width: ${cellSizes?.[0] * boardSizes?.[0] ?? 400}px;
    height: ${cellSizes?.[1] * boardSizes?.[1] ?? 400}px;
  `}
`;

export const GameOver = styled.div`
  color: red;
  font-size: 32px;
  font-family: monospace;
  font-weight: bold;
  text-transform: uppercase;s
  text-align: center;

  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;
`;
