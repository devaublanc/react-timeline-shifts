export const getInitialConstraints = (
  sections: number[][][],
  duration: number
) => {
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
