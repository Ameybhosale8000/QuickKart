import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handlePlaceOrder = () => {
    const orderData = {
      productName: product.name,
      price: product.price,
      quantity: 1,
      timestamp: new Date().toISOString(),
    };

    const ordersRef = ref(database, 'orders/');
    push(ordersRef, orderData)
      .then(() => {
        Alert.alert('Success', 'Order placed successfully!');
        navigation.navigate('OrderPlacedScreen'); // ✅ Navigate after placing order
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        Alert.alert('Error', 'Failed to place order.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.productRow}>
        <Image source={product.image} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text>Subtotal</Text>
        <Text>₹{product.price}</Text>
      </View>
      <View style={styles.section}>
        <Text>Shipping</Text>
        <Text>Free</Text>
      </View>
      <View style={styles.section}>
        <Text>Taxes</Text>
        <Text>2%</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalPrice}>
          ₹{(product.price * 1.02).toFixed(0)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  image: { width: 80, height: 80, borderRadius: 8 },
  name: { fontWeight: '600' },
  price: { color: '#000', fontWeight: 'bold' },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  totalLabel: { fontWeight: 'bold' },
  totalPrice: { fontWeight: 'bold' },
  placeOrderButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: { color: '#fff', fontWeight: 'bold' },
});
