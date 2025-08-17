import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, push, set, onValue } from 'firebase/database';
import { database, auth } from '../../firebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

const CheckoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [house, setHouse] = useState('');
  const [area, setArea] = useState('');
  const [alternateMobile, setAlternateMobile] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [showAddress, setShowAddress] = useState(false);

  // Load saved address
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const addressRef = ref(database, `users/${user.uid}/address`);
    onValue(addressRef, (snapshot) => {
      if (snapshot.exists()) {
        const savedAddress = snapshot.val();
        setFullName(savedAddress.fullName || '');
        setMobile(savedAddress.mobile || '');
        setHouse(savedAddress.house || '');
        setArea(savedAddress.area || '');
        setAlternateMobile(savedAddress.alternateMobile || '');
        setAddressType(savedAddress.type || 'Home');
      }
    });
  }, []);

  const validate = () => {
    return fullName?.trim() && mobile?.trim() && house?.trim() && area?.trim();
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const user = auth.currentUser;
    if (!user) return;

    if (!product || !product.id) return;

    setLoading(true);

    const addressObj = {
      fullName,
      house,
      area,
      mobile,
      alternateMobile,
      type: addressType,
    };

    const orderPayload = {
      productId: product.id || '',
      name: product.name || '',
      price: Number(product.price) || 0,
      quantity: 1,
      image: product.image || '',
      address: addressObj,
      total: Number(product.price) || 0,
      date: new Date().toISOString(),
      status: 'Ordered',
      paymentMethod,
    };

    try {
      // Save address
      await set(ref(database, `users/${user.uid}/address`), addressObj);

      // Save user order
      const userOrdersRef = ref(database, `users/${user.uid}/orders`);
      const newUserOrderRef = push(userOrdersRef);
      await set(newUserOrderRef, orderPayload);

      // Save global order
      const globalOrdersRef = ref(database, 'orders');
      const newGlobalOrderRef = push(globalOrdersRef);
      await set(newGlobalOrderRef, { uid: user.uid, ...orderPayload });

      // Show loader for 6.5 seconds, then navigate
      setTimeout(() => {
        setLoading(false);
        navigation.replace('OrderPlacedScreen');
      }, 6500);

    } catch (error) {
      console.error('Order placement error:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Shipping</Text>
          <View style={styles.stepLine} />
          <Text style={[styles.stepText, styles.stepActive]}>Payment</Text>
          <View style={styles.stepLine} />
          <Text style={styles.stepText}>Review</Text>
        </View>

        {/* Address Section */}
        <TouchableOpacity
          style={styles.addressHeader}
          onPress={() => setShowAddress(!showAddress)}
          activeOpacity={0.7}
        >
          <Text style={styles.title}>Delivery Address</Text>
          <AntDesign name={showAddress ? 'up' : 'down'} size={20} color="#000" />
        </TouchableOpacity>

        {showAddress && (
          <View style={styles.card}>
            <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
            <TextInput placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" style={styles.input} />
            <TextInput placeholder="House No., Building Name" value={house} onChangeText={setHouse} style={styles.input} />
            <TextInput placeholder="Road Name, Area, Colony" value={area} onChangeText={setArea} style={styles.input} />
            <TextInput placeholder="Alternate Mobile Number (Optional)" value={alternateMobile} onChangeText={setAlternateMobile} keyboardType="phone-pad" style={styles.input} />
          </View>
        )}

        {/* Payment Options */}
        <Text style={styles.subtitle}>Choose a payment option</Text>
        {['Card', 'Apple Pay', 'PayPal', 'Cash on Delivery'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.paymentOption, paymentMethod === method && styles.selectedPayment]}
            onPress={() => setPaymentMethod(method)}
          >
            <View style={styles.radioCircle}>{paymentMethod === method && <View style={styles.radioInner} />}</View>
            <Text style={styles.paymentText}>{method}</Text>
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>${product?.price || 0}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Shipping</Text>
            <Text style={styles.summaryText}>Free</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotal}>${product?.price || 0}</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Loader Overlay */}
      {loading && (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../assets/loader.json')}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text style={styles.loaderText}>Placing your order...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1, padding: 16 },
  stepContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  stepText: { fontSize: 14, color: '#777', fontWeight: '500' },
  stepActive: { color: '#000', fontWeight: '700' },
  stepLine: { flex: 1, height: 1, backgroundColor: '#ccc', marginHorizontal: 8 },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#000' },
  card: { backgroundColor: '#f9f9f9', padding: 14, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#ccc', color:"black" },
  subtitle: { fontSize: 18, fontWeight: '600', marginVertical: 8, color: '#000' },
  paymentOption: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, backgroundColor: '#f9f9f9' },
  selectedPayment: { borderColor: '#000', backgroundColor: '#eee' },
  paymentText: { fontSize: 16, color: '#000', marginLeft: 10, fontWeight: '500' },
  radioCircle: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#000' },
  summary: { backgroundColor: '#f9f9f9', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', marginTop: 10, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryText: { fontSize: 16, color: '#555' },
  summaryTotal: { fontSize: 18, fontWeight: '700', color: '#000' },
  button: { backgroundColor: '#000', padding: 16, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  loaderContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  loaderText: { marginTop: 10, color: '#fff', fontSize: 16 },
});

export default CheckoutScreen;
