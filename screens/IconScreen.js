// IconScreen.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const IconScreen = ({ handleTagSelection }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <TouchableOpacity onPress={() => handleTagSelection("work")}>
        <FontAwesome name="briefcase" size={25} color="#1a1a1a" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTagSelection("home")}>
        <FontAwesome name="home" size={25} color="#1a1a1a" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTagSelection("school")}>
        <FontAwesome name="graduation-cap" size={25} color="#1a1a1a" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTagSelection("shopping")}>
        <FontAwesome name="shopping-cart" size={25} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
};

export default IconScreen;
