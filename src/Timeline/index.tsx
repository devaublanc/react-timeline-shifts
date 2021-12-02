import React from "react";
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
  return (
    <div className={styles.container}>
      {sections.map((section, indexSection) => {
        return section.shifts.map(([min, max], indexShift) => {
          return (
            <div
              className={styles.slider}
              key={`shift_${indexSection}_${indexShift}`}
            >
              <Slider
                start={start}
                end={end}
                min={min}
                max={max}
                color={section.color}
                onChange={() => {}}
              />
            </div>
          );
        });
      })}
    </div>
  );
}
