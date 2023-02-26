import React from "react";
import { Stage, Container, Sprite } from "@pixi/react";

export function App() {
  const [width, height] = [500, 500];

  return (
    <Stage
      options={{
        backgroundColor: 0xffffff,
        width,
        height,
      }}
    >
      <Scene>
        <Player />
      </Scene>
    </Stage>
  );
}

export function Scene(props) {
  const [width, height] = props?.sizes;

  return (
    <Container width={width} height={height}>
      {props.children}
    </Container>
  );
}

export function Player() {
  return <Sprite x={100} y={100}></Sprite>;
}
