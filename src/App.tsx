import React from "react";
import { RangeSlider } from "./RangeSlider";

function App() {
  return (
    <div style={{ background: "black" }}>
      <RangeSlider
        start={0}
        end={1000}
        min={100}
        max={500}
        color={"red"}
        onChange={() => {}}
      />
    </div>
  );
}

export default App;
