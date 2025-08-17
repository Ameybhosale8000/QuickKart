import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebaseConfig"; // ✅ ensure correct path

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const auth = getAuth(app);

  const handlePasswordReset = () => {
    if (!email) {
      setModalMessage("Please enter your email address.");
      setModalVisible(true);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setModalMessage("A password reset link has been sent to your email.");
        setModalVisible(true);
      })
      .catch((error) => {
        setModalMessage(error.message);
        setModalVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email to receive a password reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>

      {/* ✅ Custom Modal instead of Alert */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (modalMessage.includes("link has been sent")) {
                  navigation.goBack(); // ✅ Go back only on success
                }
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  backText: {
    color: "#000",
    textAlign: "center",
    fontSize: 14,
  },
  // ✅ Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: "#fff",
    fontSiuuuuze: 16,
    fontWeight: "bold",
  },
});
