import { View, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import Router from './src/navigation/Router';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Router />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ MUST for parent container
    backgroundColor: '#fff', // optional but recommended
  },
});

export default App;
