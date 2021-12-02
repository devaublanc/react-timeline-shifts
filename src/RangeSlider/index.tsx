import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.css";

type RangeSliderProps = {
  start: number;
  end: number;
  onChange: (data: { min: number; max: number }) => void;
  color: string;
  min: number;
  max: number;
};
export function RangeSlider({
  start,
  end,
  onChange,
  color,
  min,
  max,
}: RangeSliderProps) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<any>(null); // TODO: ts
  const maxValRef = useRef<any>(null); // TODO: ts
  const range = useRef<any>(null); // TODO: ts

  console.log(minVal);

  // Convert to percentage
  const getPercent = useCallback(
    value => Math.round(((value - start) / (end - start)) * 100),
    [start, end]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={start}
        max={end}
        value={minVal}
        ref={minValRef}
        onChange={event => {
          const value = Math.min(+event.target.value, maxVal - 1);
          if (value < min) return;
          setMinVal(value);
          event.target.value = value.toString();
        }}
        // className={classnames("thumb thumb--zindex-3", {
        //   "thumb--zindex-5": minVal > max - 100
        // })}
        className={classnames(styles.thumb, styles.zIndex3, {
          [styles.zIndex5]: minVal > end - 100,
        })}
        // className={styles.}
      />
      <input
        type="range"
        min={start}
        max={end}
        value={maxVal}
        ref={maxValRef}
        onChange={event => {
          const value = Math.max(+event.target.value, minVal + 1);
          if (value > max) return;
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        // className="thumb thumb--zindex-4"
        className={classnames(styles.thumb, styles.zIndex4)}
      />

      <div className={styles.slider}>
        <div className={styles.track} />
        <div
          ref={range}
          className={styles.range}
          style={{
            background: color,
          }}
        />
        <div className={styles.valueStart}>{minVal}</div>
        <div className={styles.valueEnd}>{maxVal}</div>
      </div>
    </div>
  );
}
