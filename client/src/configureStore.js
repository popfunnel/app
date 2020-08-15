import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
  return store
}