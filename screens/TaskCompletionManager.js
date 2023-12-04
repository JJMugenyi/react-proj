import React, { useEffect, useState, useCallback } from "react";
import { AsyncStorage } from "react-native";

// Import the TaskCompletionAlert component if it's defined in another file
import TaskCompletionAlert from "./TaskCompletionAlert";

const TaskCompletionManager = ({ allTasksCompleted }) => {
  const [alerts, setAlerts] = useState([]);

  const ALL_TASKS_COMPLETED_XP_GAIN = 50; // XP gain when all tasks are completed

  // Function to load alerts from AsyncStorage
  const loadAlerts = async () => {
    try {
      const storedAlerts = await AsyncStorage.getItem("alerts");
      if (storedAlerts !== null) {
        setAlerts(JSON.parse(storedAlerts));
      }
    } catch (error) {
      console.error("Error loading alerts from storage:", error);
    }
  };

  useEffect(() => {
    // Load alerts when the component mounts
    loadAlerts();

    // Check if all tasks are completed and award XP
    if (allTasksCompleted) {
      // Assuming handleXPIncrease is a function that handles XP increase
      handleXPIncrease(ALL_TASKS_COMPLETED_XP_GAIN);
    }
  }, [allTasksCompleted]);

  const removeAlert = useCallback((id) => {
    try {
      setAlerts((currentAlerts) => {
        const updatedAlerts = currentAlerts.filter((alert) => alert.id !== id);
        AsyncStorage.setItem("alerts", JSON.stringify(updatedAlerts));
        return updatedAlerts;
      });
    } catch (error) {
      console.error("Error removing alert:", error);
    }
  }, []);

  const addAlert = useCallback(
    (message, xpGained) => {
      try {
        const id = Date.now().toString(); // Unique ID for each alert
        const newAlert = { id, message, xpGained };
        setAlerts((currentAlerts) => {
          const updatedAlerts = [...currentAlerts, newAlert];
          AsyncStorage.setItem("alerts", JSON.stringify(updatedAlerts));
          return updatedAlerts;
        });

        // Remove alert after 5 seconds
        setTimeout(() => removeAlert(id), 5000);
      } catch (error) {
        console.error("Error adding alert:", error);
      }
    },
    [removeAlert]
  );

  return (
    <>
      {alerts.map((alert) => (
        <TaskCompletionAlert
          key={alert.id}
          message={alert.message}
          xpGained={alert.xpGained}
          isVisible={true} // Assuming you control visibility
          onDismiss={() => removeAlert(alert.id)}
        />
      ))}
    </>
  );
};

export default TaskCompletionManager;
