export function createRandomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const parseDate = (dateAsString: string) => {
  const [year, month, day] = dateAsString.split(/\D/).map(s => +s);
  return new Date(year, month - 1, day);
};

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1);
  let day = date.getDate();

  const dayString = day < 10 ? `0${day}` : day;
  const monthString = month < 10 ? `0${month}` : month;

  return `${dayString}/${monthString}/${year}`;
}
