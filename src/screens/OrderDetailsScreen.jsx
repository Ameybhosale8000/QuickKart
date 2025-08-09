// screens/OrderDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { database, auth } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import getImage, { getImage as namedGetImage } from '../utils/getImage'; // both import styles supported

export default function OrderDetailsScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const ordersRef = ref(database, `users/${uid}/orders`);
    const unsubscribe = onValue(
      ordersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          list.sort((a, b) => {
            if (a.date && b.date) return new Date(b.date) - new Date(a.date);
            return 0;
          });
          setOrders(list);
        } else {
          setOrders([]);
        }
        setLoading(false);
      },
      (error) => {
        console.warn('Orders fetch error', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No orders yet</Text>
    </View>
  );

  // safely format address
  const formatAddress = (address) => {
    if (!address) return null;
    if (typeof address === 'string') return address;
    const parts = [];
    if (address.fullName) parts.push(address.fullName);
    if (address.house) parts.push(address.house);
    if (address.area) parts.push(address.area);
    if (address.type) parts.push(`(${address.type})`);
    if (address.mobile) parts.push(`Mob: ${address.mobile}`);
    if (address.alternateMobile) parts.push(`Alt: ${address.alternateMobile}`);
    return parts.join(', ');
  };

  const renderOrder = ({ item }) => {
    const addressStr = formatAddress(item.address);

    // resolve getImage (support both named/default import)
    

    return (
      <View style={styles.card}>
        
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name || item.productName || 'Product'}
          </Text>

          <Text style={styles.price}>₹{item.price}</Text>

          <Text style={styles.qty}>Qty: {item.quantity || item.qty || 1}</Text>

          {addressStr ? (
            <Text style={styles.address}>Address: {addressStr}</Text>
          ) : null}

          {item.date ? (
            <Text style={styles.date}>
              Ordered: {new Date(item.date).toLocaleString()}
            </Text>
          ) : null}

          {item.status ? <Text style={styles.status}>Status: {item.status}</Text> : null}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#555' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  image: { width: 90, height: 90, backgroundColor: '#f7f7f7', borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '700', color: '#000' },
  price: { fontSize: 15, fontWeight: '700', color: '#000', marginTop: 6 },
  qty: { fontSize: 14, color: '#000', marginTop: 6 },
  address: { fontSize: 13, color: '#333', marginTop: 6 },
  date: { fontSize: 12, color: '#555', marginTop: 4 },
  status: { fontSize: 13, color: '#000', marginTop: 6, fontWeight: '600' },
});
