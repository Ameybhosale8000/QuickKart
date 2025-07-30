import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native'; // ✅ navigation hook

const MobileScreen = () => {
  const [mobiles, setMobiles] = useState([]);
  const navigation = useNavigation(); // ✅ use navigation

  useEffect(() => {
    const mobilesRef = ref(database, 'mobiles/mobiles');
    onValue(mobilesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const items = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setMobiles(items);
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={getImage(item.image)}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating} Rating</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.navigate('CheckoutScreen', { product: item })} // ✅ navigate with data
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getImage = (imageName) => {
    switch (imageName) {
      case 'Samsung.png':
        return require('../assets/Samsung.png');
      case 'Iphone16.png':
        return require('../assets/Iphone16.png');
      case 'Redmi.png':
        return require('../assets/Redmi.png');
      
    }
  };

  return (
    <FlatList
      data={mobiles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  cartButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buyButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MobileScreen;
