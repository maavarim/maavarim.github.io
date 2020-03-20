export const splitIntoPairs = <T>(array: T[]) =>
  array.reduce((result, _, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, new Array<Array<T>>());

export const reduceNulls = <T>(array: (T | null)[]) =>
  array.indexOf(null) > -1 ? null : (array as T[]);

export const moveElementUp = <T>(array: T[], index: number) =>
  index === 0
    ? array
    : [
        ...array.slice(0, index - 1),
        array[index],
        array[index - 1],
        ...array.slice(index + 1)
      ];
