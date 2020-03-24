import { getSelectBasedSearchFilter } from "./SelectBasedSearchFilter";

const fieldName = "gender";
const title = "מגדר";
const options = ["אחר", "אישה", "גבר"];

export default getSelectBasedSearchFilter(fieldName, title, options);
