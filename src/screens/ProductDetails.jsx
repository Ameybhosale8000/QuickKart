// screens/ProductDetails.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { getImage } from '../utils/getImage';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext';

export default function ProductDetails({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // show small confirmation toast
    ToastAndroid.show(`${product.name} added to cart`, ToastAndroid.SHORT);
    // NOTE: no navigation here — stays on details screen
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={getImage(product.image)} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.rating}>⭐ {product.rating} Ratings</Text>

      <Text style={styles.description}>
        {product.description || 'No description available.'}
      </Text>

      {/* Add to Cart — only adds to cart and shows toast */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Buy Now — navigates to checkout */}
      <TouchableOpacity
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('CheckoutScreen', { product })}
        activeOpacity={0.85}
      >
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  image: { width: '100%', height: 300, resizeMode: 'contain', marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#1a73e8', marginBottom: 5 },
  rating: { fontSize: 16, color: '#777', marginBottom: 10 },
  description: { fontSize: 14, color: '#555', marginBottom: 20 },

  addToCartButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  buyNowButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buyNowText: { color: '#000', fontWeight: '700', fontSize: 16 },
});
