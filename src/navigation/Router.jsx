import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CartProvider } from '../../CartContext'

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
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import ProductDetails from '../screens/ProductDetails';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import book from '../categoriedata/book';

import grocery from '../categoriedata/grocery';

import makeup from '../categoriedata/makeup';

import toy from '../categoriedata/toy';

import FashionScreen from '../components/fashion';

import Pay from '../screens/PayScreen';
import Brands from '../components/Brands';
import SearchScreen from '../Bottom/SearchScreen';
import FoodScreen from '../categoriedata/foodScreen';
import fashionScreen from '../categoriedata/fashionScreen';


const Stack = createStackNavigator();

const Router = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />

          {/* Other screens still work */}
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="FreshScreen" component={FreshScreen} />
          <Stack.Screen name="DealsScreen" component={DealsScreen} />
          <Stack.Screen name="BeautyScreen" component={BeautyScreen} />
          <Stack.Screen name="MobileScreen" component={MobileScreen} />
          <Stack.Screen name="FashWash" component={FashwashScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen name="OrderPlacedScreen" component={OrderPlacedScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="book" component={book} />
          <Stack.Screen name="grocery" component={grocery} />
          <Stack.Screen name="makeup" component={makeup} />
          <Stack.Screen name="toy" component={toy} />
          <Stack.Screen name="fashion" component={FashionScreen} />
          <Stack.Screen name="Pay" component={Pay} />
          <Stack.Screen name="brand" component={Brands} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="FoodScreen" component={FoodScreen} />
          <Stack.Screen name="fashionScreen" component={fashionScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default Router;
