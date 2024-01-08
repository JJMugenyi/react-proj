import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const Timer = () => {
  const [selectedTime, setSelectedTime] = useState(25);
  const [time, setTime] = useState(selectedTime * 60);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const intervalRef = useRef();

  useEffect(() => {
    setTime(selectedTime * 60);
  }, [selectedTime]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isActive && time > 0) {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, time]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [time, animatedValue]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(selectedTime * 60);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  const progress = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r="90"
          stroke="#1a1a1a"
          strokeWidth="10"
          fill="transparent"
        />
        <Circle
          cx="100"
          cy="100"
          r="90"
          stroke="#f7e8d3"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={`${progress * 565} 565`}
        />
        <Text style={styles.timerText}>
          {formatTime(Math.floor(time / 60))}:{formatTime(time % 60)}
        </Text>
      </Svg>

      <View style={styles.timeInputContainer}>
        <Text style={styles.timeInputLabel}>Select Time (minutes):</Text>
        <TextInput
          style={styles.timeInput}
          keyboardType="numeric"
          value={selectedTime.toString()}
          onChangeText={(text) => setSelectedTime(text ? parseInt(text) : 0)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={stopTimer}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7e8d3",
  },
  timerText: {
    fontSize: 24,
    color: "#1a1a1a",
    position: "absolute",
    top: 80,
    left: 80,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#f7e8d3",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: "#1a1a1a",
    fontSize: 16,
  },
  timeInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  timeInputLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#1a1a1a",
  },
  timeInput: {
    height: 40,
    width: 40,
    borderColor: "#1a1a1a",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});

export default Timer;
