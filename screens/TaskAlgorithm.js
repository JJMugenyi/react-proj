import React, { useEffect, useState } from "react";
import { View, Text, FlatList, AsyncStorage } from "react-native";

// Function to calculate deadline weight
const getDeadlineWeight = (deadline) => {
  const today = new Date();
  const timeDiff = new Date(deadline) - today;
  // Adjust these numbers as needed for your weighting
  return Math.max(0, 30 - timeDiff / (1000 * 60 * 60 * 24));
};

// Exported sorting function with error handling
export const sortTasks = (tasks) => {
  try {
    if (!Array.isArray(tasks)) {
      console.log("sortTasks received non-array input:", tasks);
      return [];
    }

    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    return [...tasks].sort((a, b) => {
      const aScore = priorityOrder[a.priority] + getDeadlineWeight(a.deadline);
      const bScore = priorityOrder[b.priority] + getDeadlineWeight(b.deadline);

      if (aScore !== bScore) return bScore - aScore;
      if (a.priority !== b.priority)
        return priorityOrder[b.priority] - priorityOrder[a.priority];

      const aDeadline = new Date(a.deadline);
      const bDeadline = new Date(b.deadline);
      if (aDeadline.getTime() !== bDeadline.getTime())
        return aDeadline - bDeadline;

      const aCreationDate = new Date(a.creationDate);
      const bCreationDate = new Date(b.creationDate);
      return aCreationDate - bCreationDate;
    });
  } catch (error) {
    console.error("Error sorting tasks:", error);
    return []; // Return empty array in case of error
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
          <Text>{`${item.title} - Priority: ${item.priority}, Deadline: ${item.deadline}, Created: ${item.creationDate}`}</Text>
        )}
      />
    </View>
  );
};

export default TaskAlgorithm;
