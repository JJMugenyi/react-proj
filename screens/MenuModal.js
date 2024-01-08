import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuOption from "./MenuOption";
import styles from "./DashboardStyles";

const MenuModal = ({ showMenu, setShowMenu, navigation }) => {
  if (!showMenu) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.fullScreenMenuModal}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => setShowMenu(false)}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* 'Logout' button */}
      <MenuOption
        label="Logout"
        onPress={handleLogout}
        style={[styles.menuOption, styles.logoutOption]}
        isLogout
      />

      {/* Row container for buttons */}
      <View style={styles.rowContainer}>
        {/* Calendar button */}
        <TouchableOpacity
          style={[styles.menuOption, styles.calendarOption]}
          disabled={true} // Greyed out and not pressable
        >
          <Text style={styles.calendarOptionText}>Calendar</Text>
        </TouchableOpacity>

        {/* MyndTimer button */}
        <TouchableOpacity
          style={[styles.menuOption, styles.calendarOption]}
          onPress={() => {
            navigation.navigate("Timer");
            setShowMenu(false); // Close menu after navigating
          }}
        >
          <Text style={styles.myndTimerOptionText}>MyndTimer</Text>
        </TouchableOpacity>

        {/* MyndMood button */}
        <TouchableOpacity
          style={[styles.menuOption, styles.calendarOption]}
          disabled={true} // Greyed out and not pressable
        >
          <Text style={styles.calendarOptionText}>MyndMood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuModal;
