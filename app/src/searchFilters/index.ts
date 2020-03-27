import professionSearchFilter from "./profession";
import expertiseSearchFilter from "./expertise";
import areaSearchFilter from "./area";
import healthCareSearchFilter from "./healthCare";
import languageSearchFilter from "./language";
import genderSearchFilter from "./gender";

interface SearchFilterProps {
  onChange: (selectedOptions: string[]) => void;
}

export type SearchFilterRenderer = (props: SearchFilterProps) => JSX.Element;

export type SearchFilter = {
  filterKey: string;
  render: SearchFilterRenderer;
};

export const searchFilters = [
  professionSearchFilter,
  expertiseSearchFilter,
  areaSearchFilter,
  healthCareSearchFilter,
  languageSearchFilter,
  genderSearchFilter
];

export default SearchFilter;
