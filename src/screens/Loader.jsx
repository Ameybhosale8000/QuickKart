import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function LoaderOverlay({ visible, message }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../assets/loader.json')} // Your downloaded JSON file
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.message}>{message || 'Placing your order...'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  animation: {
    width: 150,
    height: 150,
  },
  message: {
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});