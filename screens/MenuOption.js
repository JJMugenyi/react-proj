import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MenuOption = ({ onPress, label, isLogout }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.option, isLogout && styles.logout]}
    >
      {/* Apply different text style if isLogout is true */}
      <Text style={[styles.optionText, isLogout && styles.logoutText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
  logout: {
    // Styles for the logout option container (if needed)
  },
  logoutText: {
    color: "red", // Red color for the logout text
  },
});

export default MenuOption;
