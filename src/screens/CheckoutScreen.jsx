// screens/CheckoutScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, push, set } from 'firebase/database';
import { database, auth } from '../../firebaseConfig';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName?.trim() || !mobile?.trim() || !house?.trim() || !area?.trim()) {
      Alert.alert('Please fill all required fields.');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Login Required', 'Please login before placing an order.');
      return;
    }

    if (!product || !product.id) {
      Alert.alert('Product error', 'No product selected for ordering.');
      return;
    }

    setLoading(true);

    const orderPayload = {
      productId: product.id || '',
      name: product.name || '',
      price: Number(product.price) || 0,
      quantity: 1,
      image: product.image || '', // filename expected by getImage util
      address: {
        fullName,
        house,
        area,
        mobile,
        alternateMobile,
        type: addressType,
      },
      total: Number(product.price) || 0,
      date: new Date().toISOString(),
      status: 'Ordered',
    };

    try {
      // 1) Save under user's orders
      const userOrdersRef = ref(database, `users/${user.uid}/orders`);
      const newUserOrderRef = push(userOrdersRef);
      await set(newUserOrderRef, orderPayload);

      // 2) Save under global orders with uid
      const globalOrdersRef = ref(database, 'orders');
      const newGlobalOrderRef = push(globalOrdersRef);
      await set(newGlobalOrderRef, { uid: user.uid, ...orderPayload });

      setLoading(false);
      Alert.alert('Success', 'Your order has been placed successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('OrderPlacedScreen'), // or navigation.navigate(...)
        },
      ]);
    } catch (error) {
      console.error('Order placement error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="House No., Building Name"
        value={house}
        onChangeText={setHouse}
        style={styles.input}
      />
      <TextInput
        placeholder="Road Name, Area, Colony"
        value={area}
        onChangeText={setArea}
        style={styles.input}
      />
      <TextInput
        placeholder="Alternate Mobile Number (Optional)"
        value={alternateMobile}
        onChangeText={setAlternateMobile}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.subtitle}>Address Type</Text>
      <View style={styles.addressTypeContainer}>
        {['Home', 'Work', 'Other'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.addressTypeButton,
              addressType === type && styles.selectedType,
            ]}
            onPress={() => setAddressType(type)}
          >
            <Text
              style={[
                styles.addressTypeText,
                addressType === type && styles.selectedText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Placing Order...' : 'Place Order'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#000',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressTypeButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#eee',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#000',
  },
  addressTypeText: {
    color: '#000',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#000000ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
