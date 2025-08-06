import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { getImage } from '../utils/getImage';
import { database, auth } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const screenWidth = Dimensions.get('window').width;

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const cartRef = ref(database, `users/${user.uid}/cart`);
      const unsubscribe = onValue(cartRef, snapshot => {
        const data = snapshot.val();
        if (data) {
          const itemsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setCartItems(itemsArray);
        } else {
          setCartItems([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={getImage(item.image)}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  productImage: {
    width: screenWidth * 0.25,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  details: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginTop: 6,
  },
});

export default CartScreen;
