import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const storedUserString = await AsyncStorage.getItem("user");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        Alert.alert("Success", "Login Successful.", [
          { text: "OK", onPress: () => navigation.navigate("Dashboard") },
        ]);
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an error logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.patternBackground} />
      <Image source={require("../assets/mynd.png")} style={styles.logo} />

      <Text style={styles.title}>Log in</Text>
      <Text style={{ fontSize: 16, marginBottom: 10, color: "#1a1a1a" }}>
        Enter your email and password.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#1a1a1a"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#1a1a1a"
          style={styles.passwordInput}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisibility(!isPasswordVisible)}
        >
          <Text style={styles.toggleText}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.smallText}>Not got an account? Sign up</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#1a1a1a"
        />
      )}
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
  patternBackground: {},
  passwordContainer: {
    flexDirection: "row",
    borderColor: "#1a1a1a",
    borderWidth: 1,
    borderRadius: 4,
    width: 300,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 10,
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
  passwordInput: { flex: 1 },
  toggleText: { paddingLeft: 5, color: "#1a1a1a" },
  forgotPasswordText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 5,
    color: "#1a1a1a",
    textDecorationLine: "underline",
  },
  smallText: {
    fontSize: 14,
    marginTop: 15,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  buttonText: { color: "#ffffff", fontWeight: "bold" },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
});

export default LoginScreen;
