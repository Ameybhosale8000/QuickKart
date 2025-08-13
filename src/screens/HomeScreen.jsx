import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, Text } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import Deals from '../components/Deals';
import Brands from '../components/Brands';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productsRef = ref(database, 'mobiles'); // change 'products' to your node name
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        setProducts(data);
        setFilteredProducts(data);
      }
    });
  }, []);

  // Search handler
  const handleSearch = (text) => {
    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header onSearch={handleSearch} /> {/* Pass search handler to Header */}
      <SubHeader />
      <Category />
      <Carousel />
      <Services />
      <Deals />
      <Brands />

     
    </ScrollView>
  );
};

export default HomeScreen;
