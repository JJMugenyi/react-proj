import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import SubtaskItem from "./SubtaskItem"; // Import the new SubtaskItem component
import styles from "./DashboardStyles";

const TaskItem = ({
  task,
  toggleCompletion,
  onDelete,
  onCreateSubtask = () => {},
}) => {
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  const handleTaskCompletion = (taskId) => {
    toggleCompletion(taskId);
  };

  const handleCreateSubtask = () => {
    if (subtaskTitle.trim() !== "") {
      setSubtasks([...subtasks, { title: subtaskTitle, completed: false }]);
      setSubtaskTitle("");
    }
  };

  const handleSubtaskCompletion = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
  };

  const handleDeleteSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const getFlagColor = (priority) => {
    const colors = {
      Low: "#ADD8E6",
      Medium: "#0A5C36",
      High: "#FF8C00",
      Major: "#FF0000",
    };
    return colors[priority] || colors.Medium;
  };

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
        <TouchableOpacity onPress={() => handleTaskCompletion(task.id)}>
          <Icon
            name={task.completed ? "checkmark-circle" : "ellipse-outline"}
            size={21.5}
            color={task.completed ? "#1a1a1a" : "#1a1a1a"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.taskItemText,
            task.completed && styles.taskItemCompleted,
          ]}
        >
          {task.title}
        </Text>
        <View style={styles.plusIconContainer}>
          <TouchableOpacity
            onPress={() => setShowSubtaskInput(!showSubtaskInput)}
          >
            <FontAwesome name="angle-down" size={25} color="#1a1a1a" />
          </TouchableOpacity>
        </View>
        <View style={styles.priorityFlagContainer}>
          <FontAwesome
            name="flag"
            size={18}
            color={getFlagColor(task.priority)}
          />
        </View>
      </View>

      {showSubtaskInput && (
        <View style={styles.subtaskInputContainer}>
          <TextInput
            style={styles.subtaskInput}
            placeholder="Create a subtask..."
            value={subtaskTitle}
            onChangeText={(text) => setSubtaskTitle(text)}
          />
          <TouchableOpacity onPress={handleCreateSubtask}>
            <FontAwesome
              name="check"
              size={18}
              color="#1a1a1a"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      )}

      {subtasks.length > 0 && (
        <View style={styles.subtasksContainer}>
          {subtasks.map((subtask, index) => (
            <SubtaskItem
              key={index}
              subtask={subtask}
              onComplete={() => handleSubtaskCompletion(index)}
              onDelete={() => handleDeleteSubtask(index)}
            />
          ))}
        </View>
      )}
    </Swipeable>
  );
};

export default TaskItem;
