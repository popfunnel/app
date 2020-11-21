import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore() {
    const persistedState = loadState();
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares))

    store.subscribe(() => saveState(store.getState()));
    
    return store
}

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        };

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
    
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        // Log errors
    }
}