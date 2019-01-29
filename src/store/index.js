import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createDebounce from 'redux-debounced';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import api from '../api';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const middlewares = [
  thunk.withExtraArgument(api),
  logger,
  navMiddleware,
  createDebounce()
];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

persistStore(store, null, () => {
  store.getState();
});

export default store;
