import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';

const CheckoutScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // Address fields
  const [fullName, setFullName] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const handlePlaceOrder = async () => {
    if (!fullName || !house || !area || !mobile) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }

    try {
      const ordersRef = ref(database, 'orders');
      await push(ordersRef, {
        productName: product.name,
        price: product.price,
        quantity: 1,
        timestamp: new Date().toISOString(),
        address: {
          fullName,
          house,
          area,
          mobile,
          alternateMobile,
          type: addressType,
        },
      });

      Alert.alert('Success', 'Order placed successfully!');
      navigation.navigate('OrderPlacedScreen');
    } catch (error) {
      console.error('Order Error:', error);
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Product Info */}
      <View style={styles.productRow}>
        <Image source={product.image} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
        </View>
      </View>

      {/* Structured Address Form */}
      <View style={styles.addressSection}>
        <Text style={styles.subHeader}>Deliver to</Text>

        <TextInput
          placeholder="Flat / House no. / Building name *"
          style={styles.input}
          value={house}
          onChangeText={setHouse}
        />
        <TextInput
          placeholder="Street / Area / Locality *"
          style={styles.input}
          value={area}
          onChangeText={setArea}
        />
        <TextInput
          placeholder="Enter your full name *"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="10-digit mobile number *"
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          placeholder="Alternate phone number (Optional)"
          keyboardType="numeric"
          maxLength={10}
          style={styles.input}
          value={alternateMobile}
          onChangeText={setAlternateMobile}
        />

        <Text style={styles.label}>Type of address</Text>
        <View style={styles.typeToggle}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              addressType === 'Home' && styles.selectedType,
            ]}
            onPress={() => setAddressType('Home')}
          >
            <Text style={styles.typeText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              addressType === 'Work' && styles.selectedType,
            ]}
            onPress={() => setAddressType('Work')}
          >
            <Text style={styles.typeText}>Work</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Price Summary */}
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
        <Text style={styles.totalPrice}>₹{(product.price * 1.02).toFixed(0)}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  subHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
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

  // Address styles
  addressSection: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  label: { fontSize: 14, marginBottom: 4, fontWeight: '600' },
  typeToggle: { flexDirection: 'row', marginBottom: 10 },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#888',
  },
  selectedType: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  typeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
