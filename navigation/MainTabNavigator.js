import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DescuentosScreen from '../screens/DescuentosScreen';
import ReservasScreen from '../screens/ReservasScreen';
import SettingsScreen from '../screens/SettingsScreen';

console.disableYellowBox = true;



const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Ofertas Flash',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-flash${focused ? '' : '-outline'}`
          : 'md-flash'
      }
    />
  ),
};

const DescuentosStack = createStackNavigator({
  Links: DescuentosScreen,
});

DescuentosStack.navigationOptions = {
  tabBarLabel: 'Descuentos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pricetag' : 'md-pricetag'}
    />
  ),
};

const ReservasStack = createStackNavigator({
  Settings: ReservasScreen,
});

ReservasStack.navigationOptions = {
  tabBarLabel: 'Reservas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  DescuentosStack,
  ReservasStack,
  SettingsStack,
});
