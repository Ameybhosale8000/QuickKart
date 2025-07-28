// FaceWashScreen.jsx मध्ये:
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import RecommendProduct from '../assets/recommend.jpg';

const FaceWashScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={RecommendProduct} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>Nykaa Face Wash Gentle Skin Cleanser</Text>
        <Text style={styles.productType}>For all skin types</Text>
        <View style={styles.priceRow}>
          <Text style={styles.discountPrice}>₹ 1,549.00</Text>
          <Text style={styles.mrp}>M.R.P.</Text>
          <Text style={styles.originalPrice}>₹ 1895.00</Text>
        </View>
        <TouchableOpacity style={styles.offerTag}>
          <Text style={styles.offerText}>18% OFF</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Product Description</Text>
        <Text style={styles.description}>
          This gentle skin cleanser is enriched with natural ingredients to remove dirt, oil,
          and makeup without drying your skin. Suitable for all skin types.
        </Text>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => navigation.navigate('CheckoutScreen', {
            productName: 'Nykaa Face Wash Gentle Skin Cleanser',
            price: 1549,
            image: RecommendProduct,
          })}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};





const styles = StyleSheet.create({
  // तुमचे styles जसे आहेत तसेच राहू द्या
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  productType: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  mrp: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  originalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  offerTag: {
    backgroundColor: '#be0201',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginVertical: 8,
  },
  offerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },
  buyNowButton: {
    backgroundColor: '#017185',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FaceWashScreen;
