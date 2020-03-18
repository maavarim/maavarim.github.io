export interface SearchFilterOption {
  id: string;
  title: string;
  firestoreValues: string[];
}

interface SearchFilter {
  id: string;
  title: string;
  options: SearchFilterOption[];
  firestoreFieldName: string;
}

export default SearchFilter;
