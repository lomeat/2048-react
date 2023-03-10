import styled from "styled-components";

export const EmptyCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  margin: 2px;
`;

export const NumberCell = styled(EmptyCell)`
  background-color: #fc9;
  color: white;
  font-family: monospace;
  font-size: 2em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;
