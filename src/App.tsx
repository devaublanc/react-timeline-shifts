import React from "react";
import { Timeline } from "./Timeline";
import "./App.css";
import { Week } from "./Week";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Week>
        <Timeline
          duration={1000}
          sections={[
            {
              name: "lundi",
              color: "red",
              min: 0,
              max: 500,
              shifts: [
                [0, 100], // il peut aller de 0 à 199
                [200, 300], // il peut aller de 101 à 399
              ],
            },
            {
              name: "mardi",
              color: "blue",
              min: 200,
              max: 900,
              shifts: [
                [400, 500], // il peut aller de 301 à 599
                [600, 700], // il peut aller de 501 à 700
              ],
            },
          ]}
        />
      </Week>
    </div>
  );
}

export default App;
