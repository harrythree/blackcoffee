import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const authNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default authNavigator;
