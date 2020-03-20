interface SearchFilter {
  id: string;
  title: string;
  options: string[];
}
export const EMPTY_SEARCH_FILTER = {
  id: "",
  title: "",
  options: []
};

export default SearchFilter;
