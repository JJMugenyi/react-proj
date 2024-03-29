// DateHeader.js
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DateHeader = () => {
  // Get the current day of the week as a number (0-6, where 0 is Sunday and 6 is Saturday)
  const dayOfWeek = new Date().getDay();

  // Array of the days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the name of the current day
  const currentDayName = days[dayOfWeek];

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 2,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
});

export default DateHeader;
