import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../firebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !mobile || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      Alert.alert("Invalid Mobile", "Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      // ✅ Save user data to Realtime Database
      await set(ref(database, "users/" + user.uid), {
        name,
        email,
        mobile,
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }
      Alert.alert("Signup Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.logo}>QuickKart</Text>
          <Text style={styles.subTitle}>Create your account</Text>

          {/* Name */}
          <View style={styles.inputGroup}>
            <Icon name="user" size={18} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Mobile */}
          <View style={styles.inputGroup}>
            <Icon name="phone" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Icon name="envelope" size={18} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Icon name="lock" size={20} color="#6B7280" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => setSecure(!secure)}
              style={styles.eyeIcon}
            >
              <Icon
                name={secure ? "eye-slash" : "eye"}
                size={18}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.link}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    height: 52,
  },
  icon: { marginRight: 10 },
  eyeIcon: { padding: 6 },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footer: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: "#111827",
    fontWeight: "bold",
  },
});

export default SignupScreen;
