import React, { useEffect, useState } from "react";
import { View, Text, FlatList, AsyncStorage } from "react-native";

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
  const estimatedTimeWeight = 0.2; // Adjust as needed
  const creationDateWeight = 0.1; // Adjust as needed

  const priority = task.priority || "Low"; // Default priority is Low
  const deadlineWeight = getDeadlineWeight(task.deadline);
  const dopaminePoints = parseFloat(task.dopamineReward) || 0;
  const estimatedTime = parseFloat(task.timeEstimate) || 0;
  const creationDate = new Date(task.creationDate).getTime();

  const score =
    priorityWeights[priority] * deadlineWeight +
    dopaminePoints * dopamineWeight +
    estimatedTime * estimatedTimeWeight +
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
      const aScore = calculateTaskScore(a);
      const bScore = calculateTaskScore(b);

      if (aScore !== bScore) return bScore - aScore;

      const aDeadline = new Date(a.deadline).getTime();
      const bDeadline = new Date(b.deadline).getTime();
      if (aDeadline !== bDeadline) return aDeadline - bDeadline;

      const aCreationDate = new Date(a.creationDate).getTime();
      const bCreationDate = new Date(b.creationDate).getTime();
      return aCreationDate - bCreationDate;
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`${item.title} - Priority: ${item.priority}, Deadline: ${
            item.deadline
          }, Created: ${item.creationDate}, Score: ${calculateTaskScore(
            item
          )}, Dopamine Points: ${
            item.dopamineReward || "Not provided"
          }, Time Estimate: ${item.timeEstimate || "Not provided"}`}</Text>
        )}
      />
    </View>
  );
};

export default TaskAlgorithm;
