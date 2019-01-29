import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeComponent from './views/home';
import EpisodesComponent from './views/episodes';
import PlayComponent from './views/play';

const Navigation = createStackNavigator(
  {
    Home: HomeComponent,
    Podcast: EpisodesComponent,
    Play: PlayComponent
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(Navigation);
