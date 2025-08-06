// screens/CartScreen.jsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext';
import { getImage } from '../utils/getImage';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, addToCart, decrementFromCart, removeFromCart, clearCart } = useCart();

  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (sum, it) => sum + (Number(it.price || 0) * (it.quantity || 1)),
      0
    );
  }, [cartItems]);

  const onIncrease = (item) => {
    addToCart(item, 1);
  };

  const onDecrease = (item) => {
    decrementFromCart(item.id, 1);
  };

  const onRemove = (id) => {
    Alert.alert(
      'Remove item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(id) },
      ]
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your cart is empty</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={getImage(item.image)} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecrease(item)}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantity || 1}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={() => onIncrease(item)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subtotalWrap}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotal}>₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(0)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {(!cartItems || cartItems.length === 0) ? (
        renderEmpty()
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(i) => i.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₹{totalAmount.toFixed(0)}</Text>
            </View>

            <View style={styles.footerButtons}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  Alert.alert('Clear cart', 'Remove all items from cart?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Clear', style: 'destructive', onPress: () => clearCart() },
                  ]);
                }}
              >
                <Text style={styles.clearText}>Clear Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => navigation.navigate('CheckoutScreen', { products: cartItems })}
              >
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }, // White background
  list: { padding: 12, paddingBottom: 120 },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#555' },

  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  image: { width: 90, height: 90, resizeMode: 'contain', borderRadius: 8, backgroundColor: '#f9f9f9' },
  itemInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: '#000' },
  price: { fontSize: 15, fontWeight: '700', color: '#000', marginTop: 4 },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 6, borderWidth: 1, borderColor: '#000',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  qtyBtnText: { fontSize: 18, fontWeight: '700', color: '#000' },
  qtyText: { marginHorizontal: 10, minWidth: 20, textAlign: 'center', fontWeight: '700', color: '#000' },

  removeBtn: { marginLeft: 12 },
  removeText: { color: '#000', fontWeight: '600' },

  subtotalWrap: { alignItems: 'flex-end', marginLeft: 8 },
  subtotalLabel: { fontSize: 12, color: '#888' },
  subtotal: { fontSize: 16, fontWeight: '700', color: '#000' },

  footer: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', padding: 12,
    borderTopWidth: 1, borderColor: '#000',
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' },
  totalText: { fontSize: 18, fontWeight: '700', color: '#000' },
  totalAmount: { fontSize: 18, fontWeight: '700', color: '#000' },

  footerButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  clearBtn: {
    flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#000',
    marginRight: 8, alignItems: 'center', backgroundColor: '#fff',
  },
  clearText: { color: '#000', fontWeight: '700' },

  checkoutBtn: {
    flex: 2, padding: 12, borderRadius: 8, backgroundColor: '#000',
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: '700' },
});
