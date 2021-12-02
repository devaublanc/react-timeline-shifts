import React, { useState } from "react";
import { Slider } from "../Slider";

import styles from "./index.module.css";

// type Day =
//   | "lundi"
//   | "mardi"
//   | "mercredi"
//   | "jeudi"
//   | "vendredi"
//   | "samedi"
//   | "dimanche";
type TimelineProps = {
  start: number;
  end: number;
  sections: {
    name: string;
    color: string;
    min: number;
    max: number;
    shifts: number[][];
  }[];
};
export function Timeline({ start, end, sections }: TimelineProps) {
  const [shifts, updateShifts] = useState(sections.map(s => s.shifts).flat());
  console.log(shifts);
  const onShiftChange = (
    min: number,
    max: number,
    sectionIdx: number,
    shiftIdx: number
  ) => {
    /*
    if (update du min)
      if (le shift courant est le premier element dans sa section)
        if (il y a un shift dans la section precedente)
          regarder le max du dernier shift de la section precedentes et le set max avec currentMin - 1
        else 
          ne rien faire
      else
        prendre le shift -1 dans sla section courant et le set le max avec le currentMin - 1

    if (update du max)
      if (le shift courant est le dernier element dans sa section)
        if (il y a un shift dans la section suivante)
          regarder le min du premier shift de la section suivantes et le set au min au currentMax + 1
        else 
          ne rien faire
      else 
        prendre le shift +1 dans sla section courant et le set le max avec  le curreMax + 1
    */

    console.log(min, max, sectionIdx, shiftIdx);
  };

  return (
    <div className={styles.container}>
      {sections.map((section, sectionIdx) => {
        return section.shifts.map(([min, max], shiftIdx) => {
          return (
            <div
              className={styles.slider}
              key={`shift_${sectionIdx}_${shiftIdx}`}
            >
              <Slider
                start={start}
                end={end}
                min={min}
                max={max}
                color={section.color}
                onChange={({ min, max }) =>
                  onShiftChange(min, max, sectionIdx, shiftIdx)
                }
              />
            </div>
          );
        });
      })}
    </div>
  );
}
