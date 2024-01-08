import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = "@user_streak";

const XPScreen = ({ userStreak }) => {
  const [streak, setStreak] = useState(userStreak);

  useEffect(() => {
    setStreak(userStreak);
    // Update AsyncStorage when the streak changes
    AsyncStorage.setItem(STREAK_KEY, JSON.stringify(userStreak));
  }, [userStreak]);

  return (
    <View style={styles.streakContainer}>
      {/* Display your streak wherever you need it in the UI */}
      <Text style={styles.streakText}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7e8d3",
  },
  streakContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
  },
});

export default XPScreen;
