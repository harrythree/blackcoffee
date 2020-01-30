import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import LoginModal from '../screens/LoginModal';
import RegisterModal from '../screens/RegisterModal';

const RootStack = createStackNavigator(
  {
    Main: MainTabNavigator,
    LoginModal,
    RegisterModal
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default createAppContainer(RootStack);
