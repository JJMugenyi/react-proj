import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./DashboardStyles"; // Assuming the styles are reusable

const getFlagColor = (priority) => {
  const colors = {
    Low: "#ADD8E6",
    Medium: "#FFD580",
    High: "#FF0000",
  };
  return colors[priority];
};

const TaskModal = ({
  taskName,
  setTaskName,
  taskPriority,
  setTaskPriority,
  deadline,
  setDeadline,
  showDatePicker,
  setShowDatePicker,
  handleQuickAddTask,
  closeTaskModal,
  showTaskModal,
  tasks, // Assuming tasks are passed as props
}) => {
  const onAddTaskPress = () => {
    handleQuickAddTask(taskName, taskPriority, deadline, tasks);
    closeTaskModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showTaskModal}
      onRequestClose={closeTaskModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Task</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
          />

          {/* Priority Header */}
          <Text style={styles.priorityLabel}>Priority</Text>

          {/* Priority Selection */}
          <View style={styles.prioritySelectionContainer}>
            {["Low", "Medium", "High"].map((priority) => (
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
                  size={20}
                  color={
                    taskPriority === priority ? getFlagColor(priority) : "#FFF"
                  }
                />
                <Text style={styles.priorityButtonText}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Task Deadline */}
          <View style={styles.deadlineContainer}>
            <Text style={styles.deadlineLabel}>Task Deadline</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.deadlineButton}
            >
              <Text style={styles.deadlineText}>
                {deadline.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
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
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;
