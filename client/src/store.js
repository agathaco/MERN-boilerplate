import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// The redux-thunk middleware allows simple asynchronous use of dispatch.
const middleware = [thunk];

// creating the store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// a simple configuration of the store, without extensions, would be:
// const store = createStore(rootReducer)

export default store;