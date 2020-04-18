export const reduceNulls = <T>(array: (T | null)[]) =>
  array.indexOf(null) > -1 ? null : (array as T[]);

export const moveElementUp = <T>(array: T[], index: number) =>
  index === 0
    ? array
    : [
        ...array.slice(0, index - 1),
        array[index],
        array[index - 1],
        ...array.slice(index + 1),
      ];

export const iterableSome = <T>(
  iterable: IterableIterator<T>,
  callbackfn: (value: T) => boolean
) => {
  let current = iterable.next();
  while (!current.done) {
    if (callbackfn(current.value)) return true;
    current = iterable.next();
  }
  return false;
};

export const formatForDisplaying = (array: string[]) => array.join(" · ");

export const average = (array: number[]) =>
  array.reduce((prev, curr) => prev + curr) / array.length;
