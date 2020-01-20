import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);
