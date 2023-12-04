import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "@react-native-community/progress-bar-android";
import ProgressView from "@react-native-community/progress-view";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const XP_KEY = "@user_xp";
const LEVEL_KEY = "@user_level";
const XP_TO_NEXT_LEVEL_KEY = "@xp_to_next_level";

export const handleXPIncrease = (currentXP, xpGained) => {
  const newXP = currentXP + xpGained;
  let newLevel = Math.floor(newXP / 100); // For example, every 100 XP is a new level

  // Update AsyncStorage
  AsyncStorage.setItem(XP_KEY, JSON.stringify(newXP));
  AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(newLevel));

  return { newXP, newLevel };
};

const XPScreen = ({ userXP, userLevel, xpToNextLevel }) => {
  const [currentXP, setCurrentXP] = useState(userXP);
  const [currentLevel, setCurrentLevel] = useState(userLevel);
  const [xpNeeded, setXpNeeded] = useState(xpToNextLevel);
  const xpForNextLevel = (currentLevel + 1) * 100;
  const progressFill = ((currentXP % 100) / xpForNextLevel) * 100;

  useEffect(() => {
    setCurrentXP(userXP);
    setCurrentLevel(userLevel);
  }, [userXP, userLevel]);

  return (
    <View style={styles.circularProgress}>
      {/* Circular Progress */}
      <AnimatedCircularProgress
        size={40} // You can adjust the size
        width={3} // Thickness of the progress bar
        fill={progressFill}
        tintColor="#1a1a1a" // Color of the progress bar
        backgroundColor="#f7e8d3" // Background color of the progress bar
      >
        {(fill) => <Text style={styles.levelText}>{userLevel}</Text>}
      </AnimatedCircularProgress>

      {/* Additional UI elements */}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 30, // Adjust this to fit your header's design
    paddingHorizontal: 20,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    width: "100%",
    height: 20,
  },
  progressViewIOS: {
    // Styles specific to ProgressViewIOS if needed
  },
  progressBarAndroid: {
    // Styles specific to ProgressBarAndroid if needed
  },
  xpText: {
    marginTop: 15,
  },
  xpContainer: {
    // Adjust this container to be minimalistic and align to the right
    flexDirection: "row", // For horizontal layout of level and XP
    alignItems: "center", // Center items vertically
  },
  centerPlaceholder: {
    flex: 1,
    alignItems: "center", // Center any content that you might put here
  },
});

export default XPScreen;
