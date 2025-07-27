import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';

import { Pagination } from 'react-native-snap-carousel';
import { CarouselData } from '../data/CarouselData';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = () => {
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={CarouselData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        layout={'default'}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  card: {
    width: screenWidth,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MyCarousel;
