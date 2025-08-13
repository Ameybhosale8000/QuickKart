// screens/OrderDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { database, auth } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

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

    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name || item.productName || 'Product'}
          </Text>

          <Text style={styles.price}>₹{item.price}</Text>

          <Text style={styles.qty}>Qty: {item.quantity || item.qty || 1}</Text>

          {addressStr ? (
            <Text style={styles.address}>📍 {addressStr}</Text>
          ) : null}

          {item.date ? (
            <Text style={styles.date}>
              🗓 {new Date(item.date).toLocaleString()}
            </Text>
          ) : null}

          {item.status ? (
            <Text
              style={[
                styles.status,
                item.status.toLowerCase().includes('delivered')
                  ? styles.statusDelivered
                  : item.status.toLowerCase().includes('cancel')
                  ? styles.statusCancelled
                  : styles.statusPending,
              ]}
            >
              {item.status}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2874F0" />
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
  container: { flex: 1, backgroundColor: '#F1F3F6' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#555', fontWeight: '500' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: '#212121' },
  price: { fontSize: 16, fontWeight: '700', color: '#B12704', marginTop: 4 },
  qty: { fontSize: 14, color: '#565959', marginTop: 4 },
  address: { fontSize: 13, color: '#333', marginTop: 6 },
  date: { fontSize: 12, color: '#555', marginTop: 4 },

  status: {
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  statusDelivered: { backgroundColor: '#D4EDDA', color: '#155724' },
  statusCancelled: { backgroundColor: '#F8D7DA', color: '#721C24' },
  statusPending: { backgroundColor: '#FFF3CD', color: '#856404' },
});
