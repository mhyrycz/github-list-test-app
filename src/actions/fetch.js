export const setFetch = fetch => ({
  type: "SET_FETCH",
  fetch
});

export const setLoadingOn = () => ({
  type: "LOADING_ON"
});

export const setLoadingOff = () => ({
  type: "LOADING_OFF"
});

export const setError = error => ({
  type: "SET_ERROR",
  error
});

export const resetError = () => ({
  type: "RESET_ERROR"
});
