import professionSearchFilter from "./profession";
import expertiseSearchFilter from "./expertise";
import areaSearchFilter from "./area";
import healthCareSearchFilter from "./healthCare";
import languageSearchFilter from "./language";
import genderSearchFilter from "./gender";

interface SearchFilterProps {
  onChange: (
    filterKey: string,
    selectedOptions: string[]
  ) => void;
}

export type SearchFilter = (props: SearchFilterProps) => JSX.Element;

export const searchFilters = [
  professionSearchFilter,
  expertiseSearchFilter,
  areaSearchFilter,
  healthCareSearchFilter,
  languageSearchFilter,
  genderSearchFilter
];

export default SearchFilter;
