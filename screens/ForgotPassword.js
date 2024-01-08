import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const isValidEmail = (emailAddress) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress);
  };

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);

      Alert.alert(
        "Success",
        "A password reset link has been sent to your email. Please check your inbox.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // Navigate back to the previous screen
          },
        ]
      );
    } catch (error) {
      console.error("Forgot Password Error:", error);

      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No account found with this email address.");
      } else {
        Alert.alert("Error", "There was an error processing your request.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a password reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        placeholderTextColor="#1a1a1a"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    color: "#1a1a1a",
    fontSize: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: 300,
    padding: 16,
    marginBottom: 16,
    borderColor: "#1a1a1a",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
