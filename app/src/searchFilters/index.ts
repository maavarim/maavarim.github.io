import professionSearchFilter from "./profession";
import expertiseSearchFilter from "./expertise";
import areaSearchFilter from "./area";
import healthCareSearchFilter from "./healthCare";
import languageSearchFilter from "./language";
import genderSearchFilter from "./gender";

interface SearchFilter {
  firebaseFieldName: string;
  title: string;
  options: string[];
}

export const searchFilters = [
  professionSearchFilter,
  expertiseSearchFilter,
  areaSearchFilter,
  healthCareSearchFilter,
  languageSearchFilter,
  genderSearchFilter
];

export default SearchFilter;
