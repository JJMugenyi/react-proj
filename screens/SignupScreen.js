import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputRef = useRef(null); // Add this line
  const passwordInputRef = useRef(null); // Add this line

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSignup = async () => {
    if (!isValidEmail(email) || !password) {
      Alert.alert("Error", "Please fill out all fields correctly.");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      Alert.alert("Success", "Account Created.", [
        { text: "OK", onPress: () => navigation.navigate("Onboard") },
      ]);
    } catch (error) {
      console.error("Sign Up Error:", error);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Email address is already in use.");
      } else {
        Alert.alert("Error", "There was an error during signup.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.caption}>Create your Account.</Text>

      <TextInput
        ref={emailInputRef} // Add this line
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#1a1a1a"
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordInputRef.current.focus();
        }}
      />
      <TextInput
        ref={passwordInputRef} // Add this line
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#1a1a1a"
        secureTextEntry
        onChangeText={setPassword}
        returnKeyType="go"
        onSubmitEditing={handleSignup}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 20,
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
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
