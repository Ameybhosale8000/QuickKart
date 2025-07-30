import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>QuickKart</Text>
        <Text style={styles.subTitle}>Welcome back!</Text>

        <Text style={styles.EmailPassword}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="envelope" size={18} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.EmailPassword}>Password</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeIcon}
          >
            <Icon name={secureText ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.continueButton}onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.separator} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={18} color="#DB4437" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Icon name="apple" size={20} color="#000" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>

        
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'grey', fontFamily: 'Poppins-Regular' }}>Not have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: '#111827' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 24,
    elevation: 6,
  },
  logo: {
    fontSize: 40,
    color: '#111',
    marginBottom: -10,
    fontFamily: 'Poppins-Bold',
  },
  subTitle: {
    fontSize: 30,
    color: '#374151',
    marginBottom: 1,
    fontFamily: 'Poppins-Bold',
  },
  EmailPassword: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Poppins-Bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#111',
    fontFamily: 'Poppins-Bold',
    marginBottom: -5,
  },
  continueButton: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    marginHorizontal: 10,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: 'Poppins-Bold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    fontFamily: 'Poppins-Bold',
    marginBottom: -5,
  },
});

export default LoginScreen;