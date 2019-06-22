const userReducerDefaultState = {
    token: "",
    login: ""
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        token: action.token,
        login: action.login
      };
    case "RESET_USER":
      return userReducerDefaultState;
    default:
      return state;
  }
};
