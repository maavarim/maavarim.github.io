import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const fieldName = "healthCare";
const title = "קופת חולים";
const options = [
  "כללית",
  "מכבי",
  "לאומית",
  "מאוחדת",
  "פרטי",
  "בית חולים",
  "צה״ל"
];

export default getSelectBasedSearchFilter(fieldName, title, options);
