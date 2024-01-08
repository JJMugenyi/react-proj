import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeatureExplanationScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="#1a1a1a" />
      </TouchableOpacity>
      <MaterialCommunityIcons
        name="help-circle"
        size={20}
        color="#1a1a1a"
        style={styles.icon}
      />
      <Text style={styles.versionText}>Version 1.1.0</Text>

      <Text style={styles.heading}>App Features</Text>
      {[
        "- Quick task entry with priority, deadline, and estimated time.",
        "- Adjustable dopamine points to motivate and reward completion.",
        "- Priority selection with flag colors for easy recognition.",
        "- Set deadlines and estimate task completion time.",
        "- More fluid transition between field inputs.",
        "- Animations for task creation.",
        "- Enhanced algorithm now incorporating all parameters.",
        // Add more feature explanations as needed
      ].map((feature, index) => (
        <Text key={`feature_${index}`} style={styles.text}>
          {feature}
        </Text>
      ))}

      {/* Add more Q&A pairs as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center vertically
    paddingHorizontal: 20,
    paddingVertical: 120,
    backgroundColor: "#f7e8d3",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
  },
  icon: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#1a1a1a",
    marginBottom: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "left",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default FeatureExplanationScreen;
