import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const fieldName = "language";
const title = "שפה";
const options = [
  "עברית",
  "אנגלית",
  "רוסית",
  "ערבית",
  "צרפתית",
  "גרמנית",
  "ספרדית",
  "פורטוגזית",
  "איטלקית"
];

export default getSelectBasedSearchFilter(fieldName, title, options);
