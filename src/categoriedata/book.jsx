import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext';

const screenWidth = Dimensions.get('window').width;

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const { addToCart } = useCart();

  useEffect(() => {
    const booksRef = ref(database, 'categories/cat10/books');

    const unsubscribe = onValue(booksRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const firstKey = Object.keys(data)[0]; // auto-generated key
        const itemsObj = data[firstKey]; // { b1: {...}, b2: {...} }
        if (itemsObj) {
          const itemsArray = Object.keys(itemsObj).map(key => ({
            id: key,
            ...itemsObj[key],
          }));
          setBooks(itemsArray);
        } else {
          setBooks([]);
        }
      } else {
        setBooks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.rating}>⭐ {item.rating || '4.5'} Ratings</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => {
              addToCart(item);
              ToastAndroid.show(`${item.name} added to cart!`, ToastAndroid.SHORT);
            }}
          >
            <Text style={styles.buttonTextWhite}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => navigation.navigate('CheckoutScreen', { product: item })}
          >
            <Text style={styles.buttonTextBlack}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: screenWidth * 0.3,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  info: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  cartButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buyButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextBlack: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default BooksScreen;
