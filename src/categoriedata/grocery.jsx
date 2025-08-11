import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getImage } from '../utils/getImage';
import { useCart } from '../../CartContext';

const FreshScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Step 1: Get the auto-generated ID under 'fresh'
    const freshRootRef = ref(database, 'fresh');

    onValue(freshRootRef, (snapshot) => {
      const rootData = snapshot.val();
      if (rootData) {
        // Get first autoId key
        const autoIdKey = Object.keys(rootData)[0];

        if (autoIdKey && rootData[autoIdKey]?.fresh) {
          const data = rootData[autoIdKey].fresh;

          // Convert to array
          const productsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
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
      activeOpacity={0.8}
    >
      {/* Product Image */}
      {item.image && (
        <Image source={getImage(item.image)} style={styles.image} />
      )}

      {/* Product Details */}
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.rating}>⭐ {item.rating} Ratings</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowBtn}
            onPress={() => navigation.navigate('CheckoutScreen', { product: item })}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0073e6', // Flipkart-style blue
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addToCartBtn: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buyNowBtn: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  buyNowText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default FreshScreen;
