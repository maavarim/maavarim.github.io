export const setMap = <K, V>(map: Map<K, V>, key: K, value: V) => {
  const newMap = new Map(map);
  newMap.set(key, value);
  return newMap;
};
