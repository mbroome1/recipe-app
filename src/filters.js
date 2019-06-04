const filters = {
  searchText: ""
};

const getFilters = () => filters;

const setFilters = newFilters => {
  if (typeof newFilters.searchText === "string") {
    filters.searchText = newFilters.searchText;
  }
};
export { getFilters, setFilters };
