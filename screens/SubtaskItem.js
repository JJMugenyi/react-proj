// SubtaskItem.js

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./DashboardStyles";

const SubtaskItem = ({ subtask, onComplete, onDelete }) => {
  return (
    <TouchableOpacity onPress={onComplete} style={styles.subtaskContainer}>
      <Icon
        name={subtask.completed ? "checkmark-circle" : "ellipse-outline"}
        size={20}
        color={subtask.completed ? "#f7e8d3" : "#f7e8d3"}
      />
      <Text style={styles.subtaskText}> {subtask.title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <FontAwesome
          name="trash"
          size={18}
          color="#f7e8d3"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SubtaskItem;
