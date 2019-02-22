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
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#004363',
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerTintColor: '#faf6bc',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#faf6bc'
      }
    }
  }
);

export default createAppContainer(Navigation);
