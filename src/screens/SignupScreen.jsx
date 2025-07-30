import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>QuickKart</Text>
        <Text style={styles.subTitle}>Sign up to get started</Text>

        <Text style={styles.namelabel}>Full Name</Text>
        <View style={styles.inputtext}>
          <Icon name="user" size={18} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex:- Amey Shankar Bhosale"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.namelabel}>Email</Text>
        <View style={styles.inputtext}>
          <Icon name="envelope" size={18} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex:- ameyb71@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <Text style={styles.namelabel}>Password</Text>
        <View style={styles.inputtext}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder=" Ex:- Amey@2210"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeIcon}>
            <Icon name={secure ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <Text style={styles.namelabel}>Confirm Password</Text>
        <View style={styles.inputtext}>
          <Icon name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirm}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={() => setSecureConfirm(!secureConfirm)}
            style={styles.eyeIcon}
          >
            <Icon name={secureConfirm ? 'eye-slash' : 'eye'} size={18} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.Create}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.loginPrompt}>
          Already have an account?{' '} <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
  <Text style={styles.loginLink}>Log in</Text>
</TouchableOpacity>

        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    
    
  },
  logo: {
    fontSize: 50,
    fontFamily: 'Poppins-ExtraBold',
    textAlign: 'left',
    marginBottom: -10,
    color: '#111827',
  },
  subTitle: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: '#6B7280',
    textAlign: 'left',
    marginBottom: 2,
  },
  namelabel: {
    fontSize: 14,
    color: 'black',
    marginBottom: 6,
    fontFamily: 'Poppins-SemiBold',
  },
  inputtext: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: -5,
  },
  signupButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  Create: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  loginPrompt: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  loginLink: {
    color: '#111827',
    fontFamily: 'Poppins-Bold',
    marginBottom: -10,
  },
});

export default SignupScreen;