import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getImage } from '../utils/getImage';
import { useCart } from '../../CartContext'; // ✅ useCart import

const BeautyScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ addToCart hook usage

  useEffect(() => {
    const beautyRef = ref(database, 'beauty');

    onValue(beautyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firstKey = Object.keys(data)[0];
        if (firstKey && data[firstKey].beauty) {
          const productsArray = Object.entries(data[firstKey].beauty).map(([key, value]) => ({
            id: key,  // ✅ assign firebase key as id
            ...value
          }));
          setProducts(productsArray);
        }
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      {item.image && (
        <Image source={getImage(item.image)} style={styles.image} />
      )}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Adding to cart:', item);
          addToCart(item);
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 5 },
  name: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 3 },
  price: { fontSize: 14, color: '#000', marginBottom: 2 },
  rating: { fontSize: 12, color: '#888', marginBottom: 5 },
  button: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default BeautyScreen;
