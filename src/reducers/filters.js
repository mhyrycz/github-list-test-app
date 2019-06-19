const filtersReducerDefaultState = {
    rows: "5",
};

export default (state = filtersReducerDefaultState, action ) => {
    switch(action.type) {
        case 'SET_ROWS_DISPLAYED':
            return {
              ...state,
              rows: action.rows,
            }
        default:
            return state;
    }
};