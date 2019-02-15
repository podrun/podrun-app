import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeComponent from './views/home';
import EpisodesComponent from './views/episodes';
import PlayComponent from './views/play';
import SettingsComponent from './views/settings';

const Navigation = createStackNavigator(
  {
    Home: HomeComponent,
    Podcast: EpisodesComponent,
    Play: PlayComponent,
    Settings: SettingsComponent
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(Navigation);
