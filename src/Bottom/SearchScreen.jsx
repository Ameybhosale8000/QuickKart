import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const rootRef = ref(database);
    onValue(rootRef, (snapshot) => {
      if (snapshot.exists()) {
        const allData = snapshot.val();
        let combinedData = [];

        Object.keys(allData).forEach((category) => {
          const categoryData = allData[category];

          if (typeof categoryData === 'object') {
            Object.entries(categoryData).forEach(([subKey, subValue]) => {
              if (typeof subValue === 'object') {
                Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
                  if (typeof nestedValue === 'object') {
                    const itemsArray = Object.values(nestedValue).map((item) => ({
                      ...item,
                      category: category,
                      subcategory: nestedKey
                    }));
                    combinedData = [...combinedData, ...itemsArray];
                  }
                });
              }
            });
          }
        });

        setAllItems(combinedData);
        setFilteredItems(combinedData);
      } else {
        setAllItems([]);
        setFilteredItems([]);
      }
    });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      {/* Placeholder since you don’t have image in DB */}
      <View style={styles.imagePlaceholder}>
        <Text style={{ color: '#888', fontSize: 12 }}>No Image</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{item.name || 'No Name'}</Text>
        <Text style={styles.price}>{item.price ? `₹${item.price}` : ''}</Text>
        <Text style={styles.category}>
          {item.category} → {item.subcategory}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.noResults}>No products found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  details: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: 'green', marginTop: 4 },
  category: { fontSize: 12, color: '#888', marginTop: 2 },
  noResults: { textAlign: 'center', marginTop: 20, color: '#888' }
});

export default SearchScreen;
