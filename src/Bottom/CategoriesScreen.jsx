import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebaseConfig';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width / 2) - 24;

// 🔄 Local image mapping
const categoryImages = {
  "makeup.jpg": require('../assets/makeup.jpg'),
  "toys.jpg": require('../assets/toys.jpg'),
  "grocery.jpg": require('../assets/grocery.jpg'),
  "sports.jpg": require('../assets/sports.jpg'),
  "food.png": require('../assets/food.jpg'),   // 👈 food image mapping
  "electronic.jpg": require('../assets/electronic.jpg'),
  "electronics.jpg": require('../assets/electronics.jpeg'),
  "phone.jpg": require('../assets/phone.jpg'),
  "fashion.jpg": require('../assets/fashionn.jpg'),
};

// 🧭 Category name to screen name mapping
const screenMap = {
  "Makeup": "makeup",
  "Books": "book",
  "Toys": "toy",
  "Grocery": "grocery",
  "Footwear": "footwear",

  "skincare": "skincare",
  "hair": "haircare",
  "sent": "sent",
  "tool": "tools",
  "electronics": "electronic",
  "Mobiles": "MobileScreen",
  "fashion": "fashionn",
  "Home & Kitchen": "HomeKitchenScreen",

 
  "Food": "FoodScreen",
    "Fashion": "fashionScreen",
};

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.values(data));
      }
    });
  }, []);

  const renderCategory = ({ item }) => {
    const screenName = screenMap[item.name];
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (screenName) {
            navigation.navigate(screenName);
          } else {
            alert('Screen not found for ' + item.name);
          }
        }}
        activeOpacity={0.85}
      >
        {categoryImages[item.image] ? (
          <Image
            source={categoryImages[item.image]}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={{ color: '#888', fontSize: 12 }}>Image</Text>
          </View>
        )}
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 6,
    width: ITEM_WIDTH,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: ITEM_WIDTH * 0.65,
    height: ITEM_WIDTH * 0.65,
    borderRadius: ITEM_WIDTH * 0.65 / 2,
    marginBottom: 10,
    backgroundColor: '#f6f6f6',
  },
  placeholderImage: {
    width: ITEM_WIDTH * 0.65,
    height: ITEM_WIDTH * 0.65,
    borderRadius: ITEM_WIDTH * 0.65 / 2,
    backgroundColor: '#ddd',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default CategoriesScreen;
