import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./DashboardStyles";

const getFlagColor = (priority) => {
  const colors = {
    Low: "#ADD8E6",
    Medium: "#0A5C36",
    High: "#FF8C00",
    Major: "#FF0000",
  };
  return colors[priority];
};

const TimeButton = ({ value, selected, setEstimatedTime }) => {
  const handlePress = () => {
    setEstimatedTime(value);
  };

  const getColor = () => {
    const colors = {
      15: selected ? "#ADD8E6" : "#FFF",
      30: selected ? "#0A5C36" : "#FFF",
      45: selected ? "#FF8C00" : "#FFF",
      60: selected ? "#FF0000" : "#FFF",
    };
    return colors[value];
  };

  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: selected ? "#1a1a1a" : "#1a1a1a",
        backgroundColor: selected ? "#1a1a1a" : "transparent",
        padding: 10,
        margin: 5,
      }}
      onPress={() => {
        console.log(`Button ${value} pressed`);
        handlePress();
      }}
    >
      <Text
        style={{
          color: getColor(),
          fontWeight: selected ? "bold" : "bold",
        }}
      >
        {`${value} min`}
      </Text>
    </TouchableOpacity>
  );
};

const TaskModal = ({
  taskName,
  setTaskName,
  taskPriority,
  setTaskPriority,
  description,
  setDescription,
  deadline,
  setDeadline,
  estimatedTime,
  setEstimatedTime,
  dopaminePoints,
  setDopaminePoints,
  showDatePicker,
  setShowDatePicker,
  handleQuickAddTask,
  closeTaskModal,
  showTaskModal,
  tasks,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear task name when the modal is shown
    if (showTaskModal) {
      setTaskName("");
    }
  }, [showTaskModal]);

  const onAddTaskPress = async () => {
    try {
      if (loading) return;

      setLoading(true);

      if (!taskName) {
        Alert.alert("Error", "Task name cannot be empty.");
        return;
      }

      if (Number(estimatedTime) > 60) {
        Alert.alert(
          "Alert",
          "Break this down into a smaller task.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }

      await handleQuickAddTask(
        taskName,
        taskPriority,
        description,
        deadline,
        estimatedTime,
        dopaminePoints,
        tasks
      );

      setTaskName("");
      closeTaskModal();
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error", "An error occurred while adding the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTaskModal}
        onRequestClose={closeTaskModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Task Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Task Name"
              value={taskName}
              onChangeText={setTaskName}
            />
            {/* Dopamine Points Slider */}
            <View style={styles.dopamineSliderContainer}>
              <Text style={styles.dopamineLabel}>Dopamine Points</Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#f7e8d3"
                onValueChange={(value) => setDopaminePoints(value)}
              />
              <Text style={styles.dopamineValue}>{dopaminePoints}</Text>
            </View>
            {/* Priority Header */}
            <Text style={styles.priorityLabel}>Priority</Text>
            <View style={styles.prioritySelectionContainer}>
              {["Low", "Medium", "High", "Major"].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={
                    taskPriority === priority
                      ? [styles.priorityButton, styles.priorityButtonSelected]
                      : styles.priorityButton
                  }
                  onPress={() => setTaskPriority(priority)}
                >
                  <Icon
                    name="flag"
                    size={15}
                    color={
                      taskPriority === priority
                        ? getFlagColor(priority)
                        : "#FFF"
                    }
                  />
                  <Text style={styles.priorityButtonText}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Task Deadline */}
            <View style={styles.deadlineContainer}>
              <Text style={styles.deadlineLabel}>Deadline</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.deadlineButton}
              >
                <Text style={styles.deadlineText}>
                  {deadline.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Estimated Time */}
            <View style={styles.timeSelectionContainer}>
              <Text style={styles.priorityLabel}>Estimated Time</Text>
              <View style={styles.estimatedTimeButtonsContainer}>
                {[15, 30, 45, 60].map((time) => (
                  <TimeButton
                    key={time}
                    value={time}
                    selected={selectedTime === time}
                    setEstimatedTime={(value) => {
                      setSelectedTime(value);
                      setEstimatedTime(value);
                    }}
                  />
                ))}
              </View>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDeadline(selectedDate);
                  }
                }}
              />
            )}
            {/* Action Buttons */}
            <View style={styles.modalActionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeTaskModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTaskButton}
                onPress={onAddTaskPress}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Add Task</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default TaskModal;
