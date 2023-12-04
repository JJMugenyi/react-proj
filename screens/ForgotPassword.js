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
      await Auth.forgotPassword(email);
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email. Please check your inbox.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("ResetPasswordScreen", { email }), // Navigate to your reset password screen
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "There was an error processing your request."
      );
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

      <Button title="Send Reset Link" onPress={handleForgotPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
});

export default ForgotPasswordScreen;
