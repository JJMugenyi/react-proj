import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./DashboardStyles";

import { handleXPIncrease } from "./XPScreen";

const XP_GAIN = {
  High: 30, // XP gain for high priority tasks
  Medium: 20, // XP gain for medium priority tasks
  Low: 10, // XP gain for low priority tasks
};

const TaskItem = ({
  task,
  toggleCompletion,
  onDelete,
  currentXP,
  handleXPUpdate,
}) => {
  const handleTaskCompletion = (taskId, task, currentXP, handleXPUpdate) => {
    toggleCompletion(taskId);
    if (!task.completed) {
      const xpGain = XP_GAIN[task.priority]; // Assuming XP_GAIN is defined
      handleXPIncrease(currentXP, xpGain).then((newXP) => {
        handleXPUpdate(newXP); // Update the XP state
      });
    }
  };

  const getFlagColor = (priority) => {
    const colors = {
      Low: "#ADD8E6",
      Medium: "#FFD580",
      High: "#FF0000",
    };
    return colors[priority] || colors.Medium;
  };

  const taskTitle = task.title ? task.title.toString() : "";

  const renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.swipeActionContainer}>
        <Animated.View style={[styles.backAction, { opacity }]}>
          <Icon name="arrow-back" size={20} color="#1a1a1a" />
        </Animated.View>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={styles.deleteAction}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => toggleCompletion(task.id)}>
          <Icon
            name={task.completed ? "checkmark-circle" : "ellipse-outline"}
            size={25}
            color={task.completed ? "green" : "#1a1a1a"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.taskItemText,
            task.completed && styles.taskItemCompleted,
          ]}
        >
          {taskTitle}
        </Text>
        <Icon name="flag" size={15} color={getFlagColor(task.priority)} />
      </View>
    </Swipeable>
  );
};

export default TaskItem;
