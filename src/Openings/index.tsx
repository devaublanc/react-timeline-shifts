import React from "react";
import { days } from "../Week";
import format from "date-fns/format";

import styles from "./index.module.css";

type OpeningsProps = {
  sections: number[][][];
};
export const getUTCDateFromMinutes = (minutes: number) => {
  const date = new Date();
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0,
    minutes,
    0
  );
};

export const getDateFromMinutes = (minutes: number) => {
  const date = new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    minutes,
    0
  );
};

// const openingHours = warehouseHoursFromMonday.map((hour, i) => {
//   return {
//     day: format(addDays(firstDayOfWeek, i), 'EEEE', {locale: fr}),
//     openingAt: format(
//       getUTCDateFromMinutes(hour.open_time_minutes!),
//       'HH:mm',
//     ),
//     closingAt: format(
//       getUTCDateFromMinutes(hour.close_time_minutes!),
//       'HH:mm',
//     ),
//   };
// });

export function Openings({ sections }: OpeningsProps) {
  return (
    <div className={styles.container}>
      {sections.map((section, sectionIdx) => {
        return (
          <div className={styles.day} key={`section_${sectionIdx}`}>
            <h3>{days[sectionIdx]}</h3>
            <div>
              {section.map((shift, shiftIdx) => {
                return (
                  <div className={styles.hours} key={`shift_${shiftIdx}`}>
                    {format(getDateFromMinutes(shift[0]), "HH:mm a")}-{" "}
                    {format(getDateFromMinutes(shift[1]), "HH:mm a")}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
