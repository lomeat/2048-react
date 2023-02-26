import React from "react";
import { Stage, Container, Sprite } from "@pixi/react";
import { Ticker } from "pixi.js";

import player from "./assets/player.png";

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
      <Scene sizes={[width, height]}>
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
  const [speed, setSpeed] = React.useState(0);

  function move(dt) {}

  Ticker.shared.add(move);

  return (
    <Sprite x={100} y={100} image={player} width={50} height={50}></Sprite>
  );
}

// import { BlurFilter } from "pixi.js";
// import { Stage, Container, Sprite, Text } from "@pixi/react";
// import { useMemo } from "react";

// export const App = () => {
//   const blurFilter = useMemo(() => new BlurFilter(4), []);

//   return (
//     <Stage>
//       <Sprite
//         image="https://pixijs.io/pixi-react/img/bunny.png"
//         x={400}
//         y={270}
//         anchor={{ x: 0.5, y: 0.5 }}
//       />

//       <Container x={400} y={330}>
//         <Text
//           text="Hello World"
//           anchor={{ x: 0.5, y: 0.5 }}
//           filters={[blurFilter]}
//         />
//       </Container>
//     </Stage>
//   );
// };
