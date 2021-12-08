import React, { useState } from "react";
import { Slider, SliderState } from "../Slider";
import produce from "immer";

import styles from "./index.module.css";

type TimelineProps = {
  start: number;
  end: number;
  sections: {
    name: string;
    color: string;
    min?: number;
    max?: number;
    shifts: number[][];
  }[];
};

const getInitialConstraints = (sections: number[][][], duration: number) => {
  return sections.reduce(
    (
      constraints: Record<number, number[][]>,
      shifts,
      sectionIndex,
      sections
    ) => {
      constraints[sectionIndex] = shifts.map(
        (shift: number[], shiftIndex: number) => {
          let min = shift[0];
          let max = shift[1];

          // si il y a un shift precédent dans la mm section le min devient le max de la section précédente
          if (shifts[shiftIndex - 1]) {
            min = shifts[shiftIndex - 1][1] + 1;
          }
          // Si il n'y a pas de shift précédent dans la section courante, prendre le dernier shift de la section precedente
          else if (
            sections[sectionIndex - 1] &&
            sections[sectionIndex - 1][sections[sectionIndex - 1].length - 1]
          ) {
            min =
              sections[sectionIndex - 1][
                sections[sectionIndex - 1].length - 1
              ][1] + 1;
          } else {
            min = 0;
          }

          // si il y a un shift suivant dans la mm section le max devient le min de la section suivante
          if (shifts[shiftIndex + 1]) {
            max = shifts[shiftIndex + 1][0] - 1;
          }
          // Si il n'y a pas de shift suivant dans la section courante prendre le premier shift de la section suivante
          else if (
            sections[sectionIndex + 1] &&
            sections[sectionIndex + 1][0]
          ) {
            max = sections[sectionIndex + 1][0][0] - 1;
          } else {
            max = duration;
          }

          return [min, max];
        }
      );
      return constraints;
    },
    []
  );
};

export function Timeline({ start, end, sections }: TimelineProps) {
  const [sectionsState, updateSectionsState] = useState(
    sections.map(s => s.shifts)
  );

  const [sectionsConstraints, updateSectionsConstraints] = useState(
    getInitialConstraints(sectionsState, end)
  );

  const onShiftChange = (
    { min, max, moveType, handleKind }: SliderState,
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
      // if the current shift is the first entry from its section
      if (
        sectionsState[sectionIdx].indexOf(
          sectionsState[sectionIdx][shiftIdx]
        ) === 0
      ) {
        // If there is a shift in the previous section
        if (sectionsState[sectionIdx - 1]) {
          // look at the max of the last shift from the previous section and set its max with the sliderState.min - 1
          updateSectionsConstraints(
            produce(draft => {
              // update the previous
              draft[sectionIdx - 1][
                sectionsState[sectionIdx - 1].length - 1
              ][1] = min - 1;
            })
          );
          updateSectionsState(
            produce(draft => {
              // update the current
              draft[sectionIdx][shiftIdx][0] = min;
            })
          );
        }
      } else {
        // take the shift - 1 in the current setion and set this max to the sliderStart.min - 1
        updateSectionsConstraints(
          produce(draft => {
            // update the previous
            draft[sectionIdx][shiftIdx - 1][1] = min - 1;
          })
        );
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][0] = min;
          })
        );
      }
    }

    if (handleKind === "MAX") {
      // le shift courant est le dernier element dans sa section
      // if the current shift is the last one from the section
      if (
        sectionsState[sectionIdx].indexOf(
          sectionsState[sectionIdx][shiftIdx]
        ) ===
        sectionsState[sectionIdx].length - 1
      ) {
        // if there is a shift in the next section
        if (sectionsState[sectionIdx + 1]) {
          // look at the min of the first shift from the next section and set its min with the sliderState.max + 1
          updateSectionsConstraints(
            produce(draft => {
              // update the next
              draft[sectionIdx + 1][0][0] = max + 1;
            })
          );
          updateSectionsState(
            produce(draft => {
              // update the current
              draft[sectionIdx][shiftIdx][1] = max;
            })
          );
        }
      } else {
        // take the shift + 1 from the current section and set its min with the sliderStart.max + 1

        updateSectionsConstraints(
          produce(draft => {
            // update the previous
            draft[sectionIdx][shiftIdx + 1][0] = max + 1;
          })
        );
        updateSectionsState(
          produce(draft => {
            // update the current
            draft[sectionIdx][shiftIdx][1] = max;
          })
        );
      }
    }
    // console.log(min, max, moveType, handleKind, sectionIdx, shiftIdx);
  };

  return (
    <div className={styles.container}>
      {sectionsState.map((section, sectionIdx) => {
        const currentSection = sections[sectionIdx];
        return section.map(([min, max], shiftIdx) => {
          const currentConstraint = sectionsConstraints[sectionIdx][shiftIdx];
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
                constraintMin={Math.max(
                  currentConstraint[0],
                  currentSection.min ?? 0
                )}
                constraintMax={Math.min(
                  currentConstraint[1],
                  currentSection.max ?? Infinity
                )}
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
