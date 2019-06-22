export const setFilters = filters => ({
  type: "SET_FILTERS",
  filters
});

export const resetFilters = () => ({
  type: "RESET_FILTERS"
});

export const setRowsDisplayed = rows => ({
  type: "SET_ROWS_DISPLAYED",
  rows
});

export const setName = name => ({
  type: "SET_NAME",
  name
});

export const increasePage = () => ({
  type: "INCREASE_PAGE"
});

export const decreasePage = () => ({
  type: "DECREASE_PAGE"
});

export const resetPage = () => ({
  type: "RESET_PAGE"
});

export const setMaxPage = (reposLength, rows) => ({
  type: "SET_MAX_PAGE",
  reposLength,
  rows
});

export const setSortDirection = () => ({
  type: "SET_SORT_DIRECTION"
});

export const setSortBy = sortBy => ({
  type: "SET_SORT_BY",
  sortBy
});
