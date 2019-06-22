export const setUser = (token, login) => ({
  type: "SET_USER",
  token,
  login
});

export const resetUser = () => ({
  type: "RESET_USER"
});
