import { createStore, combineReducers } from "redux";
import repositoriesReducer from "../reducers/repositories";
import filtersReducer from "../reducers/filters";
import fetchReducer from "../reducers/fetch";

export default () => {
  const store = createStore(
    combineReducers({
      repositories: repositoriesReducer,
      filters: filtersReducer,
      fetch: fetchReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
