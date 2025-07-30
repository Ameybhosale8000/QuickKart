import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { database } from '../../firebaseConfig';
import { ref, push } from 'firebase/database';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handleAddProduct = () => {
    if (!name || !price || !rating) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      rating: parseFloat(rating),
      createdAt: new Date().toISOString(),
    };

    push(ref(database, 'products/beauty/'), newProduct)
      .then(() => {
        Alert.alert('Success', 'Product added to Firebase!');
        setName('');
        setPrice('');
        setRating('');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
