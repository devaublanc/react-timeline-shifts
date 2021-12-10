import React, { ReactElement } from "react";

import styles from "./index.module.css";

type WeekProps = {
  lang?: string;
  children: ReactElement;
};

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export function Week({ lang, children }: WeekProps) {
  return (
    <div className={styles.container}>
      <div className={styles.weeks}>
        {days.map(day => (
          <div className={styles.day} key={day}>
            <div className={styles.title}>{day}</div>
            <div className={styles.hours}>
              <div
                className={styles.step}
                style={{
                  left: 0,
                }}
              >
                00h00
              </div>
              <div
                className={styles.step}
                style={{
                  left: "50%",
                }}
              >
                12h00
              </div>
              {Array.from(Array(12), (e, i) => (
                <div className={styles.hour} key={`hour_${i}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.timeline}>{children}</div>
    </div>
  );
}
