import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeComponent from './views/home';

const Navigation = createStackNavigator(
  {
    Home: { screen: HomeComponent }
  },
  {
    Podcast: { screen: HomeComponent }
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(Navigation);
