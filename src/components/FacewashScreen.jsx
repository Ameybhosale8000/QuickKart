import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const FacewashScreen = ({ navigation }) => {
  const product = {
    name: 'Nykaa Face Wash Gentle Skin Cleanser',
    price: 1549,
    mrp: 1895,
    offer: '18% OFF',
    image: require('../assets/recommend.jpg'),
    description:
      'This gentle skin cleanser is enriched with natural ingredients to remove dirt, oil, and makeup without drying your skin.',
    delivery: 'Free Delivery within 2–4 days',
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} resizeMode="contain" />

      <View style={styles.detailsBox}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>
          ₹{product.price}{' '}
          <Text style={styles.mrp}>₹{product.mrp}</Text>{' '}
          <Text style={styles.offer}>{product.offer}</Text>
        </Text>
        <Text style={styles.tax}>Inclusive of all taxes</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNow}
            onPress={() => navigation.navigate('CheckoutScreen', { product })}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheading}>Product Description</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <Text style={styles.subheading}>Delivery</Text>
        <Text style={styles.desc}>{product.delivery}</Text>
      </View>
    </View>
  );
};

export default FacewashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  detailsBox: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 5,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  price: { fontSize: 18, fontWeight: '600', color: '#000' },
  mrp: { color: 'gray', textDecorationLine: 'line-through', fontSize: 14 },
  offer: { color: 'red', fontWeight: 'bold', fontSize: 14 },
  tax: { fontSize: 12, color: 'gray', marginBottom: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  addToCart: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    padding: 12,
    marginRight: 10,
    borderRadius: 6,
  },
  buyNow: {
    flex: 1,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 6,
  },
  addToCartText: { color: '#000', textAlign: 'center', fontWeight: '600' },
  buyNowText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  subheading: { fontWeight: 'bold', marginTop: 16, marginBottom: 4 },
  desc: { color: '#444' },
});
