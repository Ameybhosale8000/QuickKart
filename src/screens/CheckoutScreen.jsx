import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Firebase SDK imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Use your Firebase project databaseURL here
const firebaseConfig = {
  databaseURL: 'https://quickkart-9b466-default-rtdb.firebaseio.com',
};

// Initialize Firebase app once
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const CheckoutScreen = ({ route, navigation }) => {
  const { productName, price, image } = route.params;

  const handlePlaceOrder = async () => {
    try {
      const ordersRef = ref(database, 'orders');

      const newOrder = {
        productName,
        price,
        orderDate: new Date().toISOString(),
      };

      await push(ordersRef, newOrder);

      Alert.alert('Success', 'Your order has been placed!');
      navigation.goBack();
    } catch (error) {
      console.error('Error pushing order:', error);
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Image source={imageSource} style={styles.productImage} />
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.price}>₹ {price}</Text>

      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  productImage: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 },
  productName: { fontSize: 20, marginBottom: 10 },
  price: { fontSize: 18, marginBottom: 30 },
  orderButton: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  orderButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default CheckoutScreen;
