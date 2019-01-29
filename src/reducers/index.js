import { persistReducer } from 'redux-persist';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import AppNavigator from '../Navigator';

import rootReducer from './root.reducer';
import episodesReducer from './episodes.reducer';
import playReducer from './play.reducer';

const rootConfig = {
  key: 'primary',
  storage,
  blacklist: ['searchTerm', 'results']
};

const reducers = combineReducers({
  //root: persistReducer(rootConfig, rootReducer)
  root: rootReducer,
  episodes: episodesReducer,
  play: playReducer,
  nav: createNavigationReducer(AppNavigator)
});

export default reducers;
