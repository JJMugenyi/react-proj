import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
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
  const [isLevelUpVisible, setIsLevelUpVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [showMenu, setShowMenu] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const backdropOpacity = useState(new Animated.Value(0))[0];
  const [alerts, setAlerts] = useState([]);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [xpAnimation, setXpAnimation] = useState(new Animated.Value(0)); // Animated value for XP bar

  const XP_GAIN = {
    High: 30, // XP for high priority tasks
    Medium: 20, // XP for medium priority tasks
    Low: 10, // XP for low priority tasks
  };

  // Separate useEffect for handling XP updates
  useEffect(() => {
    console.log("User XP updated:", userXP);
    // Any additional logic needed when XP updates
  }, [userXP]);

  // Existing useEffect for sorting tasks
  useEffect(() => {
    setSortedTasks(sortTasks(tasks));
  }, [tasks]);

  // Modified handleXPIncrease to return an object with newXP and animate XP change
  const handleXPIncrease = useCallback(
    (xpGained) => {
      setUserXP((currentXP) => {
        const levelMultiplier = userLevel > 0 ? userLevel : 1;
        const scaledXPEarned = xpGained * levelMultiplier;
        let newXP = currentXP + scaledXPEarned;
        let levelChanged = false;

        while (newXP >= xpToNextLevel) {
          newXP -= xpToNextLevel;
          levelChanged = true;
          setUserLevel((prevLevel) => prevLevel + 1);
          setXpToNextLevel((prevXpToNextLevel) =>
            Math.ceil(prevXpToNextLevel * 1.15)
          );
        }

        if (levelChanged) {
          setIsLevelUpVisible(true);
        }

        // Animate the XP bar
        Animated.timing(xpAnimation, {
          toValue: newXP, // Assuming newXP is the updated XP value
          duration: 1000, // Animation duration in milliseconds
          useNativeDriver: false,
        }).start();

        // Update XP and Level in AsyncStorage
        AsyncStorage.setItem("userXP", JSON.stringify(newXP));
        AsyncStorage.setItem("userLevel", JSON.stringify(userLevel));

        return newXP;
      });
    },
    [userLevel, xpAnimation, setUserXP]
  );

  const handleDeleteTask = (taskId) => {
    // Update the tasks state to filter out the deleted task
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleQuickAddTask = (name, priority, deadlineParam) => {
    const newTask = {
      id: Date.now().toString(),
      title: name,
      priority: priority,
      deadline: deadlineParam,
      creationDate: new Date().toISOString(),
      completed: false,
    };

    // Add the new task to the existing tasks array
    setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
  };

  const addXP = useCallback(
    (xpEarned) => {
      setUserXP((currentXP) => {
        const levelMultiplier = userLevel > 0 ? userLevel : 1;
        const scaledXPEarned = xpEarned * levelMultiplier;
        let newXP = currentXP + scaledXPEarned;
        let levelChanged = false;

        while (newXP >= xpToNextLevel) {
          newXP -= xpToNextLevel;
          levelChanged = true;
          setUserLevel((prevLevel) => prevLevel + 1);
          setXpToNextLevel((prevXpToNextLevel) =>
            Math.ceil(prevXpToNextLevel * 1.15)
          );
        }

        if (levelChanged) {
          setIsLevelUpVisible(true); // Show level-up modal if level changed
        }

        return newXP;
      });
    },
    [userLevel, xpToNextLevel]
  );

  const handleTaskComplete = useCallback(
    (taskId, xpEarned) => {
      setTasks((currentTasks) => {
        const updatedTasks = currentTasks.map((task) => {
          if (task.id === taskId && !task.completed) {
            handleXPIncrease(xpEarned);
            return { ...task, completed: true };
          }
          return task;
        });

        const areAllCompleted = updatedTasks.every((task) => task.completed);
        if (areAllCompleted) {
          setAllTasksCompleted(true);
          // Alert logic for all tasks completion
          // ... (Add alert logic here)
        }
        return updatedTasks;
      });
    },
    [XP_GAIN, userXP, setUserXP, setUserLevel]
  );

  const removeAlert = useCallback((id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== id)
    );
  }, []);

  const addAlert = useCallback(
    (message, xpGained) => {
      const id = `${Date.now().toString()}-${Math.random()}`; // Unique ID for each alert
      const newAlert = { id, message, xpGained };
      setAlerts((currentAlerts) => [...currentAlerts, newAlert]);

      // Remove alert after some time
      setTimeout(() => removeAlert(id), 1500); // Adjust time as needed
    },
    [removeAlert]
  );
  // Modified toggleCompletion to handle the new object return type from handleXPIncrease
  const toggleCompletion = useCallback(
    (taskId) => {
      setTasks((currentTasks) => {
        let updatedXP = false;
        let xpResult;

        const updatedTasks = currentTasks.map((task) => {
          if (task.id === taskId && !task.completed) {
            const xpGain = XP_GAIN[task.priority];
            xpResult = handleXPIncrease(xpGain);
            updatedXP = true;
            return { ...task, completed: true };
          }
          return task;
        });

        if (updatedXP && xpResult) {
          setUserXP(xpResult.newXP);
          if (xpResult.levelChanged) {
            setIsLevelUpVisible(true);
          }
        }
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
    [userXP, userLevel, XP_GAIN, setUserXP, setUserLevel, setIsLevelUpVisible]
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

  const handleLevelUp = (newLevel) => {
    setUserLevel(newLevel);
    setIsLevelUpVisible(true);
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
        taskName={taskName}
        setTaskName={setTaskName}
        taskPriority={taskPriority}
        setTaskPriority={setTaskPriority}
        deadline={deadline}
        setDeadline={setDeadline}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        handleQuickAddTask={handleQuickAddTask}
        closeTaskModal={closeTaskModal}
        showTaskModal={showTaskModal}
      />

      <MenuModal
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        navigation={navigation}
        backdropOpacity={backdropOpacity}
        toggleMenuModal={toggleMenuModal}
      />

      <LevelUpModal
        isVisible={isLevelUpVisible}
        userLevel={userLevel}
        onClose={closeLevelUpModal}
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
          <MaterialIcons name="menu" size={30} color="#1a1a1a" />
        </TouchableOpacity>
        {/* Assuming DateHeader is a component */}
        <DateHeader style={styles.dateHeaderStyle} />
        <XPScreen
          userXP={userXP}
          userLevel={userLevel}
          xpToNextLevel={xpToNextLevel}
        />
      </View>
      {/* Modified section for important task suggestion */}
      {sortedTasks && sortedTasks.length > 0 && (
        <Text style={styles.importantTaskSuggestion}>
          MyndMap Thinks:{" "}
          <Text style={styles.boldText}>{sortedTasks[0].title}</Text> is the
          most important.
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
              currentXP={userXP} // Pass the current XP as a prop
              handleXPUpdate={setUserXP}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={openTaskModal}
      >
        <Icon name="add" size={35} color="#f7e8d3" />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
