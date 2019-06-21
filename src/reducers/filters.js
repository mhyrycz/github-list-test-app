const filtersReducerDefaultState = {
  name: "react",
  rows: 5,
  page: 0,
  maxPage: null,
  sortBy: "stargazers_count",
  sortDirection: false
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        name: action.filters.name,
        rows: action.filters.rows,
        page: action.filters.page,
        maxPage: action.filters.maxPage,
        sortBy: action.filters.sortBy,
        sortDirection: action.filters.sortDirection
      };
    case "SET_ROWS_DISPLAYED":
      return {
        ...state,
        rows: parseInt(action.rows)
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.name
      };
    case "INCREASE_PAGE":
      return {
        ...state,
        page: state.page + 1
      };
    case "DECREASE_PAGE":
      return {
        ...state,
        page: state.page - 1
      };
    case "RESET_PAGE":
      return {
        ...state,
        page: filtersReducerDefaultState.page
      };
    case "SET_MAX_PAGE":
      const maxPage = (reposLength, rows) => {
        if (reposLength <= rows) {
          return 0;
        } else {
          return Math.ceil(reposLength / rows) - 1;
        }
      };
      return {
        ...state,
        maxPage: maxPage(action.reposLength, action.rows)
      };
    case "SET_SORT_DIRECTION":
      return {
        ...state,
        sortDirection: !state.sortDirection
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.sortBy
      };
    default:
      return state;
  }
};
