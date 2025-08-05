import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProductScreen from '../screens/ProductScreen';
import FreshScreen from '../components/FreshScreen';
import DealsScreen from '../components/DealsScreen';
import BeautyScreen from '../components/BeautyScreen';
import MobileScreen from '../components/MobileScreen';
import FashwashScreen from '../components/FacewashScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
import BottomTabNavigator from '../navigation/BottomTabNavigator';  // << ADD THIS

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />

       
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator}  />

        {/* Other screens still work */}
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="FreshScreen" component={FreshScreen} />
        <Stack.Screen name="DealsScreen" component={DealsScreen} />
        <Stack.Screen name="BeautyScreen" component={BeautyScreen} />
        <Stack.Screen name="MobileScreen" component={MobileScreen} />
        <Stack.Screen name="FashWash" component={FashwashScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="OrderPlacedScreen" component={OrderPlacedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
