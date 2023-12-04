import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>

      {/* Notification Setting */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
          thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#53d769" }}
        />
      </View>

      {/* Add other settings similarly... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7e8d3",
    padding: 20,
    paddingTop: 100, // Added more padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  settingLabel: {
    fontSize: 18,
    color: "#1a1a1a",
  },
});

export default SettingsScreen;
