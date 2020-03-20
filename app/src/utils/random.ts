export const randomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * charactersLength))
  ).join("");
};

export const newRandomString = (existingValues: string[], length: number) => {
  let result: string;
  do {
    result = randomString(length);
  } while (existingValues.indexOf(result) > -1);
  return result;
};
