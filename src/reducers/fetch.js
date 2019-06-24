const fetchReducerDefaultState = {
  loading: false,
  error: null
};

export default (state = fetchReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_FETCH":
      return {
        ...state,
        loading: action.fetch.loading,
        error: action.fetch.error
      };
    case "RESET_FETCH":
      return fetchReducerDefaultState;
    case "LOADING_ON":
      return {
        ...state,
        loading: true
      };
    case "LOADING_OFF":
      return {
        ...state,
        loading: false
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          message: action.error.data.message,
          status: action.error.status
        }
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: fetchReducerDefaultState.error
      };
    default:
      return state;
  }
};
