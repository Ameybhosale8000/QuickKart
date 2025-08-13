// components/Header.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text); // Call the HomeScreen's handleSearch
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    color: '#000',
  },
});

export default Header;
