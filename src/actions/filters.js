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
