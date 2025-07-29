import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Acer from '../assets/Acer.png';
import Samsung from '../assets/Samsung.png';
import Nothing from '../assets/nothing.png';
import Redmi from '../assets/Redmi.png';
import Iphone16 from '../assets/Iphone16.png';
import Oneplus from '../assets/Oneplus.png';
import Motorola from '../assets/Motorola.png';
import Tecno from '../assets/Tecno.png';
import Poco from '../assets/Poco.png';

const mobiles = [
  {
    id: '1',
    name: 'Acer Super ZX 5G',
    price: '₹10,999',
    offer: 'Buy for ₹9,099 with coupon',
    image: Acer,
  },
  {
    id: '2',
    name: 'Samsung Galaxy M36 5G',
    price: '₹18,999',
    offer: 'Limited time deal',
    image: Samsung,
  },
  {
    id: '3',
    name: 'Nothing Phone (3A) 5G',
    price: '₹24,499',
    offer: '1K+ bought in past month',
    image: Nothing,
  },
  {
    id: '4',
    name: 'Redmi Note 12',
    price: '₹11,499',
    offer: 'Extra ₹500 off on exchange',
    image: Redmi,
  },
  {
    id: '5',
    name: 'iPhone 13',
    price: '₹59,999',
    offer: '10% off with HDFC',
    image: Iphone16,
  },
  {
    id: '6',
    name: 'OnePlus Nord CE 3',
    price: '₹22,999',
    offer: 'No cost EMI',
    image: Oneplus,
  },
  {
    id: '7',
    name: 'Motorola G73 5G',
    price: '₹17,999',
    offer: 'Stock Clearance Sale',
    image: Motorola,
  },
  {
    id: '8',
    name: 'Tecno Camon 20',
    price: '₹9,499',
    offer: 'Special Launch Price',
    image: Tecno,
  },
  {
    id: '9',
    name: 'POCO X5 5G',
    price: '₹16,499',
    offer: '20% off',
    image: Poco,
  },
];

const MobileProductsScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    Alert.alert('Added to Cart', `${item.name} added to cart`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.offer}>{item.offer}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.cartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>{'<'} Back</Text>
      </TouchableOpacity>
      <FlatList
        data={mobiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default MobileProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // 80% white
  },
  backButton: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
  offer: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  cartButton: {
    backgroundColor: '#000', // Black button
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
