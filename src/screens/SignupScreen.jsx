import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust if needed

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      let message = error.message;
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      Alert.alert('Signup Error', message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>QuickKart</Text>
        <Text style={styles.subTitle}>Sign up to get started</Text>

        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputGroup}>
          <Icon name="user" size={18} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Amey Bhosale"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputGroup}>
          <Icon name="envelope" size={18} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: email@example.com"
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
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeIcon}>
            <Icon name={secure ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputGroup}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirm}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)} style={styles.eyeIcon}>
            <Icon name={secureConfirm ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.link}>
            Log in
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F9FAFB', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, elevation: 6 },
  logo: { fontSize: 40, fontWeight: 'bold', marginBottom: 8, color: '#111827' },
  subTitle: { fontSize: 20, color: '#6B7280', marginBottom: 20 },
  label: { fontSize: 14, color: '#111827', marginBottom: 6 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  eyeIcon: { padding: 6 },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#111827',
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
    fontSize: 13,
  },
  link: {
    color: '#111827',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
