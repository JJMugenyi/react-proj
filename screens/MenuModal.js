import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import MenuOption from "./MenuOption";
import styles from "./DashboardStyles";

const MenuModal = ({ showMenu, setShowMenu, navigation }) => {
  if (!showMenu) {
    return null; // Do not render the modal if showMenu is false
  }

  const handleLogout = async () => {
    try {
      // Clear user data, XP, and level from AsyncStorage
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("userXP");
      await AsyncStorage.removeItem("userLevel");

      // Navigate to the Main screen after successful logout
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.fullScreenMenuModal}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setShowMenu(false)}
      >
        <MaterialIcons name="arrow-back" size={26} color="#1a1a1a" />
      </TouchableOpacity>

      {/* Menu options */}
      <MenuOption
        label="Profile"
        onPress={() => navigation.navigate("Profile")}
        style={styles.menuOption}
      />
      <MenuOption
        label="Settings"
        onPress={() => navigation.navigate("Settings")}
        style={styles.menuOption}
      />
      <MenuOption
        label="Feedback"
        onPress={() => navigation.navigate("Feedback")}
        style={styles.menuOption}
      />
      <MenuOption
        label="Logout"
        onPress={handleLogout} // Use the handleLogout function
        style={[styles.menuOption, styles.logoutOption]}
        isLogout
      />

      <Text style={styles.versionText}>Beta Version 1.0</Text>
    </View>
  );
};

export default MenuModal;
