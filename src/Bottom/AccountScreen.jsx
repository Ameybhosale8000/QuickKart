// AccountScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, database } from '../../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      const userRef = ref(database, `users/${user.uid}/profile`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data?.name) setUserName(data.name);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleSaveName = () => {
    const user = auth.currentUser;
    if (user && tempName.trim()) {
      const userRef = ref(database, `users/${user.uid}/profile`);
      set(userRef, { name: tempName })
        .then(() => {
          setUserName(tempName);
          setModalVisible(false);
        })
        .catch((error) => Alert.alert('Error', error.message));
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          auth.signOut()
            .then(() => navigation.replace('LoginScreen'))
            .catch((err) => Alert.alert('Error', err.message));
        },
      },
    ]);
  };

  const showComingSoon = () => {
    Alert.alert('Coming Soon', 'This feature is under development.');
  };

  const renderItem = (icon, label, onPress = showComingSoon) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.6}
      onPress={onPress}>
      <View style={styles.itemLeft}>
        <Icon name={icon} size={20} color="#000" style={styles.icon} />
        <Text style={styles.itemText}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={22} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.fullContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileCard}>
          <FontAwesome name="user-circle-o" size={55} color="#000" />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{userName || 'User'}</Text>
              <TouchableOpacity onPress={() => {
                setTempName(userName);
                setModalVisible(true);
              }}>
                <Icon name="edit" size={18} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>

        {/* Edit Name Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Name</Text>
              <TextInput
                value={tempName}
                onChangeText={setTempName}
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSave}
                  onPress={handleSaveName}>
                  <Text style={styles.modalButtonTextWhite}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Sections */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Your Orders</Text>
          {renderItem('inventory', 'Track Orders')}
          {renderItem('autorenew', 'Returns & Refunds')}
          {renderItem('shopping-cart', 'Buy Again')}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {renderItem('lock', 'Login & Security')}
          {renderItem('location-on', 'Saved Addresses')}
          {renderItem('credit-card', 'Payment Methods')}
          {renderItem('notifications', 'Notification Preferences')}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quickkart Pay</Text>
          {renderItem('account-balance-wallet', 'Wallet Balance')}
          {renderItem('receipt', 'Transaction History')}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          {renderItem('support-agent', 'Customer Support')}
          {renderItem('help', 'FAQs')}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          {renderItem('download', 'Download Data')}
          {renderItem('privacy-tip', 'Manage Permissions')}
          {renderItem('cancel', 'Close Your Account')}
          {renderItem('policy', 'Privacy Policy')}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    marginLeft: 14,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  profileEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 13,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 15,
    color: '#111',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#000',
    marginBottom: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },
  modalSave: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalButtonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
