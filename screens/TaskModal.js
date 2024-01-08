import React, { useState, useEffect, useRef } from "react";
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

const NumberButton = ({ value, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: selected ? "#1a1a1a" : "#1a1a1a",
        backgroundColor: selected ? "#1a1a1a" : "transparent",
        padding: 10,
        margin: 5,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: selected ? "#FFF" : "#1a1a1a",
          fontWeight: selected ? "bold" : "bold",
        }}
      >
        {value}
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

  useEffect(() => {
    // Synchronize selectedTime with estimatedTime
    if (selectedTime !== null) {
      setEstimatedTime(selectedTime);
    }
  }, [selectedTime]);

  const taskNameInputRef = useRef(null);

  const onAddTaskPress = async () => {
    try {
      if (loading) return;

      setLoading(true);

      if (!taskName) {
        Alert.alert("Error", "Task name cannot be empty.");
        return;
      }

      if (!taskPriority) {
        Alert.alert("Error", "Please select a priority for the task.");
        return;
      }

      if (!selectedTime && !estimatedTime) {
        Alert.alert("Error", "Please select an estimated time for the task.");
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
      setTaskPriority(""); // Reset taskPriority after successful task addition
      setSelectedTime(null); // Reset selectedTime after successful task addition
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
              ref={taskNameInputRef}
              style={styles.modalInput}
              placeholder="Task Name"
              value={taskName}
              onChangeText={setTaskName}
            />
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
            <View style={styles.timeSelectionContainer}>
              <Text style={styles.priorityLabel}>Estimated Time</Text>
              <View style={styles.estimatedTimeButtonsContainer}>
                {[1, 2, 3].map((time) => (
                  <NumberButton
                    key={time}
                    value={time}
                    selected={selectedTime === time}
                    onPress={() => setSelectedTime(time)}
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
            <View style={styles.modalActionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  Keyboard.dismiss();
                  closeTaskModal();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addTaskButton}
                onPress={() => {
                  Keyboard.dismiss();
                  onAddTaskPress();
                }}
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
