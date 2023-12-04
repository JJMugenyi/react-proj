import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExplanationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyndMap Score</Text>
      <Text style={styles.text}>
        The MyndMap Score is a unique feature that reflects your cognitive
        profile, highlighting your strengths and pinpointing areas for
        improvement. Based on Cognitive Restructuring principles, it provides
        vital insights that tailor the app's functionality to your individual
        needs.
      </Text>
      <Text style={styles.text}>
        The score, out of 100, is generated through a one-time, comprehensive
        evaluation.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#1a1a1a",
    fontWeight: "bold",
    marginBottom: 20,
    marginBottom: 30, // Increased spacing below the title
  },
  text: {
    fontSize: 18,
    color: "#1a1a1a",
    marginBottom: 20,
    marginBottom: 30, // Increased spacing below the text
  },
  button: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 10, // Optional: you can add space above the button if needed
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default ExplanationScreen;
