import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

const TaskCreationScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    if (!taskName.trim()) {
      Alert.alert("Error", "Please enter a task name.");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: taskName.trim(),
      priority: taskPriority,
      deadline: deadline.toISOString(),
    };
    // Add logic to save this task
    // ...

    setTaskName("");
    navigation.goBack(); // Return to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Add a New Task</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      {/* Priority and Deadline inputs */}
      {/* ... */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Icon name="checkmark" size={25} color="#fff" />
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 10,
  },
  // ... Add other styles for priority and deadline inputs
});

export default TaskCreationScreen;
