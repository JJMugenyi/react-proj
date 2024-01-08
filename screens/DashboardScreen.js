import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TaskModal from "./TaskModal";
import MenuModal from "./MenuModal";
import TaskItem from "./TaskItem";
import LevelUpModal from "./LevelUpModal";
import DateHeader from "./DateHeader";
import XPScreen from "./XPScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleXPIncrease } from "./XPScreen";
import styles from "./DashboardStyles";
import TaskCompletionAlert from "./TaskCompletionAlert";
import { sortTasks } from "./TaskAlgorithm";

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [deadline, setDeadline] = useState(new Date());
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [userStreak, setUserStreak] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const backdropOpacity = useState(new Animated.Value(0))[0];
  const [dopaminePoints, setDopaminePoints] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  const STREAK_KEY = "@user_streak";

  useEffect(() => {
    loadStreak();
  }, []);

  // Existing useEffect for sorting tasks
  useEffect(() => {
    setSortedTasks(sortTasks(tasks));
  }, [tasks]);

  const onCreateSubtask = (subtaskTitle) => {
    // Implement your logic to create subtask
    console.log("Creating subtask:", subtaskTitle);
    // You can put your actual logic here
  };

  const handleCreateSubtask = (taskId, subtaskTitle) => {
    // Your logic to create a subtask
    console.log(`Creating subtask for task ${taskId}: ${subtaskTitle}`);
  };

  const navigateToSubtaskScreen = () => {
    navigation.navigate("SubtaskScreen", { onCreateSubtask });
  };

  const loadStreak = async () => {
    try {
      const storedStreak = await AsyncStorage.getItem(STREAK_KEY);
      if (storedStreak !== null) {
        setUserStreak(parseInt(storedStreak, 10));
      }
    } catch (error) {
      console.error("Error loading streak:", error);
    }
  };

  // Function to handle an action that should increase the streak
  const handleStreakAction = () => {
    const updatedStreak = handleStreakIncrease(userStreak);
    setUserStreak(updatedStreak);
    AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));
  };

  const handleDeleteTask = (taskId) => {
    // Update the tasks state to filter out the deleted task
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleQuickAddTask = (
    name,
    priority,
    description,
    deadlineParam,
    estimatedTime = null,
    dopaminePoints = null
  ) => {
    // Check if the task name is provided
    if (!name || name.trim() === "") {
      // Display an alert to the user
      Alert.alert("Error!", "Task Name is required.");
      // You can add any additional handling for the error here
    } else {
      // Check if estimated time is above 60 minutes
      const breakRecommendedSuffix =
        Number(estimatedTime) > 60 ? " (Break Recommended)" : "";

      const newTask = {
        id: Date.now().toString(),
        title: `${name}${breakRecommendedSuffix}`, // Append suffix if needed
        priority: priority,
        description: description,
        deadline: deadlineParam,
        estimatedTime: estimatedTime,
        dopaminePoints: dopaminePoints,
        creationDate: new Date().toISOString(),
        completed: false,
      };

      // Add the new task to the existing tasks array
      setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));

      // Optionally, you can close the modal here if needed
      closeTaskModal();
    }
  };

  const handleTaskComplete = useCallback((taskId) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (task.id === taskId && !task.completed) {
          return { ...task, completed: true };
        }
        return task;
      });

      const areAllCompleted = updatedTasks.every((task) => task.completed);
      if (areAllCompleted) {
        // Alert logic for all tasks completion
        // ... (Add alert logic here)
      }
      return updatedTasks;
    });
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== id)
    );
  }, []);

  const addAlert = useCallback(
    (message) => {
      const id = `${Date.now().toString()}-${Math.random()}`; // Unique ID for each alert
      const newAlert = { id, message };
      setAlerts((currentAlerts) => [...currentAlerts, newAlert]);

      // Remove alert after some time
      setTimeout(() => removeAlert(id), 1500); // Adjust time as needed
    },
    [removeAlert]
  );

  const toggleCompletion = useCallback(
    (taskId) => {
      setTasks((currentTasks) => {
        const updatedTasks = currentTasks.map((task) => {
          if (task.id === taskId && !task.completed) {
            return { ...task, completed: true };
          }
          return task;
        });

        const areAllCompleted = updatedTasks.every((task) => task.completed);
        if (areAllCompleted) {
          setAllTasksCompleted(true);
          // Generate and display the alert for all tasks completion
          const phrases = [
            "Great job!",
            "Awesome work!",
            "Fantastic!",
            "Superb!",
            "Impressive work!",
            "Amazing!",
            "You rock!",
            "You're on fire!",
            "You're on a roll!",
            "You're unstoppable!",
            "You're a machine!",
            "You're a beast!",
            "You're a legend!",
            "You're a god!",
            "You're a hero!",
            "You're a champion!",
            "You're a wizard!",
            "Sick!",
            "Nice!",
            "Sweet!",
            "Rad!",
            "Cool!",
            "Wow!",
            "Incredible!",
            "Unbelievable!",
            // Add more phrases as needed
          ];
          const randomPhrase =
            phrases[Math.floor(Math.random() * phrases.length)];
          const alertMessage = `${randomPhrase}\n\nAll tasks completed!`;

          addAlert(alertMessage);

          return []; // Clear all tasks once they are all completed
        }

        return updatedTasks;
      });
    },
    [setTasks, setAllTasksCompleted, addAlert]
  );

  const toggleMenuModal = () => {
    setShowMenu(!showMenu);
  };

  const openTaskModal = () => {
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
  };

  const closeLevelUpModal = () => {
    setIsLevelUpVisible(false);
  };

  const renderNoTasksPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>What's first...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TaskModal
        // Pass necessary props to TaskModal
        taskName={taskName}
        setTaskName={setTaskName}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        setDopaminePoints={setDopaminePoints}
        setEstimatedTime={setEstimatedTime}
        deadline={deadline}
        setDeadline={setDeadline}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        handleQuickAddTask={handleQuickAddTask}
        closeTaskModal={closeTaskModal}
        showTaskModal={showTaskModal}
      />

      <MenuModal
        // Pass necessary props to MenuModal
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        navigation={navigation}
        backdropOpacity={backdropOpacity}
        toggleMenuModal={toggleMenuModal}
      />

      {alerts.map((alert) => (
        <TaskCompletionAlert
          key={alert.id}
          message={alert.message}
          xpGained={alert.xpGained}
          isVisible={true}
          onDismiss={() => removeAlert(alert.id)}
        />
      ))}

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleMenuModal} style={styles.menuButton}>
          <MaterialIcons name="menu" size={27.5} color="#1a1a1a" />
        </TouchableOpacity>

        {/* Assuming DateHeader is a component */}
        <DateHeader style={styles.dateHeaderStyle} />

        <TouchableOpacity
          onPress={() => navigation.navigate("FeatureExplanation")}
        >
          <MaterialIcons name="info" size={27.5} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      {/* Modified section for important task suggestion */}
      {sortedTasks && sortedTasks.length > 0 && (
        <Text style={styles.importantTaskSuggestion}>
          MyndMap Thinks:{" "}
          <Text style={styles.boldText}>{sortedTasks[0].title}</Text> is the
          most important. Consider working on this first.
        </Text>
      )}

      {tasks.length === 0 ? (
        renderNoTasksPlaceholder()
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              toggleCompletion={toggleCompletion}
              onDelete={handleDeleteTask}
              onCreateSubtask={onCreateSubtask}
              // Pass only necessary props to TaskItem
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={openTaskModal}
      >
        <Icon name="add" size={27.5} color="#f7e8d3" />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
