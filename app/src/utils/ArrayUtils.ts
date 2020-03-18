export const splitIntoPairs = <T>(array: T[]) =>
  array.reduce((result, _, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, new Array<Array<T>>());
