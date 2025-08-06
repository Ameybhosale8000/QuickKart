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
import { useRoute } from '@react-navigation/native';
import { ref, push } from 'firebase/database';
import { database, auth } from '../../firebaseConfig';

const CheckoutScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const handlePlaceOrder = async () => {
    if (!fullName || !mobile || !house || !area) {
      Alert.alert('Please fill all required fields.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Login Required', 'Please login before placing an order.');
      return;
    }

    try {
      const ordersRef = ref(database, `users/${user.uid}/orders`);
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

      Alert.alert('Success', 'Your order has been placed successfully.');
    } catch (error) {
      console.error('Order placement error:', error);
      Alert.alert('Error', 'Failed to place order.');
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

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
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
    backgroundColor: '#1a73e8',
  },
  addressTypeText: {
    color: '#000',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#1a73e8',
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
