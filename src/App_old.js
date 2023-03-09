import React from "react";
import {
  Stage,
  Container,
  Sprite,
  useTick,
  AppProvider,
  useApp,
} from "@pixi/react";

import player from "./assets/player.png";

export function App() {
  const [width, height] = [500, 500];

  const stageProps = {
    width,
    height,
    options: {
      backgroundColor: 0xffffff,
      antialisis: true,
    },
  };

  const containerStyle = {
    display: "block",
    border: "2px solid black",
    width,
    height,
    margin: "100px auto",
  };

  // const { move, x } = PlayerController();

  // move();

  return (
    <div style={{ ...containerStyle }}>
      <Stage {...stageProps}>
        <Scene sizes={[width, height]}>
          <Player />
        </Scene>
      </Stage>
    </div>
  );
}

export function Scene(props) {
  const [width, height] = props?.sizes;

  const app = useApp();

  return (
    <Container width={width} height={height}>
      <AppProvider value={app}>{props.children}</AppProvider>
    </Container>
  );
}

function Player(props) {
  // const [speed, setSpeed] = React.useState(10);
  const speed = 10;

  const [x, setX] = React.useState(0);

  function move(dt) {
    setX((state) => state * dt * speed);
  }

  useTick((dt) => move(dt));

  return <Sprite y={100} x={x} image={player} width={50} height={50}></Sprite>;
}
