import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const SubHeader = () => {
  const [address, setAddress] = useState('Amey Bhosale Patil - Sanvatsar: 423603');
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState(address);

  const handleSave = () => {
    setAddress(newAddress);
    setModalVisible(false);
  };

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#ffffffff', '#e6e6e6ff', '#dcdcdcff']}
        style={styles.container}>
        <Feather name="map-pin" size={16} color="#2c4341" />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.deliver}>Deliver to {address}</Text>
        </TouchableOpacity>
        <SimpleLineIcons name="arrow-down" size={10} color="#000000" />
      </LinearGradient>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Address</Text>
            <TextInput
              value={newAddress}
              onChangeText={setNewAddress}
              style={styles.input}
              placeholder="Enter your new address"
              multiline
            />
            <View style={styles.buttonRow}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliver: {
    fontSize: 13,
    color: '#2c4341',
    paddingHorizontal: 6,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    marginBottom: 15,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  saveBtn: {
    padding: 10,
    backgroundColor: '#2c4341',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SubHeader;
