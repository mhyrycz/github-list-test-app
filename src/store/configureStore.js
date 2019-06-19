import { createStore, combineReducers } from 'redux';
import repositoriesReducer from '../reducers/repositories';

export default () => {
    const store = createStore(
        combineReducers({
            repositories: repositoriesReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};