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

  const [fullName, setFullName] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [isAddressVisible, setIsAddressVisible] = useState(true);

  const taxRate = 0.02;
  const taxAmount = product.price * taxRate;
  const total = product.price + taxAmount;

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
      <View style={styles.card}>
        <View style={styles.productRow}>
          <Image source={product.image} style={styles.image} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setIsAddressVisible(prev => !prev)}>
          <Text style={styles.subHeader}>
            Deliver to {isAddressVisible ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {isAddressVisible && (
          <>
            <TextInput
              placeholder="Flat / House no. / Building name *"
              placeholderTextColor="#666"
              style={styles.input}
              value={house}
              onChangeText={setHouse}
            />
            <TextInput
              placeholder="Street / Area / Locality *"
              placeholderTextColor="#666"
              style={styles.input}
              value={area}
              onChangeText={setArea}
            />
            <TextInput
              placeholder="Enter your full name *"
              placeholderTextColor="#666"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              placeholder="10-digit mobile number *"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              value={mobile}
              onChangeText={setMobile}
            />
            <TextInput
              placeholder="Alternate phone number (Optional)"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              value={alternateMobile}
              onChangeText={setAlternateMobile}
            />

            <Text style={styles.label}>Type of address</Text>
            <View style={styles.typeToggle}>
              {['Home', 'Work'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    addressType === type && styles.selectedType,
                  ]}
                  onPress={() => setAddressType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      addressType === type
                        ? { color: '#fff' }
                        : { color: '#000' },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      {/* Price Summary */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Price Details</Text>
        <View style={styles.section}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>₹{product.price}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Shipping</Text>
          <Text style={styles.text}>Free</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Tax (2%)</Text>
          <Text style={styles.text}>₹{taxAmount.toFixed(0)}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹{total.toFixed(0)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#000',
    borderWidth: 1,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  text: {
    color: '#000',
  },
  placeOrderButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
    color: '#000',
  },
  typeToggle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  selectedType: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  typeText: {
    fontWeight: '600',
  },
});
