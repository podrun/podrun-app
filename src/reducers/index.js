import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './root.reducer';
import { combineReducers } from 'redux';
//import navReducer from './navigation.reducer';

const rootConfig = {
  key: 'primary',
  storage,
  blacklist: ['searchTerm', 'results']
};

const reducers = combineReducers({
  //root: persistReducer(rootConfig, rootReducer)
  root: rootReducer
  //nav: navReducer
});

export default reducers;
