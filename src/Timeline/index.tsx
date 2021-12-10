import React, { useEffect, useMemo, useState } from "react";
import { Slider, SliderState } from "../Slider";
import produce from "immer";

import styles from "./index.module.css";
import { getInitialConstraints } from "./helpers";

type TimelineProps = {
  duration: number;
  sections: {
    name: string;
    color: string;
    min?: number;
    max?: number;
    shifts: number[][];
  }[];
};

export function Timeline({ duration, sections }: TimelineProps) {
  const [sectionsState, updateSectionsState] = useState(
    sections.map(s => s.shifts)
  );

  const [sectionsConstraints, updateSectionsConstraints] = useState(
    getInitialConstraints(sectionsState, duration)
  );

  const onShiftChange = (
    { min, max, handleKind }: SliderState,
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

    // if this is the min handle that has been updated
    if (handleKind === "MIN") {
      if (
        // if the current shift is the first entry from its section
        sectionsState[sectionIdx].indexOf(
          sectionsState[sectionIdx][shiftIdx]
        ) === 0 &&
        // If there is a shift in the previous section
        sectionsState[sectionIdx - 1]
      ) {
        // look at the max of the last shift from the previous section and set its max with the sliderState.min - 1
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][0] = min;
          })
        );
      } else {
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][0] = min;
          })
        );
      }
    }

    if (handleKind === "MAX") {
      if (
        // if the current shift is the last one from the section
        sectionsState[sectionIdx].indexOf(
          sectionsState[sectionIdx][shiftIdx]
        ) ===
          sectionsState[sectionIdx].length - 1 &&
        // if there is a shift in the next section
        sectionsState[sectionIdx + 1]
      ) {
        // look at the min of the first shift from the next section and set its min with the sliderState.max + 1
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][1] = max;
          })
        );
      } else {
        // take the shift + 1 from the current section and set its min with the sliderStart.max + 1
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][1] = max;
          })
        );
      }
    }
  };

  const handlePressAdd = (sectionIdx: number, shiftIdx: number) => {
    const currentShift = sectionsState[sectionIdx][shiftIdx];

    const nextShift =
      sectionsState[sectionIdx][shiftIdx + 1] ||
      (sectionsState[sectionIdx + 1]
        ? sectionsState[sectionIdx + 1][0]
        : undefined);

    const min = currentShift[1];
    const max = Math.min(
      sections[sectionIdx].max ?? Infinity,
      nextShift ? nextShift[0] : duration
    );
    const start = Math.round(min + ((max - min) * 0.5) / 2);
    const end = Math.ceil(max - ((max - min) * 0.5) / 2);

    updateSectionsState(
      produce(draft => {
        // draft[sectionIdx].splice(shiftIdx + 1, 0, [start, end]);
        draft[sectionIdx].splice(shiftIdx + 1, 0, [start, end]);
      })
    );
  };

  useEffect(() => {
    updateSectionsConstraints(getInitialConstraints(sectionsState, duration));
  }, [sectionsState, duration]);

  const sectionsIds = useMemo(() => {
    const map: Record<string, number> = {};
    sectionsState.forEach((section, sectionIdx) => {
      section.forEach((shift, shiftIdx) => {
        map[`shift_${sectionIdx}_${shiftIdx}`] = Math.floor(
          Math.random() * 1000
        );
      });
    }, {});
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionsState.flat().length]);


  return (
    <div className={styles.container}>
      {sectionsState.map((section, sectionIdx) => {
        const currentSection = sections[sectionIdx];
        return section.map(([min, max], shiftIdx) => {
          const currentConstraint = sectionsConstraints[sectionIdx][shiftIdx];
          return (
            <div
              className={styles.slider}
              key={sectionsIds[`shift_${sectionIdx}_${shiftIdx}`]}
              // key={`shift_${sectionIdx}_${shiftIdx}`}
            >
              <Slider
                start={0}
                end={duration}
                min={min}
                max={max}
                onPressAdd={() => handlePressAdd(sectionIdx, shiftIdx)}
                constraintMin={
                  currentConstraint
                    ? Math.max(currentConstraint[0], currentSection.min ?? 0)
                    : 0
                }
                constraintMax={
                  currentConstraint
                    ? Math.min(
                        currentConstraint[1],
                        currentSection.max ?? Infinity
                      )
                    : 0
                }
                color={sections[sectionIdx].color}
                onChange={sliderState =>
                  onShiftChange(sliderState, sectionIdx, shiftIdx)
                }
              />
            </div>
          );
        });
      })}
    </div>
  );
}
