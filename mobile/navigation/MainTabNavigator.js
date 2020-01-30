import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import StoresScreen from '../screens/StoresScreen';
import MenuItemScreen from '../screens/MenuItemScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  )
};

HomeStack.path = '';

const OrderStack = createStackNavigator(
  {
    Order: OrderScreen,
    MenuItem: MenuItemScreen
  }
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cafe' : 'md-cafe'} />
  )
};

OrderStack.path = '';

const StoresStack = createStackNavigator(
  {
    Stores: StoresScreen
  }
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
  StoresStack
});

tabNavigator.path = '';

export default tabNavigator;
