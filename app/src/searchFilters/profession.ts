import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const fieldName = "profession";
const title = "מקצוע";
const options = [
  "אחר",
  "מחלקה בבי״ח",
  "מטפל.ת",
  "מעסה",
  "עוסק.ת מתחום הרפואה",
  "פאות ותוספות שיער",
  "קוסמטיקאי.ת"
];

export default getSelectBasedSearchFilter(fieldName, title, options);
