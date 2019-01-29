import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import store from './store';
import AppNavigator from './Navigator';

import { reduxifyNavigator } from 'react-navigation-redux-helpers';
// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator

const AppNav = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(AppNav);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
