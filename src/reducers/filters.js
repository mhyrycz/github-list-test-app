const filtersReducerDefaultState = {
    name: "react",
    rows: "5",
};

export default (state = filtersReducerDefaultState, action ) => {
    switch(action.type) {
        case 'SET_ROWS_DISPLAYED':
            return {
              ...state,
              rows: action.rows,
            }
        case 'SET_NAME':
            return {
              ...state,
              name: action.name,
            }
        default:
            return state;
    }
};