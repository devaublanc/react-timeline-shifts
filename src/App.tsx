import React, { useState } from "react";
import { Timeline } from "./Timeline";
import "./App.css";
import { Week } from "./Week";
import { Openings } from "./Openings";

function App() {
  const [sections, setSections] = useState<number[][][]>([]);
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
          duration={10080}
          onChange={setSections}
          sections={[
            {
              name: "lundi",
              color: "red",
              min: 0,
              max: 2159,
              shifts: [
                [480, 1080], // il peut aller de 0 à 199
                // [1500, 1800], // il peut aller de 101 à 399
              ],
            },
            {
              name: "mardi",
              color: "blue",
              min: 1440,
              max: 3599,
              shifts: [
                [2000, 2800],
              ],
            },
            {
              name: "mercredi",
              color: "green",
              min: 2880,
              max: 5039,
              shifts: [
                [3300, 4000],
              ],
            },
            {
              name: "jeudi",
              color: "yellow",
              min: 4320,
              max: 6479,
              shifts: [
                [4500, 5000],
              ],
            },
            {
              name: "vendredi",
              color: "purple",
              min: 5760,
              max: 7919,
              shifts: [
                [6000, 7000],
              ],
            },
            {
              name: "samedi",
              color: "pink",
              min: 7200,
              max: 9359,
              shifts: [
                [7500, 8300],
              ],
            },
            {
              name: "dimanche",
              color: "orange",
              min: 8640,
              max: 10799,
              shifts: [
                [9000, 9800],
              ],
            },
            // {
            //   name: "vendredi",
            //   color: "purple",
            //   min: 4320,
            //   max: 6479,
            //   shifts: [
            //     [4500, 5000],
            //   ],
            // },
          ]}
          // sections={[
          //   {
          //     name: "lundi",
          //     color: "red",
          //     min: 0,
          //     max: 500,
          //     shifts: [
          //       [0, 100], // il peut aller de 0 à 199
          //       [200, 300], // il peut aller de 101 à 399
          //     ],
          //   },
          //   {
          //     name: "mardi",
          //     color: "blue",
          //     min: 200,
          //     max: 900,
          //     shifts: [
          //       [400, 500], // il peut aller de 301 à 599
          //       [600, 700], // il peut aller de 501 à 700
          //     ],
          //   },
          // ]}
        />
      </Week>
      <Openings sections={sections} />
    </div>
  );
}

export default App;
