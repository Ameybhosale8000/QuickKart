import { View, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <HomeScreen />
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
