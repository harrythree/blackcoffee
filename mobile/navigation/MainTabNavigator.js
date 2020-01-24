import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import StoresScreen from '../screens/StoresScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

HomeStack.path = '';

const OrderStack = createStackNavigator(
  {
    Order: OrderScreen,
  },
  config
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cafe' : 'md-cafe'} />
  ),
};

OrderStack.path = '';

const StoresStack = createStackNavigator(
  {
    Stores: StoresScreen,
  },
  config
);

StoresStack.navigationOptions = {
  tabBarLabel: 'Stores',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} />
  ),
};

StoresStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  OrderStack,
  StoresStack,
});

tabNavigator.path = '';

export default tabNavigator;
