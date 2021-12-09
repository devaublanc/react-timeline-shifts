import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./index.module.css";

type SliderMoveType = "DECREASE" | "INCREASE";
type SliderHandleKind = "MIN" | "MAX";
export type SliderState = {
  min: number;
  max: number;
  moveType?: SliderMoveType;
  handleKind?: SliderHandleKind;
};

type SliderProps = {
  start: number;
  end: number;
  onChange: (data: SliderState) => void;
  color: string;
  min: number;
  max: number;
  constraintMin: number;
  constraintMax: number;
  onPressAdd?: (() => void) | null;
};

export function Slider({
  start,
  end,
  onChange,
  color,
  min,
  max,
  constraintMin,
  constraintMax,
  onPressAdd,
}: SliderProps) {
  const [state, setState] = useState<SliderState>({
    min,
    max,
  });

  const minValRef = useRef<any>(null); // TODO: ts
  const maxValRef = useRef<any>(null); // TODO: ts
  const range = useRef<any>(null); // TODO: ts

  // Convert to percentage
  const getPercent = useCallback(
    value => Math.round(((value - start) / (end - start)) * 100),
    [start, end]
  );

  const onChangeMin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(+event.target.value, state.max - 1);
      if (value < constraintMin) return;
      setState({
        ...state,
        moveType: state.min < value ? "INCREASE" : "DECREASE",
        handleKind: "MIN",
        min: value,
      });
      event.target.value = value.toString();
    },
    [state, constraintMin]
  );

  const onChangeMax = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(+event.target.value, state.min + 1);
      if (value > constraintMax) return;
      setState({
        ...state,
        moveType: state.max < value ? "INCREASE" : "DECREASE",
        handleKind: "MAX",
        max: value,
      });
      event.target.value = value.toString();
    },
    [state, constraintMax]
  );

  // Get min and max values when their state changes
  useEffect(() => {
    onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const minPercent = getPercent(state.min);
  const maxPercent = getPercent(state.max);

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={start}
        max={end}
        value={state.min}
        ref={minValRef}
        onChange={onChangeMin}
        className={classnames(styles.thumb, styles.zIndex3, {
          [styles.zIndex5]: state.min > end - 100,
        })}
      />
      <input
        type="range"
        min={start}
        max={end}
        value={state.max}
        ref={maxValRef}
        onChange={onChangeMax}
        className={classnames(styles.thumb, styles.zIndex4)}
      />

      <div className={styles.slider}>
        <div className={styles.track} />
        <div
          ref={range}
          className={styles.range}
          style={{
            background: color,
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        >
          <div className={styles.valueStart}>
            {state.min} (min: {constraintMin})
          </div>
          <div className={styles.valueEnd}>
            {state.max} max: ({constraintMax})
          </div>
          {onPressAdd && state.max < constraintMax && (
            <div className={styles.addRangeBtn} onClick={onPressAdd} />
          )}
        </div>
      </div>
    </div>
  );
}
