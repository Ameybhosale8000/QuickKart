import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { getImage } from '../utils/getImage';
import { useCart } from '../../CartContext';

const DealsScreen = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const dealsRef = ref(database, 'deals');

    onValue(dealsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let dealsArray = [];

        // Loop: randomKey -> deals -> deal1, deal2...
        Object.values(data).forEach(categoryItem => {
          if (categoryItem.deals) {
            Object.entries(categoryItem.deals).forEach(([key, value]) => {
              dealsArray.push({
                id: key,
                ...value
              });
            });
          }
        });

        setDeals(dealsArray);
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
      data={deals}
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

export default DealsScreen;
