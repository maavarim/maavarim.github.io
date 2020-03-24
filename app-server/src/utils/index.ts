export const objectMap = (obj: any, fn: (originalValue: any) => any) =>
  Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [k]: fn(v) })));
