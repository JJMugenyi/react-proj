// TaskItem.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import SubtaskItem from "./SubtaskItem";
import IconScreen from "./IconScreen"; // Import IconScreen
import styles from "./DashboardStyles";

const TaskItem = ({
  task,
  toggleCompletion,
  onDelete,
  onCreateSubtask = () => {},
}) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null); // Update the initial state to null
  const subtaskInputHeight = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleSubtaskInput = () => {
    setShowSubtaskInput(!showSubtaskInput);

    Animated.timing(subtaskInputHeight, {
      toValue: showSubtaskInput ? 0 : 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTaskCompletion = (taskId) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      toggleCompletion(taskId);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleCreateSubtask = () => {
    if (subtaskTitle.trim() !== "") {
      Animated.sequence([
        Animated.timing(subtaskInputHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(subtaskInputHeight, {
          toValue: 40,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

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
    Animated.timing(subtaskInputHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      const updatedSubtasks = [...subtasks];
      updatedSubtasks.splice(index, 1);
      setSubtasks(updatedSubtasks);
    });
  };

  const handleDeleteTaskItem = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onDelete(task.id);
    });
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.swipeActionContainer}>
        <Animated.View style={[styles.backAction, { opacity }]}>
          <FontAwesome name="check" size={20} color="#1a1a1a" />
        </Animated.View>
        <TouchableOpacity
          onPress={handleDeleteTaskItem}
          style={styles.deleteAction}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderTaskTitle = () => {
    const maxTitleLength = 8;

    if (task.title.length > maxTitleLength) {
      return `${task.title.substring(0, maxTitleLength)}...`;
    }

    return task.title;
  };

  const handleTagSelection = (tag) => {
    setSelectedTag(tag);
    setShowTagOptions(false);
  };

  const renderTagOptions = () => {
    return (
      <View style={styles.tagOptionsContainer}>
        <IconScreen handleTagSelection={handleTagSelection} />
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Animated.View
        style={{
          ...styles.taskItem,
          flexDirection: "row",
          alignItems: "center",
          opacity: fadeAnim,
        }}
      >
        <TouchableOpacity
          style={styles.tagIconContainer}
          onPress={() => setShowTagOptions(!showTagOptions)}
        >
          <FontAwesome name="ellipsis-v" size={20} color="#1a1a1a" />
        </TouchableOpacity>
        {selectedTag && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name={selectedTag.icon}
              size={20}
              color={selectedTag.color}
              style={{ marginLeft: 8 }}
            />
            <Text style={{ marginLeft: 8, marginRight: 8 }}>
              {selectedTag.name}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={() => handleTaskCompletion(task.id)}>
          <Icon
            name={task.completed ? "checkmark-circle" : "ellipse-outline"}
            size={21.5}
            color={task.completed ? "#1a1a1a" : "#1a1a1a"}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.taskItemText,
            task.completed && styles.taskItemCompleted,
            { marginLeft: 8 },
          ]}
        >
          {renderTaskTitle()}
        </Text>
        <View style={styles.plusIconContainer}>
          <TouchableOpacity onPress={toggleSubtaskInput}>
            <FontAwesome
              name={showSubtaskInput ? "angle-down" : "angle-up"}
              size={22.5}
              color="#1a1a1a"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priorityFlagContainer}>
          <FontAwesome
            name="flag"
            size={18}
            color={getFlagColor(task.priority)}
          />
        </View>
      </Animated.View>

      {showTagOptions && renderTagOptions()}

      <Animated.View style={{ height: subtaskInputHeight, overflow: "hidden" }}>
        <View style={styles.subtaskInputContainer}>
          <TextInput
            style={styles.subtaskInput}
            placeholder="Create a subtask..."
            value={subtaskTitle}
            onChangeText={(text) => setSubtaskTitle(text)}
            returnKeyType="go"
            onSubmitEditing={handleCreateSubtask}
          />
          <TouchableOpacity onPress={handleCreateSubtask}>
            <FontAwesome
              name="arrow-right"
              size={18}
              color="#1a1a1a"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

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
