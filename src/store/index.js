import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducer';

const enhancer = [thunk];

if (process.env.NODE_ENV === 'development') {
  enhancer.push(logger);
}

const store = createStore(reducer, applyMiddleware(...enhancer));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
