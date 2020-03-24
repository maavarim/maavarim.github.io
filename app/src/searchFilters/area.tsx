import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const firebaseFieldName = "area";
const title = "אזור";
const options = [
  "אזור אשקלון",
  "אזור חדרה",
  "אזור נתניה",
  "אילת והערבה",
  "באר שבע והנגב",
  "גוש דן",
  "גליל ועמקים",
  "המשולש",
  "חיפה והקריות",
  "יהודה ושומרון",
  "ירושלים והסביבה",
  "רמלה, לוד והאזור",
  "רמת הגולן",
  "רעננה והסביבה",
  "שפלה"
];

export default getSelectBasedSearchFilter(firebaseFieldName, title, options);
