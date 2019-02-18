import { persistReducer } from 'redux-persist';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import AppNavigator from '../Navigator';

import rootReducer from './root.reducer';
import episodesReducer from './episodes.reducer';
import playReducer from './play.reducer';
import settingsReducer from './settings.reducer';

const rootConfig = {
  key: 'primary',
  storage
};

const reducers = combineReducers({
  settings: persistReducer(rootConfig, settingsReducer),
  root: rootReducer,
  episodes: episodesReducer,
  play: playReducer,
  nav: createNavigationReducer(AppNavigator)
});

export default reducers;
