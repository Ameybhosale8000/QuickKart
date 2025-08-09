import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';

import CategoriesScreen from '../Bottom/CategoriesScreen';
import AccountScreen from '../Bottom/AccountScreen';
import CartScreen from '../Bottom/CartScreen ';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator  
      screenOptions={({ route }) => ({
         headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
           
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
          }

          return (
            <View>
              <Icon name={iconName} size={25} color={color} />
              {route.name === 'Cart' && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                    minWidth: 18,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>
                    27
                  </Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
