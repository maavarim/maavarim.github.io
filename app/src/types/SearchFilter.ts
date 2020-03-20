interface SearchFilter {
  id: string;
  order: number;
  title: string;
  options: string[];
}
export const getEmptySearchFilter = (order: number) => ({
  id: "",
  order,
  title: "",
  options: []
});

export default SearchFilter;
