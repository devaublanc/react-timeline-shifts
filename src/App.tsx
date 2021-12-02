import React from "react";
import { Timeline } from "./Timeline";
import "./App.css";

function App() {
  return (
    <div style={{ marginTop: 200 }}>
      <Timeline
        start={0}
        end={1000}
        sections={[
          {
            name: "lundi",
            color: "red",
            min: 0,
            max: 500,
            shifts: [
              [0, 100],
              [90, 300],
            ],
          },
          {
            name: "mardi",
            color: "blue",
            min: 501,
            max: 1000,
            shifts: [
              [500, 700],
              [701, 1000],
            ],
          },
        ]}
      />
    </div>
  );
}

export default App;
