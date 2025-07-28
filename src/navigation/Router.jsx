import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import FreshScreen from '../components/FreshScreen';
import DealsScreen from '../components/DealsScreen';
import BeautyScreen from '../components/BeautyScreen';
import MobileScreen from '../components/MobileScreen';
import FashwashScreen from '../components/FashwashScreen';
import CheckoutScreen from '../screens/CheckOutScreen';


const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="FreshScreen" component={FreshScreen} />
        <Stack.Screen name="DealsScreen" component={DealsScreen} />
        <Stack.Screen name="BeautyScreen" component={BeautyScreen} />
        <Stack.Screen name="MobileScreen" component={MobileScreen} />
        <Stack.Screen name="FashWash" component={FashwashScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
