import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myndMapScore, setMyndMapScore] = useState("Awaiting Test Results");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          const user = JSON.parse(userData);
          setName(user.name);
          setEmail(user.email);
          setMyndMapScore(user.myndMapScore || "Awaiting Test Results");
        }
      } catch (error) {
        console.error("Error retrieving user data", error);
      }
    };

    getUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
      </TouchableOpacity>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={false}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={false}
      />

      <Text style={styles.label}>MyndMap Score:</Text>
      <TextInput
        style={styles.input}
        value={myndMapScore}
        onChangeText={setMyndMapScore}
        editable={false} // Assuming the score is not editable here
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
    color: "#1a1a1a",
    marginBottom: 20,
    backgroundColor: "white",
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 20,
    backgroundColor: "white",
  },
  imageUploadText: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
