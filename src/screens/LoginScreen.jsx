import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(async (userCredential) => {
        await AsyncStorage.setItem('userEmail', email.trim());
        Alert.alert('Login Successful');
        navigation.navigate('HomeScreen'); // Adjust to your main screen
      })
      .catch((error) => {
        let message = 'Login failed. Please try again.';
        if (error.code === 'auth/user-not-found') {
          message = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Incorrect password.';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Invalid email address.';
        }
        Alert.alert('Login Failed', message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>QuickKart</Text>
        <Text style={styles.subTitle}>Welcome back!</Text>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputGroup}>
          <Icon name="envelope" size={18} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputGroup}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
            <Icon name={secureText ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <Text style={{ color: 'grey' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={{ color: '#111827', fontWeight: 'bold' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 25, padding: 24, elevation: 6 },
  logo: { fontSize: 40, color: '#111', marginBottom: 8, fontWeight: 'bold' },
  subTitle: { fontSize: 24, color: '#374151', marginBottom: 20 },
  label: { fontSize: 14, color: '#111827', marginBottom: 6 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  icon: { marginRight: 10 },
  eyeIcon: { padding: 6 },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#111827',
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;
