import React, { ReactElement } from "react";

import styles from "./index.module.css";

type WeekProps = {
  lang?: string;
  children: ReactElement;
};

export function Week({ lang, children }: WeekProps) {
  return (
    <div className={styles.container}>
      <div className={styles.weeks}>
        <div className={styles.day}>
          <div className={styles.title}>Lundi</div>
          <div className={styles.hours}>
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
            <div className={styles.hour} />
          </div>
        </div>
        <div className={styles.day}>Mardi</div>
        <div className={styles.day}>Mercredi</div>
        <div className={styles.day}>Jeudi</div>
        <div className={styles.day}>Vendredi</div>
        <div className={styles.day}>Samedi</div>
        <div className={styles.day}>Dimanche</div>
      </div>
      <div className={styles.timeline}>{children}</div>
    </div>
  );
}
