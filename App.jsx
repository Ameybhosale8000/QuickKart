import { View, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import Router from './src/navigation/Router';
import { CartProvider } from './CartContext'; // ✅ Import your Cart context

const App = () => {
  return (
    <CartProvider>
      <View style={styles.container}>
        <StatusBar
        
          hidden={true}
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Router />
      </View>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
