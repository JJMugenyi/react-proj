import React, { useEffect, useState } from "react";
import { View, Text, FlatList, AsyncStorage, StyleSheet } from "react-native";

// Function to calculate deadline weight
const getDeadlineWeight = (deadline) => {
  const today = new Date();
  const timeDiff = new Date(deadline) - today;
  // Adjust these numbers as needed for your weighting
  return Math.max(0, 30 - timeDiff / (1000 * 60 * 60 * 24));
};

// Function to calculate a score based on task properties
const calculateTaskScore = (task) => {
  const priorityWeights = { Low: 1, Medium: 2, High: 3, Major: 4 };
  const dopamineWeight = 0.5; // Adjust as needed
  const estimatedTimeWeights = { 60: 0.4, 45: 0.3, 30: 0.2, 15: 0.1 }; // Adjust as needed
  const creationDateWeight = 0.1; // Adjust as needed

  const priority = task.priority || "Low"; // Default priority is Low
  const deadlineWeight = getDeadlineWeight(task.deadline);
  const dopaminePoints = parseFloat(task.dopamineReward) || 0;
  const estimatedTime = parseFloat(task.timeEstimate) || 0;
  const creationDate = new Date(task.creationDate).getTime();

  const priorityWeight = priorityWeights[priority] || 1;
  const estimatedTimeWeight = estimatedTimeWeights[estimatedTime] || 0;

  const score =
    priorityWeight * deadlineWeight +
    dopaminePoints * dopamineWeight +
    estimatedTimeWeight +
    creationDate * creationDateWeight;

  return score;
};

// Exported sorting function with error handling
export const sortTasks = (tasks) => {
  try {
    if (!Array.isArray(tasks)) {
      console.log("sortTasks received non-array input:", tasks);
      return [];
    }

    const sortedTasks = [...tasks].sort((a, b) => {
      try {
        const aScore = calculateTaskScore(a);
        const bScore = calculateTaskScore(b);

        if (aScore !== bScore) {
          return bScore - aScore;
        }

        // If scores are equal, prioritize based on creation date
        const aCreationDate = new Date(a.creationDate).getTime();
        const bCreationDate = new Date(b.creationDate).getTime();

        return bCreationDate - aCreationDate;
      } catch (sortingError) {
        console.error("Error during sorting:", sortingError);
        return 0; // Return 0 in case of a sorting error
      }
    });

    // Set isMostImportant property
    if (sortedTasks.length > 0) {
      const mostImportantTask = sortedTasks[0];
      mostImportantTask.isMostImportant = mostImportantTask.estimatedTime > 60;
    }

    return sortedTasks;
  } catch (error) {
    console.error("Error sorting tasks:", error);
    return []; // Return an empty array in case of an error
  }
};

const TaskAlgorithm = ({ route }) => {
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    const retrieveTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("sortedTasks");
        if (storedTasks !== null) {
          setSortedTasks(JSON.parse(storedTasks));
        } else {
          const newSortedTasks = sortTasks(route.params.tasks);
          setSortedTasks(newSortedTasks);
          await AsyncStorage.setItem(
            "sortedTasks",
            JSON.stringify(newSortedTasks)
          );
        }
      } catch (error) {
        console.error("Error retrieving or storing tasks:", error);
      }
    };

    retrieveTasks();
  }, [route.params.tasks]);

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text numberOfLines={1} style={styles.taskItemText}>
              {`${item.title} - Priority: ${item.priority}, Deadline: ${
                item.deadline
              }, Created: ${item.creationDate}, Score: ${calculateTaskScore(
                item
              )}, Dopamine Points: ${
                item.dopamineReward || "Not provided"
              }, Time Estimate: ${item.timeEstimate || "Not provided"}`.length >
              20 // Adjust the character limit as needed
                ? `${`${item.title} - Priority: ${item.priority}, Deadline: ${
                    item.deadline
                  }, Created: ${item.creationDate}, Score: ${calculateTaskScore(
                    item
                  )}, Dopamine Points: ${
                    item.dopamineReward || "Not provided"
                  }, Time Estimate: ${
                    item.timeEstimate || "Not provided"
                  }`.slice(0, 20)}...`
                : `${item.title} - Priority: ${item.priority}, Deadline: ${
                    item.deadline
                  }, Created: ${item.creationDate}, Score: ${calculateTaskScore(
                    item
                  )}, Dopamine Points: ${
                    item.dopamineReward || "Not provided"
                  }, Time Estimate: ${item.timeEstimate || "Not provided"}`}
            </Text>
            {/* Add your pattern element here */}
            <View style={styles.pattern}></View>
          </View>
        )}
      />
    </View>
  );
};

export default TaskAlgorithm;
