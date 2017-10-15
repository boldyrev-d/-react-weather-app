import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = [thunk];

if (process.env.NODE_ENV === 'development') {
  enhancer.push(logger);
}

const store = createStore(reducer, composeEnhancers(applyMiddleware(...enhancer)));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
