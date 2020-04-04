import professionSearchFilter from "./profession";
import expertiseSearchFilter from "./expertise";
import areaSearchFilter from "./area";
import healthCareSearchFilter from "./healthCare";
import languageSearchFilter from "./language";
import genderSearchFilter from "./gender";
import { SelectProps } from "@material-ui/core";

interface SearchFilterProps {
  value: string[];
  onChange: (selectedOptions: string[]) => void;
  selectProps?: SelectProps;
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
  genderSearchFilter,
];

export default SearchFilter;
