import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import api from '../api';
import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk.withExtraArgument(api), logger];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

persistStore(store, null, () => {
  store.getState();
});

export default store;
