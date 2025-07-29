import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Header = () => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#000000', '#1c1c1c', '#3a3a3a']}
        style={styles.container}>
        
        <View style={styles.inputBox}>
          <View style={styles.row}>
            <Ionicons name="search" size={22} color="black" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
            />
          </View>
          <AntDesign name="scan1" size={22} color="black" />
        </View>

        <Feather name="mic" size={20} color="BLACK" style={styles.micIcon} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: '88%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
  },
  micIcon: {
    marginLeft: 10,
  },
});

export default Header;
