import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { getImage } from '../utils/getImage';

const FashionScreen = () => {
  const [fashionItems, setFashionItems] = useState([]);

  useEffect(() => {
    const fashionRef = ref(database, 'fashion'); // Firebase path
    onValue(fashionRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFashionItems(itemsArray);
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={getImage(item.image)} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={fashionItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    color: '#000',
  },
  rating: {
    color: '#888',
  },
  button: {
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default FashionScreen;
