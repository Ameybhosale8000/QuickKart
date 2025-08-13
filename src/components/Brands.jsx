import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Brand1 from '../assets/brand1.jpeg';
import Brand2 from '../assets/brand2.jpeg';
import Brand3 from '../assets/brand3.jpeg';
import Brand4 from '../assets/brand4.jpeg';

const Brands = () => {
  const navigation = useNavigation();

  const products = [
    {
      id: 1,
      image: Brand1,
      title: 'Min. 20% off | CaratLane Diamond Necklace',
      price: 20000,
      description: 'High-quality diamond necklace from CaratLane.',
    },
    {
      id: 2,
      image: Brand2,
      title: 'Min. 40% off | Fossil, Titan Smart Watch & More',
      price: 8000,
      description: 'Stylish smart watches with premium features.',
    },
    {
      id: 3,
      image: Brand3,
      title: 'Heels - Upto 50% OFF on Heeled Sandals, High Heel',
      price: 2500,
      description: 'Elegant and comfortable heeled sandals.',
    },
    {
      id: 4,
      image: Brand4,
      title: 'Sony 60W Bluetooth SoundBar Speaker Audio Engine',
      price: 15000,
      description: 'Powerful 60W Bluetooth soundbar from Sony.',
    },
  ];

  const handlePress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Brands of the day</Text>

        <View style={styles.row}>
          {products.slice(0, 2).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.brands}
              onPress={() => handlePress(item)}
              activeOpacity={0.7}
            >
              <Image source={item.image} style={styles.imgStyle} />
              <Text style={styles.brandTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {products.slice(2, 4).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.brands}
              onPress={() => handlePress(item)}
              activeOpacity={0.7}
            >
              <Image source={item.image} style={styles.imgStyle} />
              <Text style={styles.brandTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  imgStyle: {
    height: 150,
    width: '100%',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  brands: {
    width: '50%',
    padding: 10,
  },
  brandTitle: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },
});

export default Brands;
